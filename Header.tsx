import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Gallery', id: 'gallery' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate?.(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container flex items-center justify-between py-6">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-display text-2xl md:text-3xl font-bold text-foreground hover:text-accent transition-colors duration-300"
        >
          Mei Yu
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-sans text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://instagram.com/mei.yu__art"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-sans text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            Instagram
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-accent transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-slide-up-subtle">
          <div className="container py-4 space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left font-sans text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 py-2"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://instagram.com/mei.yu__art"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block font-sans text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 py-2"
            >
              Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
