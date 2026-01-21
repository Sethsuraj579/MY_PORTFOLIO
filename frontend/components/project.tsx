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

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Selected Work</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Here are some of my recent projects showcasing my design and development capabilities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
