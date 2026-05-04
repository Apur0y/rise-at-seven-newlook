import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToRise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textContainerRef.current,
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'center center',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        }
      );

      wordsRef.current.forEach((word, index) => {
        gsap.fromTo(
          word,
          {
            x: -150,
            y: -200,
            opacity: 0,
            rotation: -20,
            scale: 0.5
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            ease: 'bounce.out',
            scrollTrigger: {
              trigger: container,
              start: 'top center',
              end: 'center center',
              scrub: 1,
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.15
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const text = 'READY TO RISE?';
  const words = text.split(' ');

  return (
    <section ref={containerRef} className="py-32 md:py-40 bg-black text-white overflow-hidden min-h-screen flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div ref={textContainerRef} className="text-center opacity-0">
          <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-none">
            {words.map((word, index) => (
              <span
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className="inline-block mx-3 md:mx-6 opacity-0"
                style={{ transformOrigin: 'center center' }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
