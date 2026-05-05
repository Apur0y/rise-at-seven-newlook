import type { MouseEventHandler, ReactNode } from "react";
import { MdArrowOutward } from "react-icons/md";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  variant?: "outline" | "solid";
  href?: string;
}

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  variant = "outline",
  href,
}: AnimatedButtonProps) {
  const base =
    variant === "solid"
      ? "bg-white text-black border border-gray-100"
      : "bg-transparent text-black border border-white/30 hover:bg-white hover:text-black hover:border-white";

  const inner = (
    <span
      className={`
        relative inline-block overflow-hidden
        px-6 py-3 text-sm font-medium tracking-wide 
        transition-all duration-300
        rounded-4xl hover:rounded-sm
        ${base} ${className}
      `}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className="relative block h-[1.2em] overflow-hidden">
        {/* Main */}
        <span className="flex items-center gap-2 whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">
          {children}
          <MdArrowOutward className="text-md shrink-0" />
        </span>

        {/* Hover */}
        <span className="absolute left-0 top-0 w-full flex items-center gap-2 whitespace-nowrap translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
          <MdArrowOutward className="text-md shrink-0" />
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="group inline-block">
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      {inner}
    </button>
  );
}
