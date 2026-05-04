import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div ref={textRef} className="space-y-6 opacity-0">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              We're a digital marketing agency that doesn't do boring.
              Since 2019, we've been helping brands dominate search results
              and drive actual business growth through strategic SEO and
              content marketing.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              No jargon. No fluff. Just results that matter.
            </p>
          </div>

          <div ref={headingRef} className="space-y-8 opacity-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              We're not your
              <br />
              <span className="italic bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                typical agency
              </span>
            </h2>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-black text-white rounded-full font-medium overflow-hidden relative group transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10 block transition-transform duration-200 ease-out group-hover:-translate-y-full">
                  Learn More
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0">
                  Learn More
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-black text-black rounded-full font-medium overflow-hidden relative group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-700">
                <span className="relative z-10 block transition-transform duration-200 ease-out group-hover:-translate-y-full">
                  Our Work
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0">
                  Our Work
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
