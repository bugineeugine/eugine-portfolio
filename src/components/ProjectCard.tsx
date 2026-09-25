import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative aspect-video bg-navy">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-white/60">
            {project.title}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="border-l-[3px] border-accent pl-3 font-semibold text-ink">{project.title}</h3>
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
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-3.5 font-mono text-[11px] text-muted">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-3 pl-3.5 text-sm leading-6 text-body">{project.description}</p>
      </div>
    </article>
  );
}
