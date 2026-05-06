import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const ACCENT = '#be8f52';

// OG image dinámica 1200x630 — recortada para LinkedIn / X / WhatsApp / FB.
// Se usa desde generateMetadata como:
//   openGraph.images = [{ url: `/api/og?title=...&kicker=...` }]
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? 'Saints & Sinners Tattoo Madrid').slice(0, 140);
  const kicker = (searchParams.get('kicker') ?? 'Estudio de tatuajes en Madrid').slice(0, 80);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 60%, #0a0a0a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ACCENT,
            }}
          />
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: 4,
              color: ACCENT,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Saints &amp; Sinners
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#ffffff',
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid rgba(190,143,82,0.35)',
          }}
        >
          <span style={{ fontSize: 24, color: '#d4d4d8' }}>tattoomadrid.com</span>
          <span style={{ fontSize: 24, color: ACCENT }}>Madrid · desde 2008</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
