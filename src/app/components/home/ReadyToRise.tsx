import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadyToRise() {
  const container = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        text.current,
        {
          x: 1900,
        },
        {
          x: -1600,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 50%',
            end: 'top -20%',
            scrub: true,
            markers: true, // remove in production
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={container}
      className="overflow-hidden flex items-center"
      style={{
        height: '400px',
      }}
    >
      <h2
        ref={text}
        className="text-[250px] whitespace-nowrap font-bold"
      >
        Ready to Rise at Seven?
      </h2>
    </div>
  )
}