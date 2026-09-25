import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";

export function Skills() {
  return (
    <Section number="01" title="Skills" id="skills">
      <dl className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">
              {group.label}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
