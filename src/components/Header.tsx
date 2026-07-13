import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenCart: () => void;
}

export default function Header({
  cartCount,
  favoritesCount,
  onOpenSearch,
  onOpenFavorites,
  onOpenCart
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ACCUEIL");

  const navLinks = [
    { label: "ACCUEIL", target: "accueil" },
    { label: "SERVICES / PRESTATIONS", target: "prestations" },
    { label: "A PROPOS", target: "apropos" },
    { label: "TEMOIGNAGES", target: "temoignages" }
  ];

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative w-full z-30 shrink-0 bg-transparent animate-fade-in delay-100">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Left: Logo (205x52px desktop, 130x33px mobile) */}
        <a href="/" className="block focus:outline-none focus:ring-2 focus:ring-[#1a3d1a]/20 rounded-lg">
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg"
            alt="CozyPaws Logo"
            className="w-[130px] h-[33px] lg:w-[205px] lg:h-[52px] object-contain transition-all duration-300"
          />
        </a>

        {/* Center: Navigation links (hidden below md) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 bg-white/40 border border-[#1a3d1a]/10 backdrop-blur-md px-6 py-2.5 rounded-full">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setActiveTab(link.label);
                scrollToSection(link.target);
              }}
              className={`text-xs lg:text-sm font-semibold transition-all hover:text-[#1a3d1a] ${
                activeTab === link.label
                  ? "text-[#1a3d1a] relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#E86A10] after:rounded-full"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* CTA "PRENDRE RDV" button (hidden on extra small screen maybe, but let's keep it visible on most, or hidden below sm) */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:inline-flex bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2.5 rounded-full text-xs lg:text-sm font-bold shadow-md transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer items-center justify-center whitespace-nowrap"
          >
            PRENDRE RDV
          </button>

          {/* Mobile hamburger (hidden above md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-[#1a3d1a]/15 bg-white flex items-center justify-center text-[#1a3d1a] transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mx-4 bg-white border border-[#1a3d1a]/15 rounded-2xl p-4 shadow-xl z-40 animate-scale-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setActiveTab(link.label);
                  setMobileMenuOpen(false);
                  scrollToSection(link.target);
                }}
                className={`text-sm font-semibold py-2 px-3 rounded-lg text-left transition-all ${
                  activeTab === link.label
                    ? "bg-[#1a3d1a]/5 text-[#1a3d1a]"
                    : "text-gray-600 hover:bg-[#1a3d1a]/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-[1px] bg-gray-100 my-1" />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection("contact");
              }}
              className="w-full bg-[#E86A10] hover:bg-[#d45e0d] text-white py-3 px-4 rounded-xl text-xs font-bold text-center shadow-md transition-all"
            >
              PRENDRE RDV
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
