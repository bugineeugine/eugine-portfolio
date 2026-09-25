import Image from "next/image";
import type { Tech } from "@/data/portfolio";

export function TechTile({ tech }: { tech: Tech }) {
  return (
    <li className="flex flex-col items-center gap-2 rounded-xl border border-line bg-white px-2 py-4">
      {tech.icon ? (
        <Image
          src={`/icons/${tech.icon}.svg`}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="h-8 w-8"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent">
          {tech.name.charAt(0)}
        </span>
      )}
      <span className="text-center text-xs font-medium text-ink">{tech.name}</span>
    </li>
  );
}
