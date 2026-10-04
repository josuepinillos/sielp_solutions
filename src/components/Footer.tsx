import Link from "next/link";
import { getChannels, homeNav, lines, routes, site } from "@/content/site";
import { Logo } from "./Logo";

// Shared by every route. Home sections are linked with absolute paths so they
// work from any page; "Contacto" stays in-page because every page has one.
const sitemapLinks = [
  ...homeNav.map((item) => ({ label: item.label, href: `${routes.home}${item.href}` })),
  { label: "Contacto", href: "#contacto" },
];

const linkClass = "text-ink-muted transition-colors hover:text-indigo";

export function Footer() {
  const channels = getChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-[28ch] text-ink-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Líneas de Sielp Solutions">
          <h2 className="text-sm font-semibold text-ink">Qué hacemos</h2>
          <ul className="mt-4 grid gap-2.5">
            {lines.map((line) => (
              <li key={line.href}>
                {/* No prefetch: each line's code loads only when it is visited. */}
                <Link href={line.href} prefetch={false} className={linkClass}>
                  {line.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Pie de página">
          <h2 className="text-sm font-semibold text-ink">Navegación</h2>
          <ul className="mt-4 grid gap-2.5">
            {sitemapLinks.map((item) =>
              item.href.startsWith("#") ? (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">Contacto</h2>
          <ul className="mt-4 grid gap-2.5">
            {channels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={linkClass}
                >
                  {channel.label}
                  {channel.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell border-t border-line py-6 text-sm text-ink-soft">
        © {year} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
