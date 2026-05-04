import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COMPANIES = [
  'Google', 'Meta', 'Amazon', 'Apple', 'Microsoft',
  'Netflix', 'Tesla', 'Spotify', 'Adobe', 'Salesforce',
  'Oracle', 'IBM', 'Intel', 'Cisco', 'Samsung'
];

export default function AgencyBehind() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.8;
      if (scrollContainer.scrollWidth && scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-black text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-bold opacity-0">
          Agency Behind
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div ref={scrollRef} className="flex gap-16 md:gap-20 whitespace-nowrap py-4">
          {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
            <div
              key={index}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold opacity-15 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
