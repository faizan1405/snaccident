import { Marquee } from "@/components/motion/Marquee";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";

const PHRASES = [
  "NOT A MISTAKE",
  "A STATEMENT",
  "A MOMENT OF INDULGENCE",
  "PACKET EMPTY. ATTITUDE FULL.",
  "INEVITABLE",
];

function MarqueeItem({ children }: { children: string }) {
  return (
    <span className="mx-8 flex items-center gap-8 whitespace-nowrap">
      <span>{children}</span>
      <span className="text-ash">✦</span>
    </span>
  );
}

export function StoryMarquee() {
  return (
    <section
      id="story"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-28"
    >
      {/* Outline marquee, top */}
      <Marquee durationSeconds={38} className="text-white/10">
        <span
          className="font-display text-[13vw] font-medium uppercase leading-none tracking-tight text-transparent md:text-[9vw]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
        >
          Every stain tells a story&nbsp;·&nbsp;
        </span>
      </Marquee>

      {/* Center statement */}
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-ash">The Story</p>
        <h2 className="mt-8 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <TextReveal text="Every stain tells a story." />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Snacks happen. Spills happen. We built a tee that wears the accident
            like a badge — heavyweight, unbothered, and made for the moment
            after the moment. Not a mistake. A statement.
          </p>
        </Reveal>
      </div>

      {/* Phrase marquee, bottom */}
      <Marquee
        reverse
        durationSeconds={30}
        className="text-sm uppercase tracking-[0.3em] text-white/70 md:text-base"
      >
        {PHRASES.map((phrase) => (
          <MarqueeItem key={phrase}>{phrase}</MarqueeItem>
        ))}
      </Marquee>
    </section>
  );
}
