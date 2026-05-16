import { useRef, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

interface Artwork {
  id: number;
  title: string;
  year: number;
  url: string;
  description: string;
}

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load artwork data
    const loadArtworks = async () => {
      try {
        const response = await fetch('/artwork-data.json');
        const data = await response.json();
        setArtworks(data.artworks);
      } catch (error) {
        console.error('Error loading artworks:', error);
        // Fallback data if JSON doesn't load
        setArtworks([
          {
            id: 1,
            title: 'Threshold Field',
            year: 2024,
            url: '/manus-storage/1._Threshold_Field_2b710724.jpeg',
            description: 'A moment of transition where earth meets sky, where the familiar becomes something felt rather than seen.',
          },
          {
            id: 2,
            title: 'Soft Horizon',
            year: 2024,
            url: '/manus-storage/2._Soft_Horizon_3e1913db.jpeg',
            description: 'The quality of light that exists only briefly—in the last warm hour before dark.',
          },
          {
            id: 3,
            title: 'Afterlight',
            year: 2024,
            url: '/manus-storage/3._Afterlight_45fee6da.jpg',
            description: 'What remains when the day dissolves. A meditation on presence and absence.',
          },
          {
            id: 4,
            title: 'Drift Between',
            year: 2024,
            url: '/manus-storage/5._Drift_Between__dd7fc192.jpeg',
            description: 'The suspended moment between states—neither here nor there, but something in between.',
          },
          {
            id: 5,
            title: 'Fading Distance',
            year: 2024,
            url: '/manus-storage/6._Fading_Distance_cec5d398.jpg',
            description: 'Distance as emotion. The way space can carry grief, or warmth, or quiet relief.',
          },
          {
            id: 6,
            title: 'Untitled',
            year: 2024,
            url: '/manus-storage/FC35A146-46AB-48CA-ABF8-EE0F299886D9_b99ece33.png',
            description: 'A moment of contemplation. Light and shadow in conversation.',
          },
        ]);
      }
    };

    loadArtworks();
  }, []);

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'gallery':
        galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onNavigate={handleNavigation} />
      
      <main>
        <Hero />

        {/* Gallery Section */}
        <section ref={galleryRef} className="py-20 md:py-32 bg-background">
          <div className="container">
            <div className="mb-16 space-y-4 animate-fade-in-slow">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Gallery
              </h2>
              <p className="font-serif text-lg text-foreground/70 max-w-2xl">
                A collection of digital paintings exploring light, atmosphere, and emotional memory.
              </p>
            </div>
            <Gallery artworks={artworks} />
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef}>
          <About />
        </section>

        {/* Contact Section */}
        <section ref={contactRef}>
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}
