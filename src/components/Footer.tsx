import { Instagram, Facebook, MapPin, Clock, ArrowUpRight, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/BtjiW9NXpbCSfUX48";

const NAV = [
  { label: "Accueil", href: "#" },
  { label: "Prestations", href: "#" },
  { label: "À propos", href: "#" },
  { label: "Témoignages", href: "#" },
  { label: "Contact", href: "#contact" },
];

const HOURS = [
  { day: "Lundi – Vendredi", time: "09:00 – 12:00 · 15:00 – 19:00" },
  { day: "Samedi", time: "09:00 – 16:00" },
  { day: "Dimanche", time: "Fermé", closed: true },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] bg-[#123012] text-[#EFFDF0]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src="/logo-cozypaws-light.svg"
              alt="CozyPaws"
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#EFFDF0]/70">
              Des soins attentionnés pour vos compagnons — chiens, chats, NAC et
              exotiques. Du suivi du quotidien jusqu'aux urgences, avec écoute et
              expertise.
            </p>

            {/* Google rating */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
            >
              <span className="font-bold">4,8</span>
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </span>
              <span className="text-[#EFFDF0]/60">· 250+ avis</span>
            </a>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#EFFDF0]/80 transition-colors hover:border-[#E86A10] hover:text-[#E86A10]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E86A10]">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#EFFDF0]/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#E86A10]">
              <Clock size={14} /> Horaires
            </h4>
            <ul className="mt-5 space-y-3">
              {HOURS.map((h) => (
                <li key={h.day} className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[#EFFDF0]/90">
                    {h.day}
                  </span>
                  <span
                    className={`text-sm ${
                      h.closed ? "text-[#EFFDF0]/40" : "text-[#EFFDF0]/65"
                    }`}
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cabinet / Contact */}
          <div className="lg:col-span-3">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#E86A10]">
              <MapPin size={14} /> Le cabinet
            </h4>
            <address className="mt-5 not-italic text-sm leading-relaxed text-[#EFFDF0]/75">
              8 Av. Antonia Augusta
              <br />
              06000 Nice, France
            </address>

            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
              Urgences 24h/24 · 7j/7
            </div>

            <a
              href="#contact"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#E86A10] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#d45e0d] active:scale-[0.98]"
            >
              Prendre rendez-vous
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[#EFFDF0]/50 sm:flex-row">
          <p>
            © 2026 CozyPaws — Cabinet vétérinaire du Dr J-M Roullet. Tous droits
            réservés.
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
