import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Started with a mission to change digital marketing',
    color: '#FF6B6B'
  },
  {
    year: '2021',
    title: 'Award Winning',
    description: 'Recognized as UK\'s best SEO agency',
    color: '#4ECDC4'
  },
  {
    year: '2023',
    title: 'Global Expansion',
    description: 'Offices across 4 continents',
    color: '#FFE66D'
  }
];

export default function LegacyInMaking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: '.legacy-content'
        }
      });

      cardsRef.current.forEach((card, index) => {
        const initialRotation = -8 + index * 4;
        const initialY = index * 20;

        gsap.set(card, {
          rotation: initialRotation,
          y: initialY,
          zIndex: CARDS.length - index
        });

        timeline.to(
          card,
          {
            rotation: 0,
            y: -index * 140,
            scale: 1 - index * 0.05,
            duration: 1,
            ease: 'power2.inOut'
          },
          index * 0.3
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24"
      style={{ minHeight: '350vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center legacy-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 text-center">
            Legacy In the Making
          </h2>

          <div className="relative h-[550px] flex items-center justify-center">
            {CARDS.map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute w-full max-w-2xl p-10 md:p-12 lg:p-16 rounded-3xl shadow-2xl"
                style={{
                  backgroundColor: card.color,
                  transformOrigin: 'center center'
                }}
              >
                <div className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 opacity-20">
                  {card.year}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                  {card.title}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
