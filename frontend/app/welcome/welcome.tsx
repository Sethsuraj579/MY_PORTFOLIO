import { Navigation } from "../../components/navigation"
import { Hero } from "../../components/hero"
import { About } from "../../components/about"
import { Projects } from "../../components/project"
import { Experience } from "../../components/experience"
import { Contact } from "../../components/contact"
import { Footer } from "../../components/footer"
import type { Project } from "../../components/project"

type HomeProps = {
  projects: Project[]
}

export default function Home({ projects }: HomeProps) {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
