import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: options.y || 50 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: options.duration || 0.7,
            ease: options.ease || 'power3.out',
            delay: options.delay || 0,
          })
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useStaggerReveal(count, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.children
    if (!children.length) return

    gsap.set(children, { opacity: 0, y: options.y || 40 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: options.duration || 0.5,
            ease: options.ease || 'power2.out',
            stagger: options.stagger || 0.1,
            delay: options.delay || 0,
          })
          observer.unobserve(container)
        }
      },
      { threshold: options.threshold || 0.05 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [count])

  return containerRef
}
