import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadyToRise() {
  const container = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLHeadingElement>(null);
  const charecter = useRef<HTMLSpanElement>(null);

    const maintext = 'Ready  to  Rise  at  Seven?'.split('') // Replace spaces with non-breaking spaces

  useEffect(() => {
    const ctx = gsap.context(() => {
        const words = gsap.utils.toArray('.word')
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
            // remove in production
          },
        }
      )
      gsap.fromTo(
        words,
        {
          y: -150,
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
            start: 'top 45%',
            end: 'top -15%',
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
      className="overflow-hidden flex items-center"
      style={{
        height: '800px',
      }}
    >
      <h2
        ref={text}
        className="text-[250px] whitespace-nowrap font-bold"
      >
       
        {maintext.map((char: string, index: number) => (
          <span
          ref={charecter}
            key={index}
            className="word inline-block   mr-4"
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  )
}