import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Endpoint de RUM. Por ahora solo loggea (Vercel Logs); se puede cambiar a
// reenvío a un sink real (Logflare, Axiom, GA4 measurement protocol) cuando
// se decida la infraestructura. Mantiene contrato estable con el cliente.
export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    if (!payload) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Salida estructurada para que Vercel logs / observability lo parsee.
    console.log('[web-vitals]', JSON.stringify(payload));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
