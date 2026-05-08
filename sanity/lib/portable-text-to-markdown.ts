import type { PortableTextBlock } from '@portabletext/react';
import { urlForImage } from './image';

type Span = {
  _type: 'span';
  text: string;
  marks?: string[];
};

type Block = PortableTextBlock & {
  style?: string;
  listItem?: string;
  level?: number;
  children?: Span[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
};

type ImageNode = {
  _type: 'image';
  alt?: string;
  caption?: string;
  asset?: { _ref: string };
};

type CodeBlockNode = {
  _type: 'codeBlock';
  code?: string;
  language?: string;
};

type Node = Block | ImageNode | CodeBlockNode;

function escapeMd(text: string): string {
  return text.replace(/([_*`\\])/g, '\\$1');
}

function renderSpan(span: Span, marks: Record<string, { href?: string }>): string {
  let out = escapeMd(span.text ?? '');
  for (const mark of span.marks ?? []) {
    if (mark === 'strong') out = `**${out}**`;
    else if (mark === 'em') out = `*${out}*`;
    else if (mark === 'code') out = `\`${span.text}\``;
    else if (marks[mark]?.href) out = `[${out}](${marks[mark].href})`;
  }
  return out;
}

function renderBlock(block: Block): string {
  const markDefs: Record<string, { href?: string }> = {};
  for (const md of block.markDefs ?? []) {
    markDefs[md._key] = { href: md.href };
  }
  const text = (block.children ?? [])
    .filter((s): s is Span => (s as Span)._type === 'span')
    .map((s) => renderSpan(s, markDefs))
    .join('');

  if (block.listItem === 'bullet') {
    const indent = '  '.repeat(Math.max(0, (block.level ?? 1) - 1));
    return `${indent}- ${text}`;
  }
  if (block.listItem === 'number') {
    const indent = '  '.repeat(Math.max(0, (block.level ?? 1) - 1));
    return `${indent}1. ${text}`;
  }

  switch (block.style) {
    case 'h2':
      return `## ${text}`;
    case 'h3':
      return `### ${text}`;
    case 'h4':
      return `#### ${text}`;
    case 'blockquote':
      return text
        .split('\n')
        .map((l) => `> ${l}`)
        .join('\n');
    default:
      return text;
  }
}

export function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  if (!Array.isArray(blocks)) return '';

  const lines: string[] = [];
  for (const node of blocks as Node[]) {
    if (node._type === 'block') {
      lines.push(renderBlock(node as Block));
    } else if (node._type === 'image') {
      const img = node as ImageNode;
      if (img.asset) {
        const url = urlForImage(img).width(1200).url();
        lines.push(`![${img.alt ?? ''}](${url})`);
        if (img.caption) lines.push(`*${img.caption}*`);
      }
    } else if (node._type === 'codeBlock') {
      const code = node as CodeBlockNode;
      lines.push(`\`\`\`${code.language ?? ''}\n${code.code ?? ''}\n\`\`\``);
    }
  }

  // Compactar líneas vacías consecutivas: separador estándar = línea en blanco.
  return lines.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}
