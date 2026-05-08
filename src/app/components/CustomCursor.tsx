import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MdArrowOutward } from 'react-icons/md';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'default' | 'arrow' | 'button'>('default');
  const [cursorText, setCursorText] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * 0.2;
      cursorPos.current.y += dy * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cursor-arrow')) {
        setCursorType('arrow');
        if (cursorInnerRef.current) {
          gsap.to(cursorInnerRef.current, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
        }
      } else if (target.classList.contains('cursor-button')) {
        setCursorType('button');
        setCursorText(target.getAttribute('data-cursor-text') || '');
        if (cursorInnerRef.current) {
          gsap.to(cursorInnerRef.current, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cursor-arrow') || target.classList.contains('cursor-button')) {
        setCursorType('default');
        setCursorText('');
        if (cursorInnerRef.current) {
          gsap.to(cursorInnerRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        }
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]  hidden md:block"
      style={{ willChange: 'transform' }}
    >
      <div ref={cursorInnerRef} className="transition-transform">
        {/* {cursorType === 'default' && (
          <div className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200" />
        )} */}
        {cursorType === 'arrow' && (
          <div className="w-14 h-14 bg-teal-100 rounded-full -rotate-45 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {cursorType === 'button' && (
          <div className="bg-teal-200 flex items-center gap-1 text-black px-6 py-3 rounded-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm  shadow-lg transition-all duration-300">
            {cursorText}<MdArrowOutward className="mt-1" />
          </div>
        )}
      </div>
    </div>
  );
}
