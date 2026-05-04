import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  'SEO Strategy',
  'Content Marketing',
  'Digital PR',
  'Paid Search',
  'Social Media',
  'Email Marketing'
];

export default function OurServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      servicesRef.current.forEach((service, index) => {
        gsap.fromTo(
          service,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: service,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">Our Services</h2>
          <button className="px-8 py-4 bg-black text-white rounded-full font-medium overflow-hidden relative group transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative z-10 block transition-transform duration-200 ease-out group-hover:-translate-y-full">
              View all services
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0">
              View all services
            </span>
          </button>
        </div>

        <div className="space-y-4">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              ref={(el) => (servicesRef.current[index] = el)}
              className="relative group cursor-pointer py-6 md:py-8 px-6 md:px-8 rounded-2xl transition-all duration-300 opacity-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: hoveredIndex === index ? '#000' : 'transparent',
                transform: hoveredIndex === index ? 'translateX(20px)' : 'translateX(0)'
              }}
            >
              <h3
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold transition-all duration-300"
                style={{
                  color: hoveredIndex === index ? '#fff' : '#000'
                }}
              >
                {service}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
