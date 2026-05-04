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
  const speedRef = useRef(0.5);
  const positionRef = useRef(0);
  const animationIdRef = useRef<number>();

  // Heading reveal animation
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
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Speed up ticker on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Positive velocity = scrolling down (→ left), negative = scrolling up (→ right/reverse)
          const absVelocity = Math.abs(velocity);
          const targetSpeed = (1 + Math.min(absVelocity / 300, 3.5)) * Math.sign(velocity);
          gsap.to(speedRef, { current: targetSpeed, duration: 0.3, ease: 'power2.out' });
        },
        onLeave: () => gsap.to(speedRef, { current: 0.5, duration: 1.2, ease: 'power3.out' }),
        onLeaveBack: () => gsap.to(speedRef, { current: 0.1, duration: 0.5, ease: 'power3.out' }),
      });
    }, section);

    return () => ctx.revert();
  }, []);
  // Marquee animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const animate = () => {
      positionRef.current += speedRef.current;
      const half = scrollContainer.scrollWidth / 3; // we render 3× companies
      if (positionRef.current >= half) positionRef.current = 0;
      scrollContainer.style.transform = `translateX(-${positionRef.current}px)`;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationIdRef.current!);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 text-black overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-14">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Agency Behind
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">

        {/* LEFT fade: subtle blur → strong blur, masks the marquee behind heading area */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-48 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, white 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(0px)',
            // We layer a second pseudo-style via a wrapper below for progressive blur
          }}
        />
        {/* Progressive blur overlay — left */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-48 pointer-events-none "
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* RIGHT fade */}
        <div
          className="absolute inset-y-0 right-0 z-10 w-48 pointer-events-none "
          style={{
            background: 'linear-gradient(to left, white 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-48 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to left, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 30%, transparent 100%)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* Scrolling strip */}
        <div
          ref={scrollRef}
          className="flex gap-16 md:gap-20 whitespace-nowrap py-4 will-change-transform"
        >
          {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
            <div
              key={index}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold opacity-15 hover:opacity-60 transition-opacity duration-300 cursor-pointer select-none"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}