import { profile, ui } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function AboutCard() {
  return (
    <section id="about" className="scroll-mt-20 rounded-xl border border-line bg-white p-6">
      <h2 className="border-l-[3px] border-accent pl-3 text-lg font-bold text-ink">{ui.aboutTitle}</h2>
      <p className="mt-4 text-sm leading-7 text-body">{profile.bio}</p>
      <dl className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
        {profile.facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Glyph name={fact.icon} />
            </span>
            <dt className="w-24 text-sm text-body">{fact.label}</dt>
            <dd className="text-sm font-medium text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
