import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-body lg:px-8">
        &copy; {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  );
}
