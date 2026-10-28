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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // El Studio embebido /admin no debe indexarse: el X-Robots-Tag global
      // sobrescribiría el `robots: { index: false }` del layout, así que aquí
      // forzamos noindex,nofollow específicamente para /admin/*.
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirecciones de rutas antiguas a las del rediseño
      // /contacto duplicaba /reservar (mismo NAP, horario y formulario).
      {
        source: "/contacto",
        destination: "/reservar",
        permanent: true,
      },
      {
        source: "/artistas-tatuadores/:path*",
        destination: "/artistas",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/artistas",
        permanent: true,
      },
      {
        source: "/estudio-piercings/:path*",
        destination: "/piercing-madrid",
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
        destination: "/",
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
