import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '../AnimatedButton';

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
    <section ref={sectionRef} className="  mx-4 py-12 xl:py-24">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-24 justify-between">
          <div ref={textRef} className="space-y-6 opacity-0">
            <p className="text-lg md:text-xl lg:text font-medium max-w-xl">
              A global team of search-first content marketers <br /> engineering semantic relevancy & category <br /> signals for both the internet and people
            </p>
           
          </div>

          <div ref={headingRef} className="space-y-8 opacity-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium">
             Driving Demand &
              <br />
              <span >
                Discovery
              </span>
            </h2>

            <AnimatedButton variant="solid" >Our Story</AnimatedButton>
            <AnimatedButton >Our Services</AnimatedButton>

          </div>
        </div>
      </div>
    </section>
  );
}
