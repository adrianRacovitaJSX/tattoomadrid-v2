import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // X-Robots-Tag: permite snippets largos en AI Overviews y previews ricos.
  // Equivalente al meta robots, pero también aplica a respuestas no-HTML
  // (e.g. /llms-full.txt, /md/*) que no pueden incluir <meta>.
  {
    key: "X-Robots-Tag",
    value:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Redirecciones de rutas antiguas a nuevas
      // Mientras /artistas no exista (lo implementaremos a futuro), las rutas
      // antiguas redirigen a /servicios, que es la página comercial principal.
      {
        source: "/artistas-tatuadores/:path*",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/artistas",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/artistas/:path*",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/estudio-piercings/:path*",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/eventos-noticias/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nuestro-estudio-tatuajes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/estudio-tatuajes-madrid/:path*",
        destination: "/contacto",
        permanent: true,
      },
      {
        source: "/noticias/:path*",
        destination: "/",
        permanent: true,
      },
      // Política de privacidad — canónica: /privacidad
      {
        source: "/politica-privacidad",
        destination: "/privacidad",
        permanent: true,
      },
      {
        source: "/politica-privacidad/:path*",
        destination: "/privacidad",
        permanent: true,
      },
      {
        source: "/politica-de-privacidad",
        destination: "/privacidad",
        permanent: true,
      },
      {
        source: "/politica-de-privacidad/:path*",
        destination: "/privacidad",
        permanent: true,
      },
      // Política de cookies — canónica: /cookies
      {
        source: "/politica-cookies",
        destination: "/cookies",
        permanent: true,
      },
      {
        source: "/politica-cookies/:path*",
        destination: "/cookies",
        permanent: true,
      },
      {
        source: "/politica-de-cookies",
        destination: "/cookies",
        permanent: true,
      },
      {
        source: "/politica-de-cookies/:path*",
        destination: "/cookies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
