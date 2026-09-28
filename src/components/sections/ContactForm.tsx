"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { whatsappUrl } from "@/content/site";
import { Avatar } from "../Avatar";
import { buttonClass } from "../Button";

const serviceOptions = [
  "Desarrollo web",
  "Landing page",
  "Dashboard",
  "Solución digital a medida",
  "Invitación digital para un evento",
  "Otro",
];

type Errors = Partial<Record<"name" | "message", string>>;

const fieldClass =
  "w-full rounded-field border border-line bg-canvas px-4 text-ink transition-[border-color,box-shadow] duration-200 hover:border-ink/25 focus:border-indigo focus:shadow-[0_0_0_4px_rgba(37,32,182,0.14)] focus-visible:outline-none aria-[invalid=true]:border-danger";

// The message the visitor sees prefilled in WhatsApp (they send it themselves).
export function buildWhatsappMessage({
  name,
  company,
  service,
  message,
}: {
  name: string;
  company: string;
  service: string;
  message: string;
}) {
  return [
    "Hola Sielp Solutions.",
    `Mi nombre es ${name}.`,
    company && `Empresa o evento: ${company}`,
    service && `Estoy interesado/a en: ${service}`,
    `Mensaje:\n${message}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [sender, setSender] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Escribe tu nombre.";
    if (message.length < 10) nextErrors.message = "Cuéntanos un poco más sobre tu idea (al menos 10 caracteres).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = nextErrors.name ? "name" : "message";
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const url = whatsappUrl(buildWhatsappMessage({ name, company, service, message }));
    window.open(url, "_blank", "noopener,noreferrer");
    setSender(name.split(" ")[0]);
    setSentUrl(url);
  }

  return (
    <div className="relative min-h-[34rem] rounded-panel border border-line bg-paper p-6 shadow-[0_24px_60px_-40px_rgba(23,21,63,0.3)] md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sentUrl ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[30rem] flex-col items-center justify-end text-center"
            role="status"
          >
            <p className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Gracias, {sender}.</p>
            <p className="mt-3 max-w-[32ch] text-ink-muted">
              Abrimos WhatsApp con tu mensaje listo. Solo falta que lo revises y lo envíes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.9375rem] font-medium">
              <a
                href={sentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo"
              >
                ¿No se abrió? Abrir WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
              <button
                type="button"
                onClick={() => setSentUrl(null)}
                className="text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink/60"
              >
                Escribir otro mensaje
              </button>
            </div>
            <div className="mt-8 w-[10rem] border-b border-line">
              <Avatar name="contact" sizes="160px" className="mx-auto w-full" />
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor={`${id}-name`} className="text-[0.9375rem] font-medium">
                  Nombre
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                  className={`${fieldClass} h-12`}
                />
                {errors.name && (
                  <p id={`${id}-name-error`} className="text-sm text-danger">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor={`${id}-company`} className="text-[0.9375rem] font-medium">
                  Empresa o evento <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <input
                  id={`${id}-company`}
                  name="company"
                  autoComplete="organization"
                  className={`${fieldClass} h-12`}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor={`${id}-service`} className="text-[0.9375rem] font-medium">
                Servicio
              </label>
              <div className="relative">
                <select
                  id={`${id}-service`}
                  name="service"
                  defaultValue=""
                  className={`${fieldClass} h-12 appearance-none pr-11`}
                >
                  <option value="">Selecciona una opción</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <CaretDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor={`${id}-message`} className="text-[0.9375rem] font-medium">
                Mensaje
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={5}
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={`${id}-message-hint${errors.message ? ` ${id}-message-error` : ""}`}
                className={`${fieldClass} resize-y py-3 leading-relaxed`}
              />
              <p id={`${id}-message-hint`} className="text-sm text-ink-muted">
                Qué quieres crear, para quién y si tienes una fecha en mente.
              </p>
              {errors.message && (
                <p id={`${id}-message-error`} className="text-sm text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
              <button
                type="submit"
                aria-describedby={`${id}-submit-hint`}
                className={buttonClass("primary", "w-full md:w-auto")}
              >
                Enviar
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                />
              </button>
              <p id={`${id}-submit-hint`} className="text-sm text-ink-muted">
                Se abrirá WhatsApp con tu mensaje listo para revisar y enviar.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
