import { useState } from 'react';
import { X } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  year: number;
  url: string;
  description: string;
}

interface GalleryProps {
  artworks: Artwork[];
}

export default function Gallery({ artworks }: GalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = artworks.find(a => a.id === selectedId);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {artworks.map((artwork, index) => (
          <button
            key={artwork.id}
            onClick={() => setSelectedId(artwork.id)}
            className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all duration-500 hover:shadow-lg animate-fade-in-slow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              src={artwork.url}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            
            {/* Title overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="font-display text-white text-lg md:text-xl">{artwork.title}</h3>
              <p className="text-white/80 text-sm font-sans">{artwork.year}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 overflow-y-auto animate-fade-in-slow"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full flex flex-col items-center animate-slide-up-subtle my-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute -top-10 right-0 text-white hover:text-white/70 transition-colors duration-300 z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Image - Full size, no cropping */}
            <div className="w-full max-w-6xl flex items-center justify-center mb-6 mt-8">
              <img
                src={selected.url}
                alt={selected.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="text-white space-y-2">
              <h2 className="font-display text-3xl md:text-4xl">{selected.title}</h2>
              <p className="text-white/80 font-sans text-sm">{selected.year}</p>
              <p className="text-white/70 font-serif text-base leading-relaxed pt-2 max-w-2xl">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
