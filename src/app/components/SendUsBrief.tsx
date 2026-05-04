import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SendUsBrief() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          setSpeed(1 + velocity / 2000);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const animate = () => {
      if (marqueeRef.current) {
        positionRef.current -= speed;
        if (Math.abs(positionRef.current) >= marqueeRef.current.scrollWidth / 2) {
          positionRef.current = 0;
        }
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
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-black text-white overflow-hidden cursor-button"
      data-cursor-text="Send Us Your Brief"
    >
      <div className="whitespace-nowrap">
        <div ref={marqueeRef} className="inline-flex">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="inline-flex items-center">
              <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold px-8 md:px-12 hover:text-gray-300 transition-colors duration-300">
                LET'S WORK TOGETHER
              </span>
              <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem]">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
