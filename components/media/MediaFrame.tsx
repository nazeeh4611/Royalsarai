import Image from "next/image";
import { cn } from "@/lib/cn";
import { mediaLibrary, type MediaId } from "@/lib/media";
import { AbstractScene, type SceneVariant } from "@/components/media/AbstractScene";

const roundedClasses = {
  lg: "rounded-[var(--radius-lg)]",
  md: "rounded-[var(--radius-md)]",
  sm: "rounded-[var(--radius-sm)]",
  full: "rounded-full",
  none: "rounded-none",
} as const;

interface MediaFrameProps {
  id: MediaId;
  scene: SceneVariant;
  tone?: "indigo" | "violet" | "gold" | "blue";
  rounded?: keyof typeof roundedClasses;
  className?: string;
  priority?: boolean;
}

/** Renders a real photo once `mediaLibrary[id].src` is populated; a custom
 * illustrated placeholder otherwise. See lib/media.ts for how to swap. */
export function MediaFrame({
  id,
  scene,
  tone,
  rounded = "lg",
  className,
  priority,
}: MediaFrameProps) {
  const entry = mediaLibrary[id];

  return (
    <div className={cn("relative overflow-hidden", roundedClasses[rounded], className)}>
      {entry.src ? (
        <Image
          src={entry.src}
          alt={entry.alt}
          fill
          priority={priority}
          className={entry.fit === "contain" ? "object-contain" : "object-cover"}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <AbstractScene variant={scene} alt={entry.alt} tone={tone} />
      )}
    </div>
  );
}
