import { Star } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/BtjiW9NXpbCSfUX48";

interface Review {
  name: string;
  meta: string;
  date: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Nicole Pallanca",
    meta: "2 avis",
    date: "il y a 5 ans",
    text: "Le Docteur Roullet est un vétérinaire formidable… Un papa pour nos chers animaux. Doté d'une compétence hors normes, à l'écoute et d'une extrême gentillesse. Son équipe est à son image.",
  },
  {
    name: "Sylvie Viale",
    meta: "11 avis",
    date: "il y a un an",
    text: "Les meilleurs vétos que je connaisse. Personne ne touche à mes animaux à part eux ! Compétence, efficacité, douceur avec les animaux, à l'écoute des « stressés ».",
  },
  {
    name: "Virginie Vanhove",
    meta: "52 avis",
    date: "il y a 10 mois",
    text: "Ma petite boule de poils Milka a été suivie pendant presque 9 ans. Le docteur Pozet est vraiment très bien, d'une bienveillance extraordinaire et d'une douceur pour nos petits êtres.",
  },
  {
    name: "Nicolas",
    meta: "30 avis",
    date: "il y a 2 ans",
    text: "Les vétos sont très gentils, patients, pédagogues et doux avec les bêtes. C'est très propre et les secrétaires franchement sympas. Ma chienne prend presque plaisir à venir !",
  },
  {
    name: "Christian Cesari",
    meta: "385 avis",
    date: "il y a 4 ans",
    text: "Nous avons fait soigner Parker pour une stérilisation, très bon suivi. Très compétent, très à l'écoute, et surtout des tarifs très justes.",
  },
  {
    name: "Aude L",
    meta: "121 avis",
    date: "il y a 2 ans",
    text: "Très bonne clinique vétérinaire ! Disponibles et accueillants, avec des personnes qui aiment les animaux. Ma minette y a toujours été bien reçue et soignée ❤ un grand merci !",
  },
  {
    name: "Michèle Mari-Bottero",
    meta: "4 avis",
    date: "il y a 3 ans",
    text: "Le docteur Anne Claus et l'infirmière qui l'accompagne sont d'une gentillesse, d'une douceur, d'une compassion et d'un respect exemplaires, envers l'animal comme envers son compagnon humain.",
  },
  {
    name: "J. Chartier",
    meta: "180 avis",
    date: "il y a 2 ans",
    text: "Excellente clinique vétérinaire. Le personnel est sympathique et compétent. Un grand MERCI au Dr C. pour son professionnalisme et son soutien lors des derniers instants de notre chatte.",
  },
  {
    name: "Francesc-Xavier Adell",
    meta: "113 avis",
    date: "il y a un an",
    text: "Des excellents médecins avec une très bonne équipe. Les propriétaires comme les animaux, tous sont traités avec soin, professionnalisme et un énorme respect ! Bravo !!!",
  },
  {
    name: "Christelle",
    meta: "15 avis",
    date: "il y a un an",
    text: "J'ai amené ma petite dinde se faire stériliser chez Mr Roullet. L'intervention s'est bien passée et ma louloute voulait presque rester là-bas…",
  },
  {
    name: "Vincent Doulé",
    meta: "4 avis",
    date: "il y a 2 ans",
    text: "Au top du top, je recommande à 100%. Vétérinaire qui aime vraiment les animaux et respecte les maîtres.",
  },
  {
    name: "Valerie Janicki",
    meta: "62 avis",
    date: "il y a 3 ans",
    text: "Les vétérinaires ont un cœur d'or avec vos BB 🐶😻 et les secrétaires d'une gentillesse énorme. Ils m'ont sauvé beaucoup de mes animaux et je les remercie infiniment 🙏",
  },
  {
    name: "Dan Dek",
    meta: "37 avis",
    date: "il y a un an",
    text: "Super clinique vétérinaire. Excellent accueil et très attentifs à la santé et au bien-être de ma petite Poupie.",
  },
  {
    name: "Erwan Ditto",
    meta: "12 avis",
    date: "il y a 2 ans",
    text: "Excellents vétérinaires et excellente équipe ! Très efficace et d'une gentillesse incroyable. Je recommande sans hésiter. Le maître de Sinatra.",
  },
  {
    name: "Sandy Caudron",
    meta: "9 avis",
    date: "il y a 4 ans",
    text: "Super vétérinaire très professionnel, à l'écoute des animaux et des maîtres. Ils sont vraiment là pour soigner. Je recommande à 1000 pourcent ⭐❤️",
  },
  {
    name: "Sylvie Legros",
    meta: "4 avis",
    date: "il y a 4 ans",
    text: "Je remercie infiniment le Dr Roullet et le Dr Clauss pour leur sérieux, leurs bons conseils, leur honnêteté et leur bienveillance !",
  },
  {
    name: "Camille Ducray",
    meta: "12 avis",
    date: "il y a 2 ans",
    text: "Très bon vétérinaire, les prix sont très raisonnables et l'accueil très agréable. Les vétérinaires très attentifs et attentionnés avec les animaux. Je les recommande fortement.",
  },
  {
    name: "Angie Desbrousses",
    meta: "34 avis",
    date: "il y a 2 ans",
    text: "Très très bon vétérinaire… Rien à dire. On voit que c'est un métier qu'ils aiment vraiment.",
  },
];

