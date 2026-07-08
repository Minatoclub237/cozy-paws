import { useEffect, useRef, useState } from "react";
import LiquidGlassCanvas from "./LiquidGlass";
import FadeUp from "./FadeUp";

const FIELD =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/50 focus:bg-white/15";
const LABEL = "mb-1.5 block text-sm font-medium text-white/85";

export default function ContactSection() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);

  // Mount the (expensive) refraction canvas only while the section is on-screen.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="contact" ref={sceneRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        crossOrigin="anonymous"
      >
        <source src="/media/signin-bg.mp4" type="video/mp4" />
      </video>

      {/* Centering wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:py-16">
        {/* Card */}
        <div
          ref={cardRef}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl p-6 shadow-2xl sm:p-9 md:p-11"
        >
          {/* Liquid glass refraction as the card background */}
          {inView && (
            <LiquidGlassCanvas
              videoRef={videoRef}
              sceneRef={sceneRef}
              cardRef={cardRef}
            />
          )}

          {/* Readability scrim over the glass — kept dark so the refracted
              video stays a subtle texture (not a distracting warped face) */}
          <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-b from-[#08160a]/74 via-[#08160a]/82 to-[#08160a]/90" />

          {/* Form content above the canvas */}
          <div className="relative z-[1]">
            {/* Logo (CozyPaws — light variant for the dark card) */}
            <FadeUp delay={0}>
              <div className="mb-5 flex justify-center">
                <img
                  src="/logo-cozypaws-light.svg"
                  alt="CozyPaws"
                  className="h-9 w-auto sm:h-10"
                />
              </div>
            </FadeUp>

            {/* Heading */}
            <FadeUp delay={100}>
              <h2 className="mb-2 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Prendre rendez-vous
              </h2>
            </FadeUp>

            {/* Subtitle */}
            <FadeUp delay={200}>
              <p className="mb-7 text-center text-sm leading-relaxed text-white/70 sm:text-base">
                Une question ou une urgence ? Parlez-nous de votre compagnon,
                <br className="hidden sm:inline" /> nous vous recontactons au
                plus vite.
              </p>
            </FadeUp>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Row: owner name + pet name */}
              <FadeUp delay={300}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Votre nom</label>
                    <input
                      type="text"
                      placeholder="Prénom et nom"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Nom de votre animal</label>
                    <input
                      type="text"
                      placeholder="ex. Milou"
                      className={FIELD}
                    />
                  </div>
                </div>
              </FadeUp>

              {/* Row: pet type + location */}
              <FadeUp delay={400}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Type d'animal</label>
                    <select
                      defaultValue=""
                      className={`${FIELD} appearance-none`}
                    >
                      <option value="" disabled className="text-gray-500">
                        Sélectionner…
                      </option>
                      <option className="text-gray-900">Chien</option>
                      <option className="text-gray-900">Chat</option>
                      <option className="text-gray-900">Oiseau</option>
                      <option className="text-gray-900">Rongeur</option>
                      <option className="text-gray-900">
                        NAC / Reptile / Exotique
                      </option>
                      <option className="text-gray-900">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Localisation</label>
                    <input
                      type="text"
                      placeholder="Votre ville"
                      className={FIELD}
                    />
                  </div>
                </div>
              </FadeUp>

              {/* Phone */}
              <FadeUp delay={500}>
                <div>
                  <label className={LABEL}>Téléphone</label>
                  <input
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className={FIELD}
                  />
                </div>
              </FadeUp>

              {/* Message */}
              <FadeUp delay={600}>
                <div>
                  <label className={LABEL}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre demande ou les symptômes de votre animal…"
                    className={`${FIELD} resize-none`}
                  />
                </div>
              </FadeUp>

              {/* Submit */}
              <FadeUp delay={700}>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#E86A10] py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#d45e0d] active:scale-[0.98]"
                >
                  Envoyer ma demande
                </button>
              </FadeUp>

              {/* Note */}
              <FadeUp delay={800}>
                <p className="pt-1 text-center text-xs text-white/55">
                  Nous répondons généralement sous 24 h. En cas d'urgence vitale,
                  appelez directement le cabinet.
                </p>
              </FadeUp>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
