import Image from "next/image";
import { profile, ui } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function ConnectCard() {
  return (
    <section className="rounded-xl border border-line bg-white p-6">
      <h2 className="border-l-[3px] border-accent pl-3 font-display text-xl font-bold text-ink">
        {ui.connectTitle}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {profile.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-3 text-sm font-medium text-ink hover:text-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                {link.icon ? (
                  <Image
                    src={`/icons/${link.icon}.svg`}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="h-4 w-4"
                  />
                ) : link.monogram ? (
                  <span className="font-display text-sm font-bold">{link.monogram}</span>
                ) : (
                  <Glyph name={link.href.startsWith("mailto:") ? "mail" : "arrow"} />
                )}
              </span>
              {link.label}
              <Glyph name="arrow" className="ml-auto h-3.5 w-3.5 text-muted" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
