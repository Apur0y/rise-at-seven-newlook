import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'E-commerce Revolution',
    description: 'Increased organic traffic by 450%',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    title: 'SaaS Growth Strategy',
    description: '10x revenue in 12 months',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    title: 'Brand Transformation',
    description: 'From zero to market leader',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48'
  },
  {
    title: 'Content Marketing Win',
    description: '2M+ impressions monthly',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
  }
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.featured-work-content',
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * PROJECTS.length),
            PROJECTS.length - 1
          );
          setActiveIndex(index);

          imagesRef.current.forEach((img, i) => {
            if (img) {
              gsap.to(img, {
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 0.95,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });

          titlesRef.current.forEach((title, i) => {
            if (title) {
              gsap.to(title, {
                opacity: i === index ? 1 : 0.3,
                x: i === index ? 0 : -20,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black text-white" style={{ minHeight: '400vh' }}>
      <div className="sticky top-0 h-screen featured-work-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-16 h-full items-center py-20">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Featured Work</h2>
              {PROJECTS.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (titlesRef.current[index] = el)}
                  className="space-y-2 transition-all duration-300 cursor-pointer"
                  style={{ opacity: index === 0 ? 1 : 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">{project.title}</h3>
                  <p className="text-xl text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>

            <div className="relative h-[500px] lg:h-[600px]">
              {PROJECTS.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="cursor-arrow absolute inset-0 rounded-2xl shadow-2xl"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: index === 0 ? 1 : 0,
                    transform: index === 0 ? 'scale(1)' : 'scale(0.95)',
                    zIndex: PROJECTS.length - index
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
