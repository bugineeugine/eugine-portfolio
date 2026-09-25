import { navLinks, profile, ui } from "@/data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5 font-semibold text-ink">
          <span className="h-6 w-6 rounded-md bg-accent" aria-hidden />
          {profile.name}
        </a>
        <ul className="hidden gap-8 text-sm font-medium text-body md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {ui.navCta}
        </a>
      </nav>
    </header>
  );
}
