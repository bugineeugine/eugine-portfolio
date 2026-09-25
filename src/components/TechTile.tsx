import Image from "next/image";
import type { Tech } from "@/data/portfolio";

export function TechTile({ tech }: { tech: Tech }) {
  return (
    <li className="flex flex-col items-center gap-2.5 rounded-xl border border-line bg-white px-2 py-4 transition-colors hover:border-accent">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-well">
        {tech.icon ? (
          <Image
            src={`/icons/${tech.icon}.svg`}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="h-7 w-7"
          />
        ) : (
          <span className="font-display text-base font-bold text-accent">{tech.name.charAt(0)}</span>
        )}
      </span>
      <span className="text-center text-xs font-medium text-ink">{tech.name}</span>
    </li>
  );
}
