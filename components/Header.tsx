import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between h-[72px] px-7 max-md:px-5">
      <Link href="/" className="type-nav text-t11 hover:text-t9 transition-colors">
        Andy Madrick
      </Link>
      <nav className="flex items-center gap-6 type-nav text-t9">
        <a href="https://x.com/andymadrick" target="_blank" rel="noopener noreferrer" className="hover:text-t11 transition-colors">X</a>
        <a href="https://www.linkedin.com/in/andy-madrick-67815589/" target="_blank" rel="noopener noreferrer" className="hover:text-t11 transition-colors">LinkedIn</a>
      </nav>
    </header>
  );
}
