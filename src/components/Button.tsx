import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "secondary" | "inverse";

const base =
  "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

export const buttonVariants: Record<Variant, string> = {
  primary:
    "bg-indigo text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_-14px_rgba(37,32,182,0.8)] hover:bg-indigo-deep hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_32px_-16px_rgba(37,32,182,0.85)]",
  secondary:
    "border border-line bg-paper/70 text-ink hover:border-indigo/30 hover:bg-paper",
  inverse: "bg-paper text-indigo hover:bg-lavender-mist",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${buttonVariants[variant]} ${extra}`;
}

export function Button({
  href,
  variant = "primary",
  arrow = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
