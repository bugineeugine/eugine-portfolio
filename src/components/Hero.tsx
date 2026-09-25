import Image from "next/image";
import { profile, ui } from "@/data/portfolio";
import { NodeGraph } from "@/components/NodeGraph";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-navy text-white scroll-mt-16">
      <NodeGraph className="text-white/7" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
        <div>
          <span className="hero-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            {profile.role}
            <span className="text-white/40" aria-hidden>
              /
            </span>
            {profile.roleSecondary}
          </span>
          <h1 className="hero-in mt-6 font-display text-4xl font-bold tracking-tight [animation-delay:90ms] sm:text-5xl lg:text-6xl">
            {profile.headline} <span className="whitespace-nowrap text-glow">{profile.headlineAccent}</span>{" "}
            {profile.headlineTail}
          </h1>
          <p className="hero-in mt-6 max-w-xl text-lg leading-8 text-white/70 [animation-delay:180ms]">
            {profile.intro}
          </p>
          <a
            href="#projects"
            className="hero-in mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white [animation-delay:270ms] hover:bg-blue-700"
          >
            {ui.heroCta}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <div className="relative justify-self-center">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-glow/25 blur-3xl" />
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={360}
            height={360}
            loading="eager"
            fetchPriority="high"
            className="relative h-60 w-60 rounded-3xl object-cover ring-1 ring-white/15 lg:h-90 lg:w-90"
          />
        </div>
      </div>
    </section>
  );
}
