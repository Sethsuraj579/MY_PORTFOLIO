export function Hero() {
  return (
    <section className="w-full pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Suraj - Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-balance">
            Building scalable web applications with React, Django, and modern cloud technologies.
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
