const PARAGRAPH =
  "Vétérinaire passionné, à l'écoute de vos compagnons. Chiens, chats et NAC — soignés avec expertise, douceur et attention.";

export default function OrbisSection() {
  return (
    <section id="apropos" className="relative overflow-hidden min-h-screen">
      {/* Fullscreen background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/media/orbis-bg.mp4" type="video/mp4" />
      </video>

      {/* Content wrapper */}
      <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 z-10">
        {/* ROW 1 */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] font-normal uppercase leading-[1.05] sm:leading-[1] md:leading-[1] text-cream relative">
            Hello!
            <br />
            I'm j-m
            <span className="font-condiment text-[36px] sm:text-[52px] md:text-[68px] font-normal normal-case text-neon mix-blend-exclusion leading-[0.79] tracking-[0.03em] absolute right-[-8px] bottom-[-20px] sm:bottom-[-30px] md:bottom-[-40px] -rotate-1 opacity-90">
              Roullet
            </span>
          </h2>

          <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase text-cream max-w-[266px] leading-relaxed">
            {PARAGRAPH}
          </p>
        </div>

        {/* ROW 2 */}
        <div className="flex justify-between items-start">
          {/* Left column — always visible */}
          <div className="flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              {PARAGRAPH}
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              {PARAGRAPH}
            </p>
          </div>

          {/* Right column — desktop only */}
          <div className="hidden lg:flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              {PARAGRAPH}
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              {PARAGRAPH}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
