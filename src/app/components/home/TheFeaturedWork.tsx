import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

// const PROJECTS = [
//   {
//     title: "E-commerce Revolution",
//     description: "Increased organic traffic by 450%",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
//     color: "#00D1FF", // cyan blue
//     timeline: "[2023 - 2025]",
//   },
//   {
//     title: "SaaS Growth Strategy",
//     description: "10x revenue in 12 months",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
//     color: "#A78BFA", // soft purple
//     timeline: "[2023 - 2025]",
//   },
//   {
//     title: "Brand Transformation",
//     description: "From zero to market leader",
//     image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
//     color: "#FB7185", // soft pink/red
//     timeline: "2025",
//   },
//   {
//     title: "Content Marketing Win",
//     description: "2M+ impressions monthly",
//     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
//     color: "#34D399", // emerald green
//     timeline: "[2023 - 2025]",
//   },
// ];
const PROJECTS = [
  {
    title: "E-commerce Revolution",
    description: "Increased organic traffic by 450%",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    color: "#C4FF00",
    timeline: "2024",
  },
  {
    title: "SaaS Growth Strategy",
    description: "10x revenue in 12 months",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color: "#C4FF00",
    timeline: "[2023 - 2025]",
  },
  {
    title: "Brand Transformation",
    description: "From zero to market leader",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    color: "#C4FF00",
    timeline: "2023",
  },
  {
    title: "Content Marketing Win",
    description: "2M+ impressions monthly",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    color: "#C4FF00",
    timeline: "2024",
  },
  {
    title: "Startup Launch Success",
    description: "Reached 100K users in 30 days",
    image: "https://images.unsplash.com/photo-1556761175-129418cb2dfe",
    color: "#C4FF00",
    timeline: "[2023 - 2025]",
  },
  {
    title: "UI/UX Overhaul",
    description: "Improved conversion rate by 80%",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    color: "#C4FF00",
    timeline: "[2023 - 2025]",
  },
  {
    title: "SEO Domination",
    description: "Ranked #1 on competitive keywords",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1",
    color: "#C4FF00",
    timeline: "2024",
  },
  {
    title: "Social Media Growth",
    description: "1M+ followers in under a year",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    color: "#C4FF00",
    timeline: "[2023 - 2025]",
  },
  {
    title: "Product Launch Impact",
    description: "Sold out within 48 hours",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    color: "#C4FF00",
    timeline: "2023",
  },
];

const ITEM_HEIGHT = 110;

export default function TheFeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const N = PROJECTS.length;

  const moveDistanceRef = useRef(getMoveDistance());

  function getMoveDistance() {
    const w = window.innerWidth;
    if (w < 420) return 250;
    if (w < 800) return 400;
    if (w < 1000) return 700;
    return 500;
  }

  useEffect(() => {
    const handleResize = () => {
      moveDistanceRef.current = getMoveDistance();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const images = gsap.utils.toArray<HTMLElement>(".image");
    gsap.set(images, {
      y: (i) => i * 800,
    });

    // Initial state
    gsap.set(track, { y: 0 });

    let lastSnapped = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: ".featured-work-content",
        scrub: true,
        onUpdate(self) {
          const raw = self.progress * (N - 1);
          const snapped = Math.round(raw);
          const progress = self.progress;
          const rawIndex = progress * (images.length - 1);
          const index = Math.round(self.progress * (images.length - 1));

          images.forEach((title, i) => {
            gsap.to(title, {
              y: (i - rawIndex) * moveDistanceRef.current,
              duration: 0.3,
            });
          });
          // Slide track
          gsap.to(track, {
            y: -(raw * ITEM_HEIGHT),
            duration: 0,
            ease: "none",
            overwrite: true,
          });

          // Crossfade images + update zIndex on snap change
          if (snapped !== lastSnapped) {
            lastSnapped = snapped;
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [N]);
  console.log("Here in active", activeIndex);

  return (
    <div>
      <section
        ref={containerRef}
        className="relative  text-white mx-6  rounded-3xl"
        style={{ minHeight: "400vh" }}
        id="featured"
      >
        <div className="sticky top-7 bottom-7 h-[92vh]  overflow-hidden featured-work-content bg-neutral-950 rounded-3xl ">
          <div className=" px-6 lg:px-12 h-full ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full items-center justify-center ">
              {/* LEFT: title carousel */}
              <div className="hidden lg:flex flex-col justify-center h-full">
                <h2 className="text-base md:text-xl font-bold ">
                  Featured Work
                </h2>

                <div
                  className=" relative overflow-hidden"
                  style={{ height: `${ITEM_HEIGHT * 5}px` }}
                >
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
                        className="flex   pr-8 pl-9 cursor-pointer justify-between"
                        style={{
                          height: "auto",
                          transformOrigin: "left center",
                          willChange: "transform, opacity",
                        }}
                        // onMouseEnter={() => setActiveIndex(i)}
                        onMouseOver={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(-1)}
                      >
                        <h3
                          style={{
                            transform: `translateX(${activeIndex === i ? 0 : -10}px)`,
                          }}
                          className="text-4xl lg:text-6xl font-extrabold text-white leading-tight text-wrap transition-transform duration-300 ease-out"
                        >
                          {project.title}
                        </h3>
                        <h3 className="text-lg text-white/70">
                          {project.timeline}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Fade masks */}
                  <div className="absolute inset-x-0 top-0 z-20 pointer-events-none h-[220px] bg-gradient-to-b from-neutral-950 via-neutral-950 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-[220px] bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent" />
                </div>
              </div>

              {/* RIGHT: image panel */}
              <div className="relative  lg:h-[400px]">
                {PROJECTS.map((project, i) => (
                  <div
                    key={i}
                    className="group image absolute w-full rounded-2xl overflow-hidden cursor-arrow "
                  >
                    {/* Image with zoom on hover */}
                    <img src={project.image} alt={project.title} />
                    <p className="text-2xl md:text-4xl font-bold absolute top-5 left-5 z-20 text-black  transition-all duration-500  opacity-0  group-hover:opacity-100">
                      {project.description}
                    </p>
                    <p
                      className={` text-2xl md:text-4xl font-bold absolute top-5 left-5 z-20 text-black transition-all duration-500 ease-out ${activeIndex === i ? "opacity-100 " : "opacity-0 "}`}
                    >
                      {project.description}
                    </p>{" "}
                    <div
                      style={{
                        backgroundColor: project.color,
                        transform: `translate(-50%, 50%) scale(${activeIndex !== i ? 0 : 45})`,
                      }}
                      className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
                                 w-8 h-8 rounded-full 
                                 transition-transform duration-400 ease-out"
                    />
                    <div
                      className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
                                 w-8 h-8 rounded-full scale-0 group-hover:scale-[45]
                                 transition-transform duration-400 ease-out"
                      style={{ backgroundColor: project.color }}
                    />
                    {/* Text content */}
                    <div className="relative hidden  z-10 h-full hover:flex flex-col justify-end p-8 text-white">
                      <h2 className="text-4xl font-bold">{project.title}</h2>
                      <p className="mt-2 text-white/70">
                        {project.description}
                      </p>
                    </div>
                    {/* Mobile Section */}
                    <div className="absolute bottom-5 left-4 group-hover:hidden">
                      <p className="mt-2 text-white/70">{project.timeline}</p>
                      <h2 className=" text-2xl lg:text-4xl font-bold">{project.title}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center w-full">
        <AnimatedButton variant="solid">Explore Our Work</AnimatedButton>
      </div>
    </div>
  );
}
