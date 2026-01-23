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
  const baseStyles = "flex items-center h-7 gap-1.5 px-2.5 py-0.5 rounded-md text-base font-[450] leading-[1.45] tracking-[0.07px] opsz-20 ff-body text-t11 hover:bg-t1 hover:text-t10 transition-colors";

  if (href) {
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
