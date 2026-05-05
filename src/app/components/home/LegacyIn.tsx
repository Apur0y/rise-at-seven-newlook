import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacyIn() {
  const CARDS = [
    {
      year: "2019",
      title: "Founded",
      description: "Started with a mission to change digital marketing",
      color: "#FF6B6B",
    },
    {
      year: "2021",
      title: "Award Winning",
      description: "Recognized as UK's best SEO agency",
      color: "#4ECDC4",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Offices across 4 continents",
      color: "#FFE66D",
    },
  ];

  // ✅ use array ref instead of single ref
  const cardRef = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     cardsRef.current.forEach((card) => {
//       if (!card) return;

//       gsap.fromTo(
//         card,
//         {
//           y: 80,
//           opacity: 0,
//         },
//         {
//           x: 300,
//           opacity: 1,
//           duration: 0.8,
//           rotate:300,
//           ease: "power3.out",
//           scrollTrigger: {
//               markers:true,
//             trigger: "#parent",
//             start: "top 0%",
//             end:"top -100%",
//             // toggleActions: "restart pause reverse none",
//             scrub: 1,
//             pin: true,
//           },
//         }
//       );
//     });
//   }, []);
 useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        y: 100,
       
      },
      {
        y: -400,
       
        duration: 1,
        rotate: 660,
        ease: "power3.out",
        scrollTrigger: {
        //   trigger: cardRef.current,
              markers:true,
            trigger: "#parent",
            start: "top top",
            pinSpacing:false,
            // end:"top -100%",
            // toggleActions: "restart pause reverse none",
            // scrub: 1,
            pin: true,
        },
      }
    );
  }, []);


  return (
    <div  className="py-28 flex flex-col items-center gap-12">
      {/* {CARDS.map((card, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className="p-6 rounded-lg shadow-lg max-w-md text-black"
          style={{ backgroundColor: card.color }}
        >
          <h3 className="text-2xl font-bold mb-2">
            {card.year} - {card.title}
          </h3>
          <p>{card.description}</p>
        </div>
      ))} */}
      {/* a normal card */}
        <div id="parent" ref={cardRef} className="bg-blue-500 p-6 rounded-lg shadow-lg max-w-md text-black">
            <h3 className="text-2xl font-bold mb-2">2019 - Founded</h3>
            <p>Started with a mission to change digital marketing</p>   
        </div>
    </div>
  );
}