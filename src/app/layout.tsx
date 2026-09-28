import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Providers } from "@/components/Providers";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: "Sielp Solutions | Experiencias digitales para empresas, marcas y eventos",
  description: site.description,
  openGraph: {
    title: "Sielp Solutions",
    description: site.description,
    locale: "es",
    type: "website",
    images: [{ url: "/assets/sielp_avatars/hero.webp" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f9fb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={bricolage.variable} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS can run them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-indigo focus:px-5 focus:py-3 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
        <RevealObserver />
      </body>
    </html>
  );
}
