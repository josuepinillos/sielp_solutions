import { getChannels, nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const channels = getChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-4 max-w-[26ch] text-ink-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-sm font-semibold text-ink">Navegación</h2>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="text-ink-muted transition-colors hover:text-indigo">
                  {item.label}
                </a>
              </li>
            ))}
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
                  className="text-ink-muted transition-colors hover:text-indigo"
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
