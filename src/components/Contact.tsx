import { availability, profile } from "@/data/portfolio";
import { Section } from "@/components/Section";

export function Contact() {
  return (
    <Section number="04" title="Contact" id="contact">
      <p className="text-ink">{availability}</p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-2 inline-block font-mono text-sm underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
      >
        {profile.email}
      </a>
    </Section>
  );
}
