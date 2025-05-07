import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Redirecciones de rutas antiguas a nuevas
      {
        source: '/artistas-tatuadores/:path*',
        destination: '/artistas',
        permanent: true,
      },
      {
        source: '/Artistas/:path*',
        destination: '/artistas',
        permanent: true,
      },
      {
        source: '/author/:path*',
        destination: '/artistas',
        permanent: true,
      },
      {
        source: '/estudio-piercings/:path*',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/eventos-noticias/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/nuestro-estudio-tatuajes/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/estudio-tatuajes-madrid/:path*',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/noticias/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/politica-privacidad/:path*',
        destination: '/privacidad',
        permanent: true,
      },
      {
        source: '/politica-cookies/:path*',
        destination: '/cookies',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad/:path*',
        destination: '/privacidad',
        permanent: true,
      },
      {
        source: '/politica-de-cookies/:path*',
        destination: '/cookies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
