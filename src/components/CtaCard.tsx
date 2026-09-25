import { cta, profile } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";
import { NodeGraph } from "@/components/NodeGraph";

export function CtaCard() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-navy p-6 text-white">
      <NodeGraph className="text-white/6" />
      <div
        aria-hidden
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-glow/20 blur-3xl"
      />
      <div className="relative flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Glyph name="mail" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold">{cta.title}</h2>
          <p className="mt-1 text-sm leading-6 text-white/70">{cta.text}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            {cta.button}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
