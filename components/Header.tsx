import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-7 py-6">
      <Link
        href="/"
        className="type-nav text-t11 hover:text-t12 transition-colors"
      >
        Andy Madrick
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/about"
          className="type-nav text-t8 hover:text-t11 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-1.5 type-nav text-t11 hover:text-t12 transition-colors"
        >
          Contact
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </Link>
      </nav>
    </header>
  );
}
