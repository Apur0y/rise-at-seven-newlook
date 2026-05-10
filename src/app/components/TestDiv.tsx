import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "E-commerce Revolution" },
  { title: "SaaS Growth Strategy" },
  { title: "Brand Transformation" },
  { title: "Content Marketing Win" },
];

export default function TitleScroll() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titles = gsap.utils.toArray<HTMLElement>(".title");

      gsap.set(titles, {
        y: (i) => i * 120,
        opacity: (i) => (i === 0 ? 1 : 0.2),
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const index = Math.round(
            self.progress * (titles.length - 1)
          );

          titles.forEach((title, i) => {
            gsap.to(title, {
              y: (i - index) * 120,
              opacity: i === index ? 1 : 0.2,
              scale: i === index ? 1.1 : 0.95,
              duration: 0.3,
            });
          });
        },
      });
    },
    { scope: container }
  );

  return (
    <div className="bg-black text-white">
      <div className="h-screen flex items-center justify-center text-4xl">
        Scroll Down
      </div>

      {/* PINNED TITLE SECTION */}
      <div
        ref={container}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <h1>Good</h1>
        <div className="relative h-[200px] w-full flex items-center justify-center">
          {projects.map((project, i) => (
            <div
              key={i}
              className="title absolute text-4xl font-bold transition-all"
            >
              {project.title}
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-center text-4xl">
        End
      </div>
    </div>
  );
}