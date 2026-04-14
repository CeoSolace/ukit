import Link from "next/link";
import type { Route } from "next";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/investigations", label: "Investigations" },
  { href: "/categories", label: "Categories" },
  { href: "/timeline", label: "Timeline" },
  { href: "/take-action", label: "Take Action" },
  { href: "/about", label: "About" },
  { href: "/legal", label: "Legal" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="bg-neutral-900 text-neutral-50 border-b border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-light">
          UKit
        </Link>

        <nav className="flex space-x-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary-light transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
