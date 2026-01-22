export type Project = {
  id: number
  title: string
  description: string
  tags?: string[]
  image?: string
  image_url?: string
  resolved_image_url?: string
  live_url?: string
  repo_url?: string
}

type ProjectsProps = {
  projects: Project[]
}

import { useEffect, useRef } from "react"
import { animateStaggerChildren } from "../lib/animations"

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "CSS Art Gallery",
    description:
      "A curated gallery of CSS illustrations showcasing creative layouts, gradients, and animation techniques.",
    tags: ["HTML", "CSS", "JavaScript"],
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    live_url: "https://example.com/css-art-gallery",
    repo_url: "https://github.com/your-username/css-art-gallery",
  },
  {
    id: 2,
    title: "Weather Prediction (JupyterLab)",
    description:
      "A data science workflow for weather forecasting using feature engineering, model training, and evaluation.",
    tags: ["Python", "JupyterLab", "Machine Learning"],
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    live_url: "https://example.com/weather-prediction",
    repo_url: "https://github.com/your-username/weather-prediction",
  },
  {
    id: 3,
    title: "Goomatu",
    description:
      "A modern web app built with Next.js and React featuring a responsive UI and fast navigation.",
    tags: ["Next.js", "React", "TypeScript"],
    image_url: "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
    live_url: "https://example.com/goomatu",
    repo_url: "https://github.com/your-username/goomatu",
  },
]

export function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects.length > 0 ? projects : defaultProjects
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      animateStaggerChildren(containerRef.current, ".project-card", {
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      })
    }
  }, [displayProjects])

  return (
    <section id="projects" className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Selected Work</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Here are some of my recent projects showcasing my design and development capabilities.
        </p>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.resolved_image_url || project.image_url ? (
                <img
                  src={project.resolved_image_url || project.image_url || ""}
                  alt={project.title}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="bg-primary/5 h-64 flex items-center justify-center">
                  <span className="text-muted-foreground">Project Image</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  {project.live_url ? (
                    <a className="text-accent font-semibold" href={project.live_url} target="_blank" rel="noreferrer">
                      Live ↗
                    </a>
                  ) : null}
                  {project.repo_url ? (
                    <a className="text-muted-foreground" href={project.repo_url} target="_blank" rel="noreferrer">
                      Code ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
