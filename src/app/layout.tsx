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

// Shared defaults. Each page sets its own title, description, canonical URL
// and Open Graph copy; the share image comes from the opengraph-image file of
// each route segment.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "es_PE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f9f9fb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next resets the smooth scroll while changing routes,
    // so going to another page starts at its top instantly.
    <html lang="es" className={bricolage.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
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
