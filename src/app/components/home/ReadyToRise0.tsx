import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadyToRise() {
  const container = useRef<HTMLDivElement>(null)
  const text = 'Ready to Rise at Seven?'.split('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.word')

      gsap.fromTo(
        words,
        {
          y: 150,
          opacity: 0,
          rotate: 10,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: true,
            markers: true,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={container}
      className="overflow-hidden flex items-center h-[400px]"
    >
      <h2 className="text-[250px] whitespace-nowrap font-bold leading-none">
        {text.map((word, index) => (
          <span
            key={index}
            className="word inline-block mr-12"
          >
            {word}
          </span>
        ))}
      </h2>
    </div>
  )
}