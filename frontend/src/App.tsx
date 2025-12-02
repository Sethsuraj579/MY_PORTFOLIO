import { Navigation } from "../components/navigation"
import { Hero } from "../components/hero"
import { About } from "../components/about"
import { Projects } from "../components/project"
import { Experience } from "../components/experience"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
