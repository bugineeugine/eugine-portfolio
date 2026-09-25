import { techStack } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTile } from "@/components/TechTile";

export function TechStack() {
  return (
    <section id="skills" className="scroll-mt-20">
      <SectionHeading title="Tech Stack" subtitle="Technologies I work with" />
      <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {techStack.map((tech) => (
          <TechTile key={tech.name} tech={tech} />
        ))}
      </ul>
    </section>
  );
}
