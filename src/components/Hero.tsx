import Image from "next/image";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            {profile.role}
            <span className="text-white/40" aria-hidden>
              /
            </span>
            {profile.roleSecondary}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.headline} <span className="text-accent">{profile.headlineAccent}</span>{" "}
            {profile.headlineTail}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{profile.intro}</p>
          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            View My Projects
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <div className="justify-self-center">
          <Image
            src={profile.avatar}
            alt={`Avatar of ${profile.name}`}
            width={360}
            height={360}
            priority
            className="h-60 w-60 rounded-3xl object-cover ring-1 ring-white/10 lg:h-90 lg:w-90"
          />
        </div>
      </div>
    </section>
  );
}
