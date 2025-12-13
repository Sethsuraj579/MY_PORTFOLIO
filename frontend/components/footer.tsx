import { Link }from "react-router"

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Portfolio</h3>
            <p className="text-muted-foreground text-sm">Crafting beautiful and functional digital experiences.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="#experience" className="text-muted-foreground hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Social</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <p className="text-muted-foreground text-sm">
              <a href="mailto:hello@example.com" className="hover:text-primary transition-colors">
                hello@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">© 2025 Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
