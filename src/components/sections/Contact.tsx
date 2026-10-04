import { ArrowRight, ArrowUpRight, EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { getChannels, whatsappUrl, type ChannelId } from "@/content/site";
import { buttonClass } from "../Button";
import { Reveal } from "../Reveal";
import { ContactForm, type ContactVariant } from "./ContactForm";

const channelIcons: Record<ChannelId, typeof WhatsappLogo> = {
  whatsapp: WhatsappLogo,
  instagram: InstagramLogo,
  email: EnvelopeSimple,
};

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

// Same channels and form for both lines; the copy, the form options and the
// WhatsApp greeting adapt to the page (see ContactForm variants).
const copy: Record<ContactVariant, { title: string; lead: string; whatsappText?: string }> = {
  empresas: {
    title: "Hablemos.",
    lead: "Cuéntanos qué necesitas. Escríbenos por WhatsApp, Instagram o email, o déjanos un mensaje.",
  },
  eventos: {
    title: "Hablemos de tu evento.",
    lead: "Escríbenos por WhatsApp, Instagram o email, o déjanos los detalles de tu celebración.",
    whatsappText: "Hola Sielp Solutions. Me interesa una invitación digital para mi evento.",
  },
};

export function Contact({ variant = "empresas" }: { variant?: ContactVariant }) {
  const channels = getChannels();
  const { title, lead, whatsappText } = copy[variant];

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="anchor-section pb-24 [--section-pt:4rem] md:pb-32 md:[--section-pt:6rem]"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="contact-title" className="text-h2 max-w-[14ch]">
              {title}
            </h2>
            <p className="text-lead mt-6 max-w-[28rem]">{lead}</p>
            <a href={whatsappUrl(whatsappText)} {...newTab} className={buttonClass("primary", "mt-8")}>
              <WhatsappLogo aria-hidden className="size-5" />
              Escribir por WhatsApp
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
              />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </Reveal>

          <ul className="mt-12" aria-label="Canales de contacto">
            {channels.map((channel, index) => {
              const Icon = channelIcons[channel.id];
              return (
                <Reveal as="li" key={channel.id} delay={0.05 * index}>
                  <a
                    href={channel.href}
                    {...(channel.external ? newTab : {})}
                    className="group flex min-h-16 items-center gap-4 border-t border-line py-4 transition-colors active:bg-lavender-mist/60"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lavender-mist text-indigo transition-colors duration-300 group-hover:bg-indigo group-hover:text-paper">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{channel.label}</span>
                      <span className="block text-sm break-words text-ink-muted">{channel.handle}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-ink-soft transition-[transform,color] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo"
                    />
                    {channel.external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <ContactForm variant={variant} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
