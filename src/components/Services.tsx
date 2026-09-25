import { services } from "@/data/portfolio";
import { Section } from "@/components/Section";

export function Services() {
  return (
    <Section number="03" title="Services" id="services">
      <ol className="flex flex-col gap-6">
        {services.map((service, index) => (
          <li key={service.title} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="font-mono text-xs text-muted sm:pt-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-medium text-ink">{service.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{service.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
