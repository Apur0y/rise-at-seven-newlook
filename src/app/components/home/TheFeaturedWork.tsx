import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: 'E-commerce Revolution', description: 'Increased organic traffic by 450%', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
  { title: 'SaaS Growth Strategy', description: '10x revenue in 12 months', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
  { title: 'Brand Transformation', description: 'From zero to market leader', image: 'https://images.unsplash.com/photo-1557838923-2985c318be48' },
  { title: 'Content Marketing Win', description: '2M+ impressions monthly', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0' },
];

const ITEM_HEIGHT = 110;

export default function TitleCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const N = PROJECTS.length;
  const SCROLL_PER_ITEM = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Set initial styles
    gsap.set(track, { y: 0 });
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.set(item, {
        opacity: i === 0 ? 1 : Math.max(0.08, 1 - i * 0.55),
        scale: i === 0 ? 1 : Math.max(0.78, 1 - i * 0.1),
      });
    });
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.04,
        zIndex: i === 0 ? 1 : 0,
      });
    });

    let lastSnapped = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate(self) {
          const raw = self.progress * (N - 1);
          const snapped = Math.round(raw);

          // Slide track
          gsap.to(track, {
            y: -(raw * ITEM_HEIGHT),
            duration: 0.08,
            ease: 'none',
            overwrite: true,
          });

          // Per-title opacity + scale
          itemRefs.current.forEach((item, i) => {
            if (!item) return;
            const dist = Math.abs(raw - i);
            gsap.to(item, {
              opacity: Math.max(0.08, 1 - dist * 0.55),
              scale: Math.max(0.78, 1 - dist * 0.1),
              duration: 0.08,
              ease: 'none',
              overwrite: true,
            });
          });

          // Crossfade images only on snap change
          if (snapped !== lastSnapped) {
            lastSnapped = snapped;
            setActiveIndex(snapped);

            imageRefs.current.forEach((img, i) => {
              if (!img) return;
              if (i === snapped) {
                gsap.set(img, { zIndex: 2 });
                gsap.to(img, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
              } else {
                gsap.to(img, {
                  opacity: 0,
                  scale: 1.04,
                  duration: 0.6,
                  ease: 'power2.out',
                  onComplete: () => gsap.set(img, { zIndex: 0 }),
                });
              }
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [N]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${SCROLL_PER_ITEM * (N - 1)}px)` }}
      className="bg-black"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-black">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 gap-16 items-center">

          {/* ── LEFT: title carousel ── */}
          <div
            className="relative"
            style={{ height: `${ITEM_HEIGHT * 5}px`, overflow: 'hidden' }}
          >
            {/* Active row lines */}
            <div
              className="absolute inset-x-0 z-10 pointer-events-none border-t border-b border-white/10"
              style={{ top: '50%', transform: 'translateY(-50%)', height: `${ITEM_HEIGHT}px` }}
            />

            {/* Scrolling track — item[0] starts centered */}
            <div
              ref={trackRef}
              className="absolute w-full"
              style={{ top: `${ITEM_HEIGHT * 2}px`, willChange: 'transform' }}
            >
              {PROJECTS.map((project, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="flex flex-col justify-center pr-8"
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                    transformOrigin: 'left center',
                    willChange: 'transform, opacity',
                  }}
                >
                  <h3 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-base text-white/50">{project.description}</p>
                </div>
              ))}
            </div>

            {/* Fade masks */}
            <div
              className="absolute inset-x-0 top-0 z-20 pointer-events-none"
              style={{
                height: `${ITEM_HEIGHT * 2}px`,
                background: 'linear-gradient(to bottom, black, transparent)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
              style={{
                height: `${ITEM_HEIGHT * 2}px`,
                background: 'linear-gradient(to top, black, transparent)',
              }}
            />
          </div>

          {/* ── RIGHT: image panel ── */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                ref={(el) => (imageRefs.current[i] = el)}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${project.image}?w=900&q=80)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'scale(1)' : 'scale(1.04)',
                  zIndex: i === 0 ? 1 : 0,
                  willChange: 'opacity, transform',
                }}
              />
            ))}

            {/* Image caption overlay */}
            <div className="absolute bottom-0 inset-x-0 z-10 p-6"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p className="text-white font-semibold text-lg">
                {PROJECTS[activeIndex].title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {PROJECTS[activeIndex].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}