import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../AnimatedButton";
import { MdTimer } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const NEWS_ITEMS = [
  {
    image: "https://images.pexels.com/photos/7803659/pexels-photo-7803659.jpeg",
    title: "The Future of SEO in 2026",
    category: "Ray Siddiq",
    date: "5 mins",
    description:
      "Discover the latest trends and strategies that are shaping the future of search engine optimization.",
  },
  {
    image: "https://images.pexels.com/photos/3758052/pexels-photo-3758052.jpeg",
    title: "Content Marketing Best Practices",
    category: "Ray Siddiq",
    date: "2 mins",
    description:
      "Learn how to create compelling content that drives engagement and converts visitors into customers.",
  },
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    title: "Digital PR Success Stories",
    category: "Carrie Rose",
    date: "3 mins",
    description:
      "Real-world examples of how digital PR campaigns generated massive brand awareness and backlinks.",
  },
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
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 ">
      <div className="px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 md:mb-16 gap-6 border-b pb-4">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold flex gap-3 flex-wrap">
            <span>What's</span>
            <img
              src={
                "https://images.pexels.com/photos/3522692/pexels-photo-3522692.jpeg"
              }
              alt="Images"
              className="inline-block w-16 h-16 md:w-24 md:h-24  bg-cover bg-center rounded-2xl  shadow-2xl object-center object-cover"
            />
            <span>New</span>
          </h2>
          <div className="hidden md:flex">
            <AnimatedButton variant="solid">
              Explore More Thoughts
            </AnimatedButton>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, index) => (
            <div
              key={index}
              // ref={(el) => (cardsRef.current[index] = el)}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group  opacity-0 cursor-arrow "
            >
              <div
                className="relative h-64 md:h-72 mb-6 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute bottom-10 left-1/2  rounded-full -translate-x-1/2 translate-y-1/2 scale-50 group-hover:scale-200 w-96 group-hover:h-96 duration-700 transition-all bg-white/10 backdrop-blur-sm"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="uppercase tracking-wide bg-white px-3 py-1 rounded-2xl">
                    {item.category}
                  </span>

                  <span className="bg-white px-3 py-1 rounded-2xl flex items-center gap-1">
                    <MdTimer />
                    {item.date}
                  </span>
                </div>

                <p className="text-black text-base md:text-2xl font-semibold ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
