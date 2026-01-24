import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  trailing?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({ children, trailing, href, onClick, className = "", type, disabled }: ButtonProps) {
  const baseStyles = "flex items-center h-7 gap-1.5 px-2.5 py-0.5 rounded-md text-base font-book leading-[1.45] tracking-[0.07px] opsz-20 ff-body text-t11 hover:bg-t1 hover:text-t10 transition-colors";

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a href={href} className={`${baseStyles} ${className}`}>
          {children}
          {trailing}
        </a>
      );
    }

    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
        {trailing}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
      {trailing}
    </button>
  );
}
