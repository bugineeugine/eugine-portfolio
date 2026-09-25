import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { NodeGraph } from "@/components/NodeGraph";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative aspect-video overflow-hidden bg-navy">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <NodeGraph className="text-white/8" />
            <span
              aria-hidden
              className="absolute -right-2 -bottom-6 font-display text-[9rem] leading-none font-bold text-white/6"
            >
              {project.title.charAt(0)}
            </span>
            <div className="relative flex h-full items-center justify-center text-sm font-medium text-white/60">
              {project.title}
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="border-l-[3px] border-accent pl-3 font-display text-lg font-bold text-ink">
            {project.title}
          </h3>
          {project.href && (
            <a
              href={project.href}
              className="text-body hover:text-accent"
              aria-label={`Open ${project.title}`}
            >
              &#8599;
            </a>
          )}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-3.5 text-xs text-body">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-3 pl-3.5 text-sm leading-6 text-body">{project.description}</p>
      </div>
    </article>
  );
}
