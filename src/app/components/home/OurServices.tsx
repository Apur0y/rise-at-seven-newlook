import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import AnimatedButton from "../AnimatedButton";

const SERVICES = [
  "SEO Strategy",
  "Content Marketing",
  "Digital PR",
  "Paid Search",
  "Social Media",
  "Email Marketing",
];

const backgroundImages = [
  "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
];

export default function OurServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="px-2 lg:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 md:mb-16 gap-6 border-b pb-4">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold flex gap-3 flex-wrap">
            <span>Our</span>
            <img
              src={backgroundImages[0]}
              alt="Images"
              className="inline-block w-16 h-16 md:w-24 md:h-24  bg-cover bg-center rounded-2xl  shadow-2xl object-center object-cover"
            />
            <span>Services</span>
          </h2>
          <div className="hidden md:flex">
            <AnimatedButton variant="solid">View all services</AnimatedButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer py-3 md:py-5 px-6 md:px-8 rounded-4xl  overflow-hidden border-b"
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 transition-all duration-200 ease-out hidden md:flex ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
                  }`}
                >
                  <img
                    src={backgroundImages[index]}
                    alt={service}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 overflow-hidden">
                  <div
                    className={`flex items-center gap-3 text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold transition-all duration-200 ease-out   ${
                      isHovered
                        ? "text-white translate-x-8"
                        : "text-black translate-x-0"
                    }`}
                  >
                    <img
                    src={backgroundImages[index]}
                    alt={service}
                    className="w-10 h-10 object-cover md:hidden rounded"
                  />

                    <MdArrowOutward
                      className={`transition-all duration-300 ease-out size-12 hidden md:flex ${
                        isHovered
                          ? "opacity-100 translate-x-0 translate-y-0 rotate-0"
                          : "opacity-0 -translate-x-6 translate-y-4 -rotate-45"
                      }`}
                    />

                    <span>{service}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
         <div className="w-full flex justify-center items-center md:hidden mt-5">
            <AnimatedButton variant="solid" >View all services</AnimatedButton>
          </div>
      </div>
      
    </section>
  );
}
