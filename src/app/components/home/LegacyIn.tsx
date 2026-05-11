import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
 
  {
    year: "2023",
    tag: "Chapter 03",
    title: "Pioneers",
    desc: "We’re dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it. ",
    desc2:
      "We’re on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    class: "rotate-6",
    bg: "bg-black text-white",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847630&s=fca4e779651c6bbd2dbe236d21673786",
  },
  {
    year: "2021",
    title: "Award Winning",
    desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    bg: "bg-teal-200",
    class: "rotate-9 text-black",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/d4df0d30-d590-4e94-9056-9491f4beacba.JPG?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847714&s=b1befabf8bc726903f9a84284e5ff609",
  },
   {
    year: "2019",
    tag: "Chapter 01",
    title: "Speed",
    desc: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We’ve created a service which takes ideas to result within 60 minutes.",
    bg: "bg-white",
    class: "rotate-12 text-black",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=d00aadc5240b895dd5d4b08f7e61eb59",
  },
  
];

export default function LegacyIn() {
  const container = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".card");

    gsap.set(cards, {
      yPercent: 0,
      opacity: 1,
      rotationZ: (i) => i * 2,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${cards.length * 500}`,
        scrub: 0.8,
        pin: true,
      },
    });

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          yPercent: -400,
          rotationZ: -85,
          ease: "none",
          duration: 1,  // give each card a consistent duration
        },
        i * 0.3,  // ← this is the key change
      );
    });
  }, container);

  return () => ctx.revert();
}, []);

  return (
    <section>
  
      <div
        ref={container}
        className="relative h-screen  overflow-hidden"
      >
        <h1 className="text-xl absolute top-30 left-6 right-6  text-center text-black">
          Legacy In The Making
        </h1>

        <div className="relative w-full h-full flex items-center justify-center">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="card absolute w-[90%] max-w-lg"
              style={{ zIndex: CARDS.length - i }} // Stack: first card on top
            >
              <div
                className={`${card.bg} ${card.class} rounded-2xl p-10 shadow-2xl flex flex-col items-center`}
              >
                <img
                  src={card.image}
                  alt="card"
                  className="rounded-xl lg:w-48  4xl:w-56"
                />
                <h2 className="text-5xl font-black mt-4">{card.title}</h2>
                <p className=" leading-relaxed text-center py-5">{card.desc}</p>
                {card?.desc2 && (
                  <p className=" leading-relaxed text-center">{card.desc2}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
