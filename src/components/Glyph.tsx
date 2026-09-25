type GlyphName = "location" | "availability" | "experience" | "mail" | "arrow";

const paths: Record<GlyphName, string> = {
  location: "M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  availability: "M4 7h16v12H4V7Zm4-3h8v3H8V4Zm4 8v4",
  experience: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
  mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
  arrow: "M7 17 17 7M9 7h8v8",
};

export function Glyph({ name, className = "h-4 w-4" }: { name: GlyphName; className?: string }) {
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
      <path d={paths[name]} />
    </svg>
  );
}
