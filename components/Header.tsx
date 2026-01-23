import Link from "next/link";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="flex items-center justify-between pl-7 max-md:pl-5 pr-6 py-6">
      <Link
        href="/"
        className="text-sm font-medium leading-[1.45] tracking-[0.07px] opsz-20 ff-body text-t11 hover:text-t12 transition-colors"
      >
        Andy Madrick
      </Link>
      <nav className="flex items-center">
        <Button href="/contact">Contact</Button>
        <div className="flex items-center justify-center size-7">
          <span className="size-3.5 rounded-full bg-green-500" />
        </div>
      </nav>
    </header>
  );
}
