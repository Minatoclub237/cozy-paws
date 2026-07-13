import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface CardData {
  img: string;
  icon: string;
  title: string;
  desc: string;
}

const CARDS: CardData[] = [
  {
    img: "/media/card-chiens.webp",
    icon: "vaccines",
    title: "Médecine générale",
    desc: "Consultations, vaccinations et bilans de santé pour vos chiens et vos chats.",
  },
  {
    img: "/media/card-pets.webp",
    icon: "pets",
    title: "Tous vos compagnons",
    desc: "Un suivi vétérinaire adapté à chaque animal, du plus jeune âge jusqu'aux seniors.",
  },
  {
    img: "/media/card-toilettage.webp",
    icon: "shower",
    title: "Toilettage & hygiène",
    desc: "Bain, soin du pelage et hygiène pour le confort et la santé de votre animal.",
  },
  {
    img: "/media/card-nac.webp",
    icon: "healing",
    title: "NAC & exotiques",
    desc: "Oiseaux, rongeurs et reptiles : une expertise dédiée aux nouveaux animaux de compagnie.",
  },
];

function DirectCard({ card, index }: { card: CardData; index: number }) {
  const artboardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // --- Scale the fixed 660×836 artboard to fit its card ---
  useEffect(() => {
    const artboard = artboardRef.current;
    if (!artboard) return;
    const cardEl = artboard.parentElement as HTMLElement; // .direct-card

    const applyScale = () => {
      const scale = Math.min(
        cardEl.clientWidth / 660,
        cardEl.clientHeight / 836
      );
      artboard.style.setProperty("--direct-scale", String(scale));
    };

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(cardEl);
    window.addEventListener("resize", applyScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyScale);
    };
  }, []);

  // --- Reveal the card when it scrolls into view ---
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-inview");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-inview");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="card-reveal"
      ref={revealRef}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="card-frame">
      <div className="direct-card">
        <div className="direct-card__artboard" ref={artboardRef}>
          {/* Service photo (optimised WebP) */}
          <img
            className="direct-card__photo"
            src={card.img}
            alt={card.title}
            loading="lazy"
            decoding="async"
          />

          {/* Gradient scrim for text legibility */}
          <div className="direct2-grade" />

          {/* Footer */}
          <div className="direct-footer">
            <div className="direct-footer__head">
              <div
                className="direct-footer__icon"
                style={{
                  background: "#3fae6b",
                  color: "#fff",
                  boxShadow: "0 10px 24px -10px rgba(63,174,107,.6)",
                }}
              >
                <span className="material-icons">{card.icon}</span>
              </div>
              <div className="direct-footer__title">{card.title}</div>
            </div>
            <div className="direct-footer__desc">{card.desc}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function DirectCardSection() {
  const [isNight, setIsNight] = useState(false);

  // Toggle the global night class (drives the CSS background/colour transitions)
  useEffect(() => {
    document.body.classList.toggle("is-night", isNight);
    return () => {
      document.body.classList.remove("is-night");
    };
  }, [isNight]);

  return (
    <section id="prestations" className="direct-section">
      {/* Theme switch — drives body.is-night */}
      <button
        type="button"
        className={`direct-switch${isNight ? " is-on" : ""}`}
        onClick={() => setIsNight((v) => !v)}
        aria-label={isNight ? "Passer en mode clair" : "Passer en mode sombre"}
        aria-pressed={isNight}
      >
        <span className="direct-switch__icon direct-switch__icon--sun">
          <Sun size={16} strokeWidth={2.4} />
        </span>
        <span className="direct-switch__icon direct-switch__icon--moon">
          <Moon size={15} strokeWidth={2.4} />
        </span>
        <span className="direct-switch__knob" />
      </button>

      <div className="direct-inner">
        {/* Section header */}
        <div className="direct-head">
          <span className="direct-eyebrow">Nos prestations</span>
          <h2 className="direct-title2">
            Des soins complets pour chaque animal
          </h2>
          <p className="direct-sub">
            De la médecine générale aux soins des animaux exotiques, notre
            équipe prend soin de vos compagnons avec attention et expertise.
          </p>
        </div>

        <div className="cards">
          {CARDS.map((card, i) => (
            <DirectCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
