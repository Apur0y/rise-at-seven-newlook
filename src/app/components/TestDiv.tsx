import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
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

export default function ActiveCenterCards() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".card");
    const titles = gsap.utils.toArray<HTMLElement>(".title");

    const state = { activeIndex: 0 };

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
      markers: true,

      onUpdate: (self) => {
        const progress = self.progress;

        const index = Math.round(
          progress * (cards.length - 1)
        );

        if (index !== state.activeIndex) {
          state.activeIndex = index;

          // 🎯 Update cards
          cards.forEach((card, i) => {
            const distance = i - index;

            gsap.to(card, {
              y: distance * 120,
              scale: i === index ? 1 : 0.85,
              opacity: i === index ? 1 : 0.3,
              zIndex: i === index ? 10 : 1,
              duration: 0.4,
            });
          });

          // 🎯 Update titles
          titles.forEach((title, i) => {
                        const distance = i - index;

            gsap.to(title, {
              opacity: i === index ? 1 : 0.2,
              x: i === index ? 0 : -0,
              duration: 0.4,
              y:distance * 200,
            });
          });
        }
      },
    });
  }, { scope: container });

  return (
    <div className="bg-black text-white">

      {/* Spacer */}
      <div className="h-screen flex items-center justify-center text-5xl">
        Scroll Down
      </div>

      {/* Pinned Section */}
      <div
        ref={container}
        className="h-screen flex items-start justify-between px-20"
      >
       {/* <h1 className="absolute top-0">as;lkda;l</h1> */}

        {/* LEFT → TITLES */}
        <div >
          {projects.map((project, i) => (
            <div
              key={i}
              className="title absolute
                top-1/2
               
                
                -translate-y-1/2 text-4xl font-bold opacity-20"
            >
              {project.title}
            </div>
          ))}
        </div>

        {/* RIGHT → CARDS */}
        <div className="relative w-[400px] h-[400px]">
          {projects.map((project, i) => (
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
               <div
                    className=" bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image}?w=900&q=60)` }}
                  />
                  <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <div className="h-screen flex items-center justify-center text-5xl">
        End
      </div>
    </div>
  );
}