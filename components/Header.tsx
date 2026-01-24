import { Button } from "./Button";

export function Header() {
  return (
    <header className="flex items-center justify-between pl-7 max-md:pl-5 pr-6 py-6">
      <span className="text-base font-book leading-[1.45] tracking-[0.07px] opsz-20 ff-body text-t11">
        Andy Madrick
      </span>
      <nav className="flex items-center gap-3.5 max-md:gap-2.5">
        <Button href="mailto:andy@madrick.design">Contact</Button>
        <div className="flex items-center justify-center size-7">
          <span className="size-3.5 rounded-full bg-[#49BF4C]" />
        </div>
      </nav>
    </header>
  );
}
