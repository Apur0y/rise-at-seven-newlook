import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
];

export default function Banner() {
  const [currentImage, setCurrentImage] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomImage = BANNER_IMAGES[Math.floor(Math.random() * BANNER_IMAGES.length)];
    setCurrentImage(randomImage);
  }, []);

  useEffect(() => {
    if (!currentImage) return;

    const timeline = gsap.timeline({ delay: 0.5 });

    timeline
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }, [currentImage]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40 rounded-3xl mx-2">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentImage})`,
          filter: 'blur(12px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-white">
        <div className="mb-8">
          <div
            ref={imageRef}
            className="inline-block w-32 h-32 md:w-48 md:h-48 bg-cover bg-center rounded-2xl mb-6 shadow-2xl ring-4 ring-white/20 opacity-0"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
        </div>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight opacity-0"
        >
          Marketing That
          <br />
          <span className="italic bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Actually Works
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto opacity-0"
        >
          Award-winning SEO & content marketing agency
          <br />
          driving real business growth
        </p>
      </div>
    </section>
  );
}
