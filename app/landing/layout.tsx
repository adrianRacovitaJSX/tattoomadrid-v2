import type { Metadata } from "next";
import Script from "next/script";

const META_PIXEL_ID = "2146708569419537";

export const metadata: Metadata = {
  title: "Consulta Gratuita de Tatuaje | Saints & Sinners by Gamboa — Madrid",
  description:
    "Reserva tu consulta gratuita en Saints & Sinners, estudio de tatuajes en Ciudad Lineal, Madrid. 13 años de experiencia, 6 artistas especialistas, +5.000 clientes. Sin compromiso.",
  robots: { index: false, follow: false },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {children}
    </>
  );
}
