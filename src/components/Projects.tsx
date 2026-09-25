import { projects } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";

export function Projects() {
  return (
    <Section number="02" title="Projects" id="projects">
      <ul className="divide-y divide-line">
        {projects.map((project) => (
          <li key={project.title} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium text-ink">{project.title}</h3>
              {project.links.length > 0 && (
                <ul className="flex gap-4 font-mono text-xs">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
