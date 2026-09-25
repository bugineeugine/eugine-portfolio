import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { AboutCard } from "@/components/AboutCard";
import { ConnectCard } from "@/components/ConnectCard";
import { CtaCard } from "@/components/CtaCard";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <TechStack />
          <aside className="flex flex-col gap-6">
            <AboutCard />
            <ConnectCard />
            <CtaCard />
          </aside>
        </div>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
