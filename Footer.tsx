export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-foreground/60 text-sm">
              © {currentYear} Mei Yu. All rights reserved.
            </p>
            <p className="font-serif text-foreground/40 text-xs mt-1">
              Digital paintings created in Procreate
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/mei.yu__art"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-sans text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#gallery"
              className="font-sans text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
            >
              Gallery
            </a>
            <a
              href="#about"
              className="font-sans text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
