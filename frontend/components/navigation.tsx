import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="#projects" className="text-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="#experience" className="text-foreground hover:text-primary transition-colors">
              Experience
            </Link>
            <Link to="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="#about"
              className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="#projects"
              className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="#experience"
              className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link
              to="#contact"
              className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
