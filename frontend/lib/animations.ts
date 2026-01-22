import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function animateOnScroll(
  element: HTMLElement,
  options: {
    duration?: number
    delay?: number
    stagger?: number
    ease?: string
    from?: Record<string, number | string>
    to?: Record<string, number | string>
  } = {}
) {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    ease = "power3.out",
    from = {
      opacity: 0,
      y: 30,
    },
    to = {
      opacity: 1,
      y: 0,
    },
  } = options

  const children = element.querySelectorAll("[data-animate]")

  if (children.length === 0) {
    gsap.fromTo(element, from, {
      ...to,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  } else {
    gsap.fromTo(children, from, {
      ...to,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }
}

export function animateFadeIn(element: HTMLElement, delay = 0) {
  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  )
}

export function animateSlideInLeft(element: HTMLElement, delay = 0) {
  gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  )
}

export function animateSlideInRight(element: HTMLElement, delay = 0) {
  gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  )
}

export function animateScaleUp(element: HTMLElement, delay = 0) {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  )
}

export function animateStaggerChildren(
  container: HTMLElement,
  selector: string,
  options: {
    duration?: number
    stagger?: number
    delay?: number
    ease?: string
  } = {}
) {
  const { duration = 0.6, stagger = 0.15, delay = 0, ease = "power2.out" } = options

  gsap.fromTo(
    container.querySelectorAll(selector),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  )
}
