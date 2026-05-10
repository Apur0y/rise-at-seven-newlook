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

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cards = gsap.utils.toArray<HTMLElement>(".card");

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

            cards.forEach((card, i) => {
              const distance = i - snapped;

              gsap.to(card, {
                y: distance * 120,
                scale: i === snapped ? 1 : 0.85,
                opacity: i === snapped ? 1 : 0.3,
                zIndex: i === snapped ? 10 : 1,
                duration: 0.4,
              });
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
    >
      <div className="sticky top-0 h-screen featured-work-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-16 h-full items-center justify-center ">
            {/* LEFT: title carousel */}
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-base md:text-xl font-bold ">Featured Work</h2>

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
                  style={{
                    top: `${ITEM_HEIGHT * 2}px`,
                    willChange: "transform",
                  }}
                >
                  {PROJECTS.map((project, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
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
                    background:
                      "linear-gradient(to bottom, black, transparent)",
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

            <div className="relative w-[400px] h-[400px]">
              {PROJECTS.map((project, i) => (
                <div
                  key={i}
                  className="
                card
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[350px]
                h-24
                bg-orange-500
                rounded-2xl
                flex
                items-center
                justify-center
                text-2xl
                font-bold
              "
                >
                  {/* <div
                    className=" bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image}?w=900&q=60)` }}
                  /> */}
                  Card {i + 1}
                </div>
              ))}
            </div>

            {/* RIGHT: image panel */}
          </div>
        </div>
      </div>
    </section>
  );
}
