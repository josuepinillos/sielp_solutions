// Fades content up as it enters the viewport, once. Pure CSS + one shared
// IntersectionObserver (RevealObserver): content stays visible without JS and
// for visitors who prefer reduced motion. See [data-reveal] in globals.css.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as;
  return (
    <Tag
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
