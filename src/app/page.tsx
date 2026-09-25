import { Intro } from "@/components/Intro";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-180 flex-col border-x border-line px-6 sm:px-10">
      <Intro />
      <main className="flex-1">
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <footer className="border-t border-line py-6 font-mono text-xs text-muted">
        &copy; {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
