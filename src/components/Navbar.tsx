import { navLinks, profile } from "@/data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="font-display text-lg font-bold whitespace-nowrap text-ink">
          {profile.name}
        </a>
        <ul className="flex gap-4 text-xs font-medium text-body sm:gap-8 sm:text-sm">
          {navLinks.map((link) => (
            <li key={link.href} className={link.href === "#home" ? "hidden sm:block" : undefined}>
              <a href={link.href} className="hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
