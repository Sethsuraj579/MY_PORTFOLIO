const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern, fully responsive e-commerce platform built with Next.js and Stripe integration.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "bg-primary/5",
  },
  {
    title: "Design System",
    description: "A comprehensive design system with reusable components and comprehensive documentation.",
    tags: ["React", "Storybook", "CSS", "Design"],
    image: "bg-accent/5",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization.",
    tags: ["React", "Data Visualization", "API", "TypeScript"],
    image: "bg-secondary/5",
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application delivering seamless user experience.",
    tags: ["React Native", "Mobile", "JavaScript", "Firebase"],
    image: "bg-muted/5",
  },
]

export function Projects() {
  return (
    <section id="projects" className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Selected Work</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Here are some of my recent projects showcasing my design and development capabilities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`${project.image} h-64 flex items-center justify-center`}>
                <span className="text-muted-foreground">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
