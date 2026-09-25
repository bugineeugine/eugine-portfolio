import type { ReactNode } from "react";

type SectionProps = {
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

export function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-line py-12">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted">{number}</span>
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-ink">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
