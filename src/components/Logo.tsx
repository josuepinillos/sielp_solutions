import Image from "next/image";
import { site } from "@/content/site";

// Uses the official logo once it is configured in src/content/site.ts.
// Until then it falls back to the brand name set in the site typeface.
export function Logo({ className = "" }: { className?: string }) {
  if (site.logo) {
    return (
      <Image
        src={site.logo.src}
        width={site.logo.width}
        height={site.logo.height}
        alt={site.name}
        priority
        className={`h-9 w-auto ${className}`}
      />
    );
  }

  return (
    <span className={`text-[1.25rem] leading-none font-semibold tracking-[-0.035em] text-ink ${className}`}>
      Sielp<span className="font-normal text-ink-soft"> Solutions</span>
    </span>
  );
}
