import { techCategories, ui } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTile } from "@/components/TechTile";

export function TechStack() {
  return (
    <section id="skills" className="scroll-mt-20">
      <SectionHeading title={ui.tech.title} subtitle={ui.tech.subtitle} />
      <div className="mt-6 space-y-8">
        {techCategories.map((category) => (
          <div key={category.title}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-body">
              {category.title}
            </h3>
            <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {category.items.map((tech) => (
                <TechTile key={tech.name} tech={tech} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
