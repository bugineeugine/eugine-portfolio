type GlyphName = "location" | "availability" | "experience" | "mail" | "arrow";

// Solid shapes for the About facts; thin strokes for small inline marks.
const filled: Partial<Record<GlyphName, string>> = {
  location:
    "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  availability:
    "M10 4h4a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H3V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2zm0 3h4V6h-4v1zM3 13.5h18V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5.5z",
  experience:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v4.6l3.2 1.9-.8 1.3L11 12.4V7h2z",
};

const stroked: Partial<Record<GlyphName, string>> = {
  mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
  arrow: "M7 17 17 7M9 7h8v8",
};

export function Glyph({ name, className = "h-4 w-4" }: { name: GlyphName; className?: string }) {
  const solid = filled[name];
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
        <path d={solid} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={stroked[name]} />
    </svg>
  );
}
