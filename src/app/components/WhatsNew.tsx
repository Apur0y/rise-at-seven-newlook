import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NEWS_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    title: 'The Future of SEO in 2026',
    category: 'SEO',
    date: 'May 1, 2026',
    description: 'Discover the latest trends and strategies that are shaping the future of search engine optimization.'
  },
  {
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293',
    title: 'Content Marketing Best Practices',
    category: 'Content',
    date: 'April 28, 2026',
    description: 'Learn how to create compelling content that drives engagement and converts visitors into customers.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
    title: 'Digital PR Success Stories',
    category: 'PR',
    date: 'April 25, 2026',
    description: 'Real-world examples of how digital PR campaigns generated massive brand awareness and backlinks.'
  }
];

export default function WhatsNew() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">What's New</h2>
          <button className="px-8 py-4 bg-black text-white rounded-full font-medium overflow-hidden relative group transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative z-10 block transition-transform duration-200 ease-out group-hover:-translate-y-full">
              Explore More Thoughts
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0">
              Explore More Thoughts
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group cursor-pointer opacity-0"
            >
              <div
                className="cursor-arrow relative h-64 md:h-72 mb-6 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="uppercase tracking-wide">{item.category}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-gray-700 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
