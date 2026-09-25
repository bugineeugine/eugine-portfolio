import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="flex flex-col gap-12">
          <TechStack />
          <Projects />
        </div>
        <aside className="flex flex-col gap-6" />
      </main>
      <Footer />
    </>
  );
}
