export default function About() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl space-y-16">
        {/* Artist Statement */}
        <div className="space-y-8 animate-fade-in-slow">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Artist Statement
          </h2>
          
          <div className="space-y-6 font-serif text-lg text-foreground/80 leading-relaxed">
            <p>
              There is a quality of light that exists only briefly — in the last warm hour before dark, in the stillness before weather moves through, in the moment a landscape stops being a place and becomes a feeling. This is where my paintings begin.
            </p>
            
            <p>
              Drawing on a lifelong study rooted in classical Chinese artistic tradition, I work intuitively in Procreate to build abstract landscapes layer by layer — each mark softening what came before, each color field expanding into atmosphere. The natural world is my source material, but never my subject. What I am after is something beneath the surface: the emotional register of a place, the way light or distance can carry grief, or warmth, or quiet relief.
            </p>
            
            <p>
              My work is an act of healing — not in the sense of resolution, but of sitting with what remains and finding in it something beautiful. Each painting reaches toward an emotional truth that exists beyond language, and invites the viewer to bring their own unresolved feelings into contact with it.
            </p>
            
            <p className="italic text-foreground/70">
              What Light Remains asks the viewer to slow down, stay inside the ambiguity, and find in that suspension something recognizable — not as landscape, but as lived experience.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Bio */}
        <div className="space-y-8 animate-fade-in-slow" style={{ animationDelay: '200ms' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            About Mei Yu
          </h2>
          
          <div className="space-y-6 font-serif text-base md:text-lg text-foreground/80 leading-relaxed">
            <p>
              Mei Yu is a digital painter working at the intersection of abstract landscape, emotional memory, and atmosphere. Trained from a young age in classical Chinese painting traditions, she developed a deep sensitivity to color, composition, and the expressive weight of light and space — a foundation that continues to shape her practice today.
            </p>
            
            <p>
              By profession, Mei Yu has spent her career as a software quality engineer, holding a master's degree in computer science. It was during the Covid pandemic that she returned to making art, drawn back by the need to process and transform unresolved personal experience. Working in Procreate, she found that digital tools offered both the immediacy she needed and the capacity for the soft, layered mark-making that defines her work.
            </p>
            
            <p>
              Since 2019 she has created over 400 paintings, developing a visual language built around the transient qualities of the natural world — light at dusk, shifting weather, the threshold between form and dissolution. Her work is at once deeply personal and deliberately open, made to heal and intended to be met by viewers carrying experiences of their own.
            </p>
            
            <p>
              Mei Yu is actively seeking gallery representation and commissions. Her work has been exhibited in private collections and is available for purchase through commission inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
