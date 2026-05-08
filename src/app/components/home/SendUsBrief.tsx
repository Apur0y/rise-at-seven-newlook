import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SendUsBrief() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  // smooth speed control
  const currentSpeedRef = useRef(1);
  const targetSpeedRef = useRef(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          // direction-aware
          const direction = velocity > 0 ? -1 : 1;

          // clamp + scale
          const speed = Math.min(Math.abs(velocity) / 2000, 5);

          targetSpeedRef.current = direction * (1 + speed);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const animate = () => {
      if (marqueeRef.current) {
        // smooth interpolation (lerp)
        currentSpeedRef.current +=
          (targetSpeedRef.current - currentSpeedRef.current) * 0.02;

        positionRef.current += currentSpeedRef.current;

        const width = marqueeRef.current.scrollWidth / 2;

        // seamless loop
        if (positionRef.current <= -width) positionRef.current = 0;
        if (positionRef.current >= 0) positionRef.current = -width;

        marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20 text-black overflow-hidden cursor-button"
      data-cursor-text="CO Send Us Your Brief"
    >
      <div className="whitespace-nowrap overflow-hidden">
        <div ref={marqueeRef} className="flex">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold px-8 md:px-12  transition-colors duration-300">
                     Co LET'S WORK TOGETHER
                    </span>
                    <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem]">
                      •
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}