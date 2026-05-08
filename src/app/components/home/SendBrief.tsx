"use client";
import { useEffect, useRef } from "react";

export default function SendBrief() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const speedRef = useRef(1);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        const delta = Math.abs(window.scrollY - lastScrollY.current);
        speedRef.current = Math.min(1 + delta * 0.3, 12);
      }

      lastScrollY.current = window.scrollY;
    };

    const tick = () => {
      speedRef.current = Math.max(speedRef.current * 0.94, 1);

      xRef.current -= speedRef.current * 0.5;

      if (trackRef.current) {
        const half = trackRef.current.scrollWidth / 2;

        if (Math.abs(xRef.current) >= half) {
          xRef.current = 0;
        }

        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleEnter = () => {
    document.dispatchEvent(new CustomEvent("cursor:sendbriefenter"));
  };

  const handleLeave = () => {
    document.dispatchEvent(new CustomEvent("cursor:default"));
  };

  return (
    <section
      ref={sectionRef}
      id="brief"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="overflow-hidden py-5 cursor-none"
        data-cursor-text="Send Us Your Brief"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-10 pr-16 whitespace-nowrap"
          >
            <span
              className="text-[200px] font-black leading-none  "
              style={{
                fontStretch: "115%",
                fontVariationSettings: '"wdth" 115',
              }}
            >
              Not Algorithms
            </span>

            <img
              src="https://images.pexels.com/photos/8980243/pexels-photo-8980243.jpeg"
              alt=""
              className="w-40 h-40 object-cover rounded-[2rem] shrink-0 border border-white/10"
            />

            <span
              className="text-[200px] font-black leading-none  "
              style={{
                fontStretch: "115%",
                fontVariationSettings: '"wdth" 115',
              }}
            >
              Chasing Consumers
            </span>

            <img
              src="https://images.pexels.com/photos/6976660/pexels-photo-6976660.jpeg"
              alt=""
              className="w-40 h-40 object-cover rounded-[2rem] shrink-0 border border-white/10"
            />
          </div>
        ))}
      </div>
    </section>
  );
}