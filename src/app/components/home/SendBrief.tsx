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
        if (Math.abs(xRef.current) >= half) xRef.current = 0;
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

  const TEXT = `Not Algorithms  Chasing Consumers `;

  return (
    <section
      ref={sectionRef}
      id="brief"
      className="text-black"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: "var(--black)",
        padding: "100px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        cursor: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              paddingRight: "60px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(56px, 9vw, 120px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              Not Algorithms
            </span>

            <img
              src="https://images.pexels.com/photos/8980243/pexels-photo-8980243.jpeg"
              alt=""
              style={{
                width: "120px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "999px",
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(56px, 9vw, 120px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              Chasing Consumers
            </span>

            <img
              src="https://images.pexels.com/photos/6976660/pexels-photo-6976660.jpeg"
              alt=""
              style={{
                width: "120px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "999px",
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
