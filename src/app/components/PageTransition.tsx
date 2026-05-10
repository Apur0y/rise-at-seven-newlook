import { useEffect, useState } from "react";

export default function PageReveal() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setHide(true);
      document.body.style.overflow = "auto";
    }, 900); // duration of animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-hidden
        transition-opacity duration-500
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* CURVED SHAPE */}
      <div
        className="
          bg-teal-200
          w-[150px]
          h-[150px]
          rounded-[50%]
          scale-[30]
          origin-center
          transition-transform duration-[900ms] ease-in-out
        "
      />
    </div>
  );
}