export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      
      {/* Content */}
      <div className="relative z-10 container max-w-3xl text-center space-y-8 animate-fade-in-slow">
        <div className="space-y-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
            What Light Remains
          </h1>
          <p className="font-serif text-xl md:text-2xl text-foreground/70 leading-relaxed">
            A meditation on atmosphere, memory, and the emotional weight of distance.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <div className="h-px w-12 bg-accent/30" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="h-px w-12 bg-accent/30" />
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
