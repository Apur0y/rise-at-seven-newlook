import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "E-commerce Revolution",
    description: "Increased organic traffic by 450%",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    color: "#C4FF00",
  },
  {
    title: "SaaS Growth Strategy",
    description: "10x revenue in 12 months",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color: "#C4FF00",
  },
  {
    title: "Brand Transformation",
    description: "From zero to market leader",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    color: "#C4FF00",
  },
  {
    title: "Content Marketing Win",
    description: "2M+ impressions monthly",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    color: "#C4FF00",
  },
];

const ITEM_HEIGHT = 110;

export default function TheFeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const N = PROJECTS.length;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Initial state
    gsap.set(track, { y: 0 });
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.set(item, {
        opacity: i === 0 ? 1 : Math.max(0.08, 1 - i * 0.55),
        scale: i === 0 ? 1 : Math.max(0.78, 1 - i * 0.1),
      });
    });
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
    });

    let lastSnapped = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: ".featured-work-content",
        onUpdate(self) {
          const raw = self.progress * (N - 1);
          const snapped = Math.round(raw);

          // Slide track
          gsap.to(track, {
            y: -(raw * ITEM_HEIGHT),
            duration: 0.08,
            ease: "none",
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
              ease: "none",
              overwrite: true,
            });
          });

          // Crossfade images + update zIndex on snap change
          if (snapped !== lastSnapped) {
            lastSnapped = snapped;
            setActiveIndex(snapped);

            imagesRef.current.forEach((img, i) => {
              if (!img) return;
              if (i === snapped) {
                // Bring active to top BEFORE fading in so it's hoverable immediately
                gsap.set(img, { zIndex: 10, pointerEvents: "auto" });
                gsap.to(img, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
              } else {
                gsap.to(img, {
                  opacity: 0,
                  scale: 1.04,
                  duration: 0.6,
                  ease: "power2.out",
                  onComplete: () => {
                    // Drop below and disable pointer events once hidden
                    gsap.set(img, { zIndex: 0, pointerEvents: "none" });
                  },
                });
              }
            });
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [N]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white mx-6  rounded-3xl"
      style={{ minHeight: "400vh" }}
      id="featured"
    >
      <div  className="sticky top-0 h-screen featured-work-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-16 h-full items-center justify-center ">

            {/* LEFT: title carousel */}
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-base md:text-xl font-bold ">
                Featured Work
              </h2>

              <div
                className="relative overflow-hidden"
                style={{ height: `${ITEM_HEIGHT * 5}px` }}
              >
                {/* Active row indicator */}
                <div
                  className="absolute inset-x-0 z-10 pointer-events-none border-t border-b border-white/10"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: `${ITEM_HEIGHT}px`,
                  }}
                />

                {/* Scrolling track */}
                <div
                  ref={trackRef}
                  className="absolute w-full"
                  style={{ top: `${ITEM_HEIGHT * 2}px`, willChange: "transform" }}
                >
                  {PROJECTS.map((project, i) => (
                    <div
                      key={i}
                      ref={(el) => {itemRefs.current[i] = el;}}
                      className="flex flex-col justify-center pr-8"
                      style={{
                        height: `${ITEM_HEIGHT}px`,
                        transformOrigin: "left center",
                        willChange: "transform, opacity",
                      }}
                    >
                      <h3 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-base text-white/50">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Fade masks */}
                <div
                  className="absolute inset-x-0 top-0 z-20 pointer-events-none"
                  style={{
                    height: `${ITEM_HEIGHT * 2}px`,
                    background: "linear-gradient(to bottom, black, transparent)",
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
                  style={{
                    height: `${ITEM_HEIGHT * 2}px`,
                    // background: "linear-gradient(to top, black, transparent)",
                  }}
                />
              </div>
            </div>

            {/* RIGHT: image panel */}
            <div className="relative h-[500px] lg:h-[500px]">
              {PROJECTS.map((project, i) => (
                <div
                  key={i}
                  ref={(el) => {imagesRef.current[i] = el;}}
                  className="group absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    zIndex: i === 0 ? 10 : 0,
                    // Only active is hoverable from the start
                    pointerEvents: i === 0 ? "auto" : "none",
                    willChange: "opacity, transform",
                  }}
                >
                  {/* Image with zoom on hover */}
                  <div
                    className="absolute inset-0  bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image}?w=900&q=60)` }}
                  />

                  {/* Ripple fill on hover */}
                  <div
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
                               w-8 h-8 rounded-full scale-0 group-hover:scale-[45]
                               transition-transform duration-200 ease-out"
                    style={{ backgroundColor: "#03fcca" }}
                  />

                 
                  {/* Text content */}
                  <div className="relative hidden  z-10 h-full hover:flex flex-col justify-end p-8 text-white">
                    <h2 className="text-4xl font-bold">{project.title}</h2>
                    <p className="mt-2 text-white/70">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}