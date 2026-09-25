type Props = { title: string; subtitle: string };

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="border-l-[3px] border-accent pl-4">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <p className="mt-0.5 text-sm text-body">{subtitle}</p>
    </div>
  );
}
