import { Intro } from "@/components/Intro";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-180 border-x border-line px-6 sm:px-10">
      <Intro />
      <main>
        <Skills />
      </main>
    </div>
  );
}
