import { useEffect, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";

const CARDS = [
  {
    year: "2023",
    tag: "Chapter 03",
    title: "Pioneers",
    desc: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    desc2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    class: "rotate-2",
    bg: "bg-black text-white",
    image: "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847630&s=fca4e779651c6bbd2dbe236d21673786",
  },
  {
    year: "2021",
    title: "Award Winning",
    desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    bg: "bg-teal-200 text-black",
    class: "rotate-1",
    image: "https://rise-atseven.transforms.svdcdn.com/production/images/d4df0d30-d590-4e94-9056-9491f4beacba.JPG?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847714&s=b1befabf8bc726903f9a84284e5ff609",
  },
  {
    year: "2019",
    tag: "Chapter 01",
    title: "Speed",
    desc: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms.",
    bg: "bg-white text-black",
    class: "-rotate-1",
    image: "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=1600&h=1600&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=d00aadc5240b895dd5d4b08f7e61eb59",
  },
];

const COPIES = 5;
const CARD_WIDTH = 85; // percent
const TOTAL = CARDS.length;

export default function MobileLegacyIn() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [realIndex, setRealIndex] = useState(TOTAL); // start at 2nd copy
  const activeIndex = realIndex % TOTAL;
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isNearEdge = realIndex <= TOTAL / 2 || realIndex >= TOTAL * (COPIES - 1.5);

    if (isNearEdge) {
      track.style.transition = "none";
      const normalized = ((realIndex % TOTAL) + TOTAL) % TOTAL;
      const resetTo = TOTAL + normalized;
      track.style.transform = `translateX(-${resetTo * CARD_WIDTH}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = "transform 500ms ease-in-out";
        });
      });
      return;
    }

    track.style.transform = `translateX(-${realIndex * CARD_WIDTH}%)`;
  }, [realIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setRealIndex((prev) => prev + (diff > 0 ? 1 : -1));
    }
  };

  return (
    <section className="py-16 lg:hidden">
      <h2 className="text-xl text-center text-black font-semibold mb-8 px-6">
        Legacy In The Making
      </h2>

      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex items-stretch" 
          style={{
            transition: "transform 500ms ease-in-out",
            willChange: "transform",
            transform: `translateX(-${TOTAL * CARD_WIDTH}%)`,
          }}
        >
          {[...Array(COPIES)].flatMap((_, copyIndex) =>
            CARDS.map((card, cardIndex) => (
              <div
                key={`${copyIndex}-${cardIndex}`}
                className="flex-shrink-0 px-3 "
                style={{ width: `${CARD_WIDTH}%` }}
              >
                <div
                  className={`${card.bg}  h-full rounded-2xl p-6 shadow-2xl flex flex-col items-center`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="rounded-xl w-full h-72 object-cover"
                  />
                  {card.tag && (
                    <span className="mt-4 text-xs uppercase tracking-widest opacity-60">
                   
                    </span>
                  )}
                  <h2 className="text-3xl font-black mt-2">{card.title}</h2>
                  <p className="leading-relaxed text-center py-4 text-sm">{card.desc}</p>
                  {card.desc2 && (
                    <p className="leading-relaxed text-center text-sm">{card.desc2}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 mx-6 h-[2px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
        />
      </div>
    </section>
  );
}