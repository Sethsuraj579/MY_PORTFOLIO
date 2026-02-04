import { useEffect, useRef } from "react"
import { animateSlideInLeft, animateSlideInRight } from "../lib/animations"

export function About() {
  const aboutRefLeft = useRef<HTMLDivElement>(null)
  const aboutRefRight = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (aboutRefLeft.current) animateSlideInLeft(aboutRefLeft.current)
    if (aboutRefRight.current) animateSlideInRight(aboutRefRight.current, 0.2)
  }, [])

  return (
    <section id="about" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={aboutRefLeft} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate designer and developer with a keen eye for detail and a deep love for creating meaningful
              digital experiences. Pursuing B.tech in Computer Science, I've worked on IBM Cloud and
              doing an open sourcing to bring the best solutions to the community.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach combines strategic thinking with creative problem-solving. I believe the best solutions come
              from understanding user needs and crafting interfaces that are both beautiful and intuitive.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground">User-Centered Design</h3>
                  <p className="text-muted-foreground text-sm">Creating experiences that put users first</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground">Full-Stack Development</h3>
                  <p className="text-muted-foreground text-sm">From concept to deployment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground">Responsive Design</h3>
                  <p className="text-muted-foreground text-sm">Beautiful on all devices</p>
                </div>
              </div>
            </div>
          </div>
          <div ref={aboutRefRight} className="bg-primary/10 rounded-lg p-8 h-80 flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Floating Atom Orbit Container */}
              <div className="floating-atom-container">
                <div className="floating-atom-orbit"></div>
                <div className="floating-atom">
                  <div className="atom-trail"></div>
                </div>
              </div>
              
              {/* Round Profile Image Center */}
              <img
                src="/image/portfolio1.png"
                alt="Suraj's Profile"
                className="profile-img absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 m-5 p-5 opacity-67 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/20 shadow-xl"
                loading="lazy"/>
                </div>
      </div>
    </div>
  </div>
    </section>
  )
}
