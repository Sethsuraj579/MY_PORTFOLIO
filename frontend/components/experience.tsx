const experience = [
  {
    role: "Open Source Contributor",
    company: "Open Source Community",
    period: "2024 - Present",
    description: "Contributing to open-source projects, collaborating on issues, and improving documentation and features.",
  },
  {
    role: "Virtual Intern",
    company: "IBM",
    period: "2025",
    description: "Completed a virtual internship focused on cloud computing, tooling, and best practices.",
  },
]

import * as React from "react"
import { animateStaggerChildren } from "../lib/animations"

export function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      animateStaggerChildren(containerRef.current, "[data-experience-item]", {
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <section id="experience" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Experience</h2>

        <div ref={containerRef} className="space-y-8">
          {experience.map((exp, index) => (
            <div key={index} data-experience-item className="flex gap-6">
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                {index < experience.length - 1 && <div className="w-0.5 h-20 bg-border mt-4"></div>}
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                <p className="text-accent font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
