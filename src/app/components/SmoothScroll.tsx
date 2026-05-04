import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    const init = async () => {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        duration: 1.4,                          // ✅ was 0.1 — this was your main problem
        easing: (t: number) => 1 - Math.pow(1 - t, 4),  // ✅ easeOutQuart — feels weighty & smooth
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,                     // keep false — native touch feels better on mobile
        touchMultiplier: 2,
        wheelMultiplier: 1,                     // ✅ lower = slower/smoother wheel response
        infinite: false,
      } as any);

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);  // ✅ also cancel the RAF on cleanup
    };
  }, []);

  return <>{children}</>;
}