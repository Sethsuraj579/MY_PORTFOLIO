const experience = [
  {
    role: "Senior Product Designer",
    company: "Tech Startup",
    period: "2022 - Present",
    description: "Leading design direction and user experience strategy for multiple product lines.",
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description: "Developed and maintained web applications for diverse client base.",
  },
  {
    role: "UI/UX Designer",
    company: "Creative Studio",
    period: "2018 - 2020",
    description: "Created engaging user interfaces and experiences for digital products.",
  },
  {
    role: "Junior Developer",
    company: "Web Solutions Inc",
    period: "2017 - 2018",
    description: "Started career building and learning web development fundamentals.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Experience</h2>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={index} className="flex gap-6">
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
