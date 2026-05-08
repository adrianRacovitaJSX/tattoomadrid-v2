import Studio from './Studio';

// Reexportamos metadata y viewport del paquete (incluye `robots: noindex`).
export { metadata, viewport } from 'next-sanity/studio';

export const dynamic = 'force-static';

export default function StudioPage() {
  return <Studio />;
}
