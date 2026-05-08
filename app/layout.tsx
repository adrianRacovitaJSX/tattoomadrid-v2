import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SiteFrame from "@/components/site-frame";
import CookieConsentBanner from "@/components/cookie-consent";
import GoogleAnalytics from "@/components/google-analytics";
import JsonLd from "@/components/json-ld";
import WebVitals from "@/components/web-vitals";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Estudio de Tatuajes Profesional en Madrid`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Estudio de tatuajes profesional en Madrid desde 2008. Tatuajes personalizados, piercings y micropigmentación con artistas especializados. Reserva tu cita en Saints & Sinners.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-ES": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Estudio de Tatuajes Profesional en Madrid`,
    description:
      "Estudio de tatuajes profesional en Madrid desde 2008. Tatuajes personalizados, piercings y micropigmentación.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Estudio de Tatuajes Profesional en Madrid`,
    description:
      "Estudio de tatuajes profesional en Madrid desde 2008. Tatuajes personalizados, piercings y micropigmentación.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        {/* Speculation Rules API: prerender de páginas comerciales en hover/scroll
            (Chrome 144+). Reduce INP percibido en navegación interna. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    href_matches: [
                      "/reservar",
                      "/contacto",
                      "/servicios",
                    ],
                  },
                  eagerness: "moderate",
                },
              ],
              prefetch: [
                {
                  where: { href_matches: "/blog/*" },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
      </head>
      <GoogleAnalytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteFrame>{children}</SiteFrame>
          <CookieConsentBanner />
        </ThemeProvider>
        <WebVitals />
      </body>
    </html>
  );
}
