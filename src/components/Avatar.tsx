import Image from "next/image";
import { avatar, type AvatarName } from "@/content/avatars";

/*
  The mascot, as one component for every section.

  `className` sets the size the pose is designed to have in its section. Two
  rules keep it sharp whatever file is behind it:
  - A temporary cut-out from the pose sheet is never shown wider than its own
    pixels (max-width = file width) and is served as-is, without the extra
    re-compression of the image optimizer.
  - A high-resolution render fills the designed size and is resized by the
    optimizer at high quality for each screen and pixel density.
  So swapping a cut-out for a render needs no change here or in the sections.
*/
export function Avatar({
  name,
  className = "",
  sizes,
  priority,
  decorative = false,
}: {
  name: AvatarName;
  className?: string;
  /** Rendered width hint for next/image (used to pick the render's resized variant). */
  sizes: string;
  priority?: boolean;
  /** Hide from assistive tech when the pose is purely decorative. */
  decorative?: boolean;
}) {
  const { src, alt, width, height, temporary } = avatar(name);
  return (
    <div className={className} style={temporary ? { maxWidth: width } : undefined}>
      <Image
        src={src}
        alt={decorative ? "" : alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        unoptimized={temporary}
        quality={90}
        draggable={false}
        className="block h-auto w-full select-none"
      />
    </div>
  );
}
