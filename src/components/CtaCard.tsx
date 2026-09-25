import { cta, profile } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function CtaCard() {
  return (
    <section className="rounded-xl bg-navy p-6 text-white">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Glyph name="mail" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-semibold">{cta.title}</h2>
          <p className="mt-1 text-sm leading-6 text-white/70">{cta.text}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold hover:bg-blue-500"
          >
            {cta.button}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
