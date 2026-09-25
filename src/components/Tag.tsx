import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-line bg-white px-2 py-0.5 font-mono text-xs leading-5 text-ink">
      {children}
    </span>
  );
}
