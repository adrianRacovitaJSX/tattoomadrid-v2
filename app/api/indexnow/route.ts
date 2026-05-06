import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INDEXNOW_KEY = '93308763f12b98d3a113a63229bb9245';
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// IndexNow protocol: push de URLs nuevas/actualizadas a Bing, Yandex, Naver,
// Seznam — y, vía Bing, alimenta ChatGPT Search y Perplexity.
//
// Uso:
//   POST /api/indexnow
//   Header: x-internal-token: <INDEXNOW_INTERNAL_TOKEN>
//   Body:   { "urls": ["https://tattoomadrid.com/blog/nuevo-post"] }
//
// O sin body, para hacer ping de las URLs principales del sitio.
export async function POST(request: Request) {
  const internalToken = request.headers.get('x-internal-token');
  const expected = process.env.INDEXNOW_INTERNAL_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'INDEXNOW_INTERNAL_TOKEN no configurado en el servidor' },
      { status: 500 }
    );
  }

  if (internalToken !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let urls: string[] = [];
  try {
    const body = (await request.json().catch(() => null)) as { urls?: string[] } | null;
    urls = body?.urls ?? [];
  } catch {
    urls = [];
  }

  if (urls.length === 0) {
    urls = [
      `${SITE_URL}/`,
      `${SITE_URL}/servicios`,
      `${SITE_URL}/reservar`,
      `${SITE_URL}/contacto`,
      `${SITE_URL}/blog`,
    ];
  }

  // Validamos que todas las URLs pertenezcan al host autorizado para evitar abuso.
  const invalid = urls.find((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (invalid) {
    return NextResponse.json(
      { ok: false, error: `URL fuera de host: ${invalid}` },
      { status: 400 }
    );
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return NextResponse.json({
    ok: response.ok,
    status: response.status,
    submitted: urls.length,
    keyLocation: KEY_LOCATION,
  });
}