const AVATAR_COLORS = [
  "#1a3d1a",
  "#E86A10",
  "#3fae6b",
  "#2a5a2a",
  "#c2410c",
  "#0f766e",
  "#7c3aed",
  "#b45309",
];

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Note 5 sur 5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article className="w-[300px] sm:w-[340px] shrink-0 bg-white rounded-2xl border border-[#1a3d1a]/10 shadow-[0_18px_40px_-24px_rgba(28,18,8,0.25)] p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <Stars />
        <GoogleG className="w-5 h-5 shrink-0" />
      </div>

      <p className="text-[13.5px] leading-relaxed text-gray-600 flex-1 line-clamp-5">
        {review.text}
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
          aria-hidden="true"
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#1a3d1a] truncate">
            {review.name}
          </p>
          <p className="text-[11px] text-gray-400 font-medium truncate">
            {review.meta} · {review.date}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  reviews,
  direction,
  startIndex,
}: {
  reviews: Review[];
  direction: "left" | "right";
  startIndex: number;
}) {
  // Duplicate the list so the CSS translateX(-50%) loops seamlessly.
  const loop = [...reviews, ...reviews];
  return (
    <div className="tm-marquee">
      <div className={`tm-track tm-track--${direction}`}>
        {loop.map((r, i) => (
          <ReviewCard key={i} review={r} index={startIndex + (i % reviews.length)} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const half = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.slice(0, half);
  const rowB = REVIEWS.slice(half);

  return (
    <section id="temoignages" className="relative z-[1] bg-[#EFFDF0] py-20 sm:py-24 md:py-28 overflow-hidden">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 text-center mb-12 sm:mb-16">
        <span className="inline-block font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[13px] text-[#E86A10] mb-4">
          Témoignages
        </span>
        <h2 className="font-serif-display text-[#1a3d1a] text-[30px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.5px]">
          Ce que disent nos clients
        </h2>

        {/* Rating row */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full border border-[#1a3d1a]/10 shadow-sm px-5 py-2.5">
          <GoogleG className="w-5 h-5" />
          <span className="text-lg font-black text-[#1a3d1a] leading-none">4,8</span>
          <Stars />
          <span className="hidden sm:inline text-xs font-semibold text-gray-500">
            250+ avis Google
          </span>
        </div>
      </div>

      {/* Two auto-scrolling rows */}
      <div className="flex flex-col gap-5">
        <MarqueeRow reviews={rowA} direction="left" startIndex={0} />
        <MarqueeRow reviews={rowB} direction="right" startIndex={half} />
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16 px-4">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <GoogleG className="w-5 h-5 bg-white rounded-full p-0.5" />
          Voir tous les avis sur Google
        </a>
      </div>
    </section>
  );
}
