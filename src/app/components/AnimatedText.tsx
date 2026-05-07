import type { MouseEventHandler, ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  href?: string;
}

export default function AnimatedText({
  children,
  className = '',
  onClick,
  href,
}: AnimatedButtonProps) {
  const defaultClass =
    '  text-xl font-medium tracking-wide border border-black overflow-hidden inline-flex';

  const classes = className || defaultClass;

  const content = (
    <span
      className={`relative overflow-hidden transition-all duration-300 ${classes}`}
    >
      <span className="relative block h-[1.2em] overflow-hidden">
        {/* Main Text */}
        <span className="flex items-center whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>

        {/* Hover Text */}
        <span className="absolute left-0 top-0 whitespace-nowrap translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="group inline-flex">
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group bg-transparent border-none p-0 cursor-pointer"
    >
      {content}
    </button>
  );
}