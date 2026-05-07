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
  const [activeRaw, setActiveRaw] = useState(0); // continuous float, not snapped

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
          const raw = self.progress * (PROJECTS.length - 1); // e.g. 0..3 continuously
          const activeIndex = Math.round(raw);
          setActiveRaw(raw);

          // Images: crossfade based on snapped index
          imagesRef.current.forEach((img, i) => {
            if (img) {
              gsap.to(img, {
                opacity: i === activeIndex ? 1 : 0,
                scale: i === activeIndex ? 1 : 0.95,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });

          // Titles: continuous distance-based opacity + position
          titlesRef.current.forEach((title, i) => {
            if (!title) return;
            const dist = Math.abs(raw - i);
            const opacity = Math.max(0.12, 1 - dist * 0.65);
            const yOffset = (i - raw) * 6; // subtle push effect
            const scale = Math.max(0.85, 1 - dist * 0.07);

            gsap.to(title, {
              opacity,
              y: yOffset,
              scale,
              duration: 0.1, // very short — follows scroll continuously
              ease: 'none'
            });
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white mx-6 rounded-3xl"
      style={{ minHeight: '400vh' }}
    >
      <div className="sticky top-0 h-screen featured-work-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-16 h-full items-center py-20">

            {/* Left: Title carousel */}
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Featured Work</h2>

              {/* Fixed-height carousel window — only ~1.5 items visible */}
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                <div className="absolute inset-0 flex flex-col justify-center">
                  {PROJECTS.map((project, index) => (
                    <div
                      key={index}
                      ref={(el) => (titlesRef.current[index] = el)}
                      className="space-y-2 py-4"
                      style={{
                        opacity: index === 0 ? 1 : 0.15,
                        transformOrigin: 'left center',
                        willChange: 'transform, opacity'
                      }}
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xl text-gray-400">{project.description}</p>
                    </div>
                  ))}
                </div>

                {/* Top/bottom fade masks */}
                <div
                  className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to bottom, black, transparent)' }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to top, black, transparent)' }}
                />
              </div>
            </div>

            {/* Right: Images */}
            <div className="relative h-[500px] lg:h-[600px]">
              {PROJECTS.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="absolute inset-0 rounded-2xl shadow-2xl"
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