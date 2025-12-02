export function About() {
  return (
    <section id="about" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate designer and developer with a keen eye for detail and a deep love for creating meaningful
              digital experiences. With over 5 years of experience in the industry, I've worked with startups and
              established companies to bring their visions to life.
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
          <div className="bg-primary/10 rounded-lg p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 bg-primary/20 rounded-lg mx-auto mb-4"></div>
              <p className="text-muted-foreground">Portfolio Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
