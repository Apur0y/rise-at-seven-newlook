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

  const TEXT = "Send Us Your Brief · Send Us Your Brief · Send Us Your Brief · ";

  return (
    <section
      ref={sectionRef}
      id="brief"
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
      <div ref={trackRef} style={{ display: "flex", width: "max-content", willChange: "transform" }}>
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(56px, 9vw, 120px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
              paddingRight: "60px",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {TEXT}
          </span>
        ))}
      </div>
    </section>
  );
}
