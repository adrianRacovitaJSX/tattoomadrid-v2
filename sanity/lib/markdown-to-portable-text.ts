import { marked, type Tokens } from 'marked';
import { randomBytes } from 'node:crypto';

// Conversor minimalista Markdown → PortableText. Cubre lo que la IA genera
// de forma habitual: títulos, párrafos, listas (incluidas anidadas), citas,
// código, negrita/cursiva/código inline, enlaces. Tablas y HTML crudo se
// degradan a texto plano. Imágenes se ignoran al nivel de bloque (la
// portada se sube por el campo coverImage del payload).

type Span = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

type MarkDef = {
  _key: string;
  _type: 'link';
  href: string;
};

type Block = {
  _type: 'block';
  _key: string;
  style: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs: MarkDef[];
  children: Span[];
};

type CodeBlock = {
  _type: 'codeBlock';
  _key: string;
  code: string;
  language?: string;
};

type Output = Array<Block | CodeBlock>;

function key() {
  return randomBytes(6).toString('hex');
}

function spansFromInline(
  tokens: Tokens.Generic[]
): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];

  function push(text: string, marks: string[]) {
    if (!text) return;
    children.push({
      _type: 'span',
      _key: key(),
      text,
      marks,
    });
  }

  function walk(token: Tokens.Generic, marks: string[]) {
    switch (token.type) {
      case 'text':
        push(
          (token.text as string) ?? '',
          marks
        );
        break;
      case 'strong':
        for (const child of (token.tokens as Tokens.Generic[]) ?? []) {
          walk(child, [...marks, 'strong']);
        }
        break;
      case 'em':
        for (const child of (token.tokens as Tokens.Generic[]) ?? []) {
          walk(child, [...marks, 'em']);
        }
        break;
      case 'codespan':
        push((token.text as string) ?? '', [...marks, 'code']);
        break;
      case 'link': {
        const linkKey = key();
        markDefs.push({
          _key: linkKey,
          _type: 'link',
          href: (token.href as string) ?? '#',
        });
        for (const child of (token.tokens as Tokens.Generic[]) ?? []) {
          walk(child, [...marks, linkKey]);
        }
        break;
      }
      case 'br':
        push('\n', marks);
        break;
      case 'del':
        for (const child of (token.tokens as Tokens.Generic[]) ?? []) {
          walk(child, marks);
        }
        break;
      default:
        // Fallback razonable: render del raw text.
        if (typeof token.raw === 'string') push(token.raw, marks);
    }
  }

  for (const token of tokens) walk(token, []);
  return { children, markDefs };
}

function blockFromTokens(
  style: string,
  tokens: Tokens.Generic[],
  extra: { listItem?: 'bullet' | 'number'; level?: number } = {}
): Block {
  const { children, markDefs } = spansFromInline(tokens);
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children,
    ...(extra.listItem ? { listItem: extra.listItem } : {}),
    ...(extra.level ? { level: extra.level } : {}),
  };
}

function emitListItems(
  list: Tokens.List,
  level: number,
  out: Output
): void {
  const listType: 'bullet' | 'number' = list.ordered ? 'number' : 'bullet';
  for (const item of list.items) {
    // Cada item puede contener varios tokens; el primero es texto.
    for (const child of item.tokens) {
      if (child.type === 'text') {
        const para = child as Tokens.Text;
        const inline = (para.tokens as Tokens.Generic[]) ?? [
          { type: 'text', raw: para.text, text: para.text } as Tokens.Generic,
        ];
        out.push(
          blockFromTokens('normal', inline, {
            listItem: listType,
            level,
          })
        );
      } else if (child.type === 'list') {
        emitListItems(child as Tokens.List, level + 1, out);
      } else if (child.type === 'paragraph') {
        const p = child as Tokens.Paragraph;
        out.push(
          blockFromTokens('normal', (p.tokens as Tokens.Generic[]) ?? [], {
            listItem: listType,
            level,
          })
        );
      }
    }
  }
}

export function markdownToPortableText(markdown: string): Output {
  const tokens = marked.lexer(markdown);
  const out: Output = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const h = token as Tokens.Heading;
        // Depth 1 lo reservamos para el campo `title` del post.
        if (h.depth === 1) continue;
        const style = `h${Math.min(h.depth, 4)}`;
        out.push(
          blockFromTokens(style, (h.tokens as Tokens.Generic[]) ?? [])
        );
        break;
      }
      case 'paragraph': {
        const p = token as Tokens.Paragraph;
        out.push(
          blockFromTokens('normal', (p.tokens as Tokens.Generic[]) ?? [])
        );
        break;
      }
      case 'blockquote': {
        const bq = token as Tokens.Blockquote;
        for (const inner of bq.tokens as Tokens.Generic[]) {
          if (inner.type === 'paragraph') {
            const p = inner as Tokens.Paragraph;
            out.push(
              blockFromTokens(
                'blockquote',
                (p.tokens as Tokens.Generic[]) ?? []
              )
            );
          }
        }
        break;
      }
      case 'list':
        emitListItems(token as Tokens.List, 1, out);
        break;
      case 'code': {
        const c = token as Tokens.Code;
        out.push({
          _type: 'codeBlock',
          _key: key(),
          code: c.text,
          ...(c.lang ? { language: c.lang } : {}),
        });
        break;
      }
      case 'hr':
      case 'space':
        break;
      default:
        // Fallback: emit como párrafo si tiene .text/.raw
        if (typeof (token as Tokens.Generic).raw === 'string') {
          out.push(
            blockFromTokens('normal', [
              {
                type: 'text',
                raw: (token as Tokens.Generic).raw as string,
                text: (token as Tokens.Generic).raw as string,
              } as Tokens.Generic,
            ])
          );
        }
    }
  }

  return out;
}
