import Image from "next/image";
import { profile } from "@/data/portfolio";

export function Intro() {
  return (
    <header className="flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:gap-8">
      <Image
        src={profile.avatar}
        alt={`Avatar of ${profile.name}`}
        width={96}
        height={96}
        priority
        className="h-18 w-18 shrink-0 rounded-full border border-line object-cover sm:h-24 sm:w-24"
      />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {profile.name}
        </h1>
        <p className="mt-1 max-w-md text-muted">{profile.title}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
          {profile.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
