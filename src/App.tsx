/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import Header from "./components/Header";
import SearchModal from "./components/SearchModal";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import ProductDetailModal from "./components/ProductDetailModal";
import VideoPlayerModal from "./components/VideoPlayerModal";
import ExploreProductsModal from "./components/ExploreProductsModal";
import EmergencyModal from "./components/EmergencyModal";
import DirectCardSection from "./components/DirectCardSection";
import OrbisSection from "./components/OrbisSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { CartItem, FavoriteItem } from "./types";

function AnimatedTitle({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.15 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

export default function App() {
  // Pre-load items as requested by prompt (Cart with 1, Favorites with 4)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "dog-wool-sweater",
      name: "Pull Sherpa pour Chien",
      price: 29.99,
      image: "https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png",
      quantity: 1,
      category: "Vêtements"
    }
  ]);

  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "cozy-cat-house",
      name: "Maison Douillette pour Chat",
      price: 49.99,
      image: "https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png",
      rating: 4.8,
      reviewsCount: 142
    },
    {
      id: "dog-wool-sweater",
      name: "Pull Sherpa pour Chien",
      price: 29.99,
      image: "https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png",
      rating: 4.9,
      reviewsCount: 94
    },
    {
      id: "luxury-scratching-post",
      name: "Griffoir en Sisal Premium",
      price: 34.99,
      image: "https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png",
      rating: 4.7,
      reviewsCount: 76
    },
    {
      id: "plush-orthopedic-bed",
      name: "Lit Orthopédique Douillet",
      price: 59.99,
      image: "https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024",
      rating: 5.0,
      reviewsCount: 210
    }
  ]);

  // Modals & Drawers States
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [showHours, setShowHours] = useState(false);

  // Core Callbacks
  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleToggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => setCartItems([]);

  const isCatHouseFavorite = favorites.some((fav) => fav.id === "cozy-cat-house");

  return (
    <div className="w-full bg-[#EFFDF0] relative select-none">
      {/* =======================================================
          SECTION 1 — Hero (sticky; Section 2 scrolls up over it)
         ======================================================= */}
      <div className="sticky top-0 z-0 h-screen w-full flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Viewport Hero Section */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* =======================================================
            1. DESKTOP HERO LAYOUT (lg+)
           ======================================================= */}
        <div className="hidden lg:flex flex-1 flex-col relative overflow-hidden w-full h-full">
          {/* Text Layer (z-20) */}
          <div className="relative z-20 text-center px-12 pt-[1.8rem]">
            <AnimatedTitle
              text="Des soins attentionnés pour vos compagnons"
              className="font-serif-display text-[#1a3d1a] text-[clamp(32px,4vw,64px)] leading-[1.1] tracking-tight flex flex-wrap justify-center text-center max-w-4xl mx-auto"
            />
          </div>


          {/* Bottom 3 Images: absolute z-10 overlapping text */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end no-gaps w-full pointer-events-none">
            {/* Left Image */}
            <div className="flex-1 h-[min(54vh,42vw)] relative animate-photo-reveal delay-700">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
                alt="Pet Left"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Stat Overlay Left */}
              <div 
                onClick={() => setShowHours(!showHours)}
                className="absolute bottom-0 left-0 right-0 h-[26%] lg:h-[24%] flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1000 cursor-pointer select-none group transition-all"
                title="Cliquer pour voir l'adresse et les horaires"
              >
                <div className="flex items-center justify-center gap-2 mb-1 lg:mb-2 group-hover:scale-105 transition-transform">
                  <span className="text-[#1a3d1a] font-sans text-2xl lg:text-3xl font-extrabold tracking-tight">98K+</span>
                  <div className="flex items-center -space-x-1.5">
                    <img
                      src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                      alt="Pet Avatar"
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border border-white object-cover"
                    />
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#1a3d1a] border border-white flex items-center justify-center text-white text-[9px] lg:text-[10px] font-extrabold">
                      +
                    </div>
                  </div>
                </div>
                <p className="text-[#1a3d1a]/90 text-[10px] lg:text-xs font-bold max-w-[160px] lg:max-w-[200px] leading-tight group-hover:text-[#E86A10] transition-colors">
                  Des clients et leurs compagnons <br /> qui nous ont trouvé ici
                </p>
                <span className="text-[8px] text-gray-400 mt-1 font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  📍 Cliquer pour voir les horaires
                </span>
              </div>

              {/* Popover with hours and address */}
              {showHours && (
                <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 xl:left-8 xl:translate-x-0 z-50 pointer-events-auto">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#1a3d1a]/15 p-4 shadow-xl text-left w-[290px] text-xs text-[#1a3d1a] relative animate-scale-in">
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 xl:left-16 w-5 h-5 bg-white/95 border-r-2 border-b-2 border-[#1a3d1a]/15 rotate-45" />
                    
                    {/* Popover Content */}
                    <div className="flex items-start justify-between border-b border-[#1a3d1a]/10 pb-2 mb-2">
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#E86A10] font-bold text-sm mt-0.5">📍</span>
                        <div>
                          <h4 className="font-extrabold text-xs text-[#1a3d1a] uppercase tracking-wider">Notre Cabinet</h4>
                          <p className="text-gray-500 text-[10px] leading-tight font-medium mt-0.5">8 Av. Antonia Augusta, 06000 Nice, France</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowHours(false); }}
                        className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-1.5 font-semibold text-[11px] text-gray-700">
                      <div className="flex justify-between items-center bg-red-50 text-red-700 px-2 py-1 rounded-lg">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                          Statut Actuel
                        </span>
                        <span className="font-extrabold text-[10px] uppercase">Fermé</span>
                      </div>
                      
                      <div className="flex justify-between px-1">
                        <span>Lundi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between px-1 text-[#E86A10] bg-[#EFFDF0] py-0.5 rounded">
                        <span>Mardi (14 juillet)</span>
                        <span className="text-right font-bold">09:00–12:00, 15:00–19:00 *</span>
                      </div>
                      <div className="flex justify-between px-1">
                        <span>Mercredi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between px-1">
                        <span>Jeudi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between px-1">
                        <span>Vendredi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between px-1">
                        <span>Samedi</span>
                        <span className="text-gray-600 font-medium">09:00–16:00</span>
                      </div>
                      <div className="flex justify-between px-1 text-gray-400">
                        <span>Dimanche</span>
                        <span>Fermé</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#1a3d1a]/5 text-[9px] text-gray-400 italic leading-snug">
                      * Fête Nationale du 14 juillet - Les horaires peuvent être différents
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Image (tallest, wider) */}
            <div className="flex-[1.265] h-[min(65vh,51vw)] relative z-10 animate-photo-reveal delay-600">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
                alt="Pet Center"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Heading and Action Pill Center Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[26%] lg:h-[24%] flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1100">
                <h3 className="text-white font-sans text-xs lg:text-sm xl:text-base font-extrabold tracking-tight uppercase mb-2 lg:mb-3 max-w-[180px] lg:max-w-[240px] leading-tight drop-shadow-sm">
                  Une urgence avec <br /> votre compagnon ?
                </h3>
                <button
                  onClick={() => setEmergencyOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 lg:px-5 lg:py-2 rounded-full text-[10px] lg:text-xs font-black tracking-widest shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer border border-white/25 animate-pulse"
                >
                  <span>URGENCES</span>
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-2.5 h-2.5 text-white animate-pulse" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 h-[min(54vh,42vw)] relative animate-photo-reveal delay-800">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
                alt="Pet Right"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Rating Overlay Right */}
              <div className="absolute bottom-4 left-0 right-0 flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1200">
                <a
                  href="https://share.google/Lw017LI4gixVUO6F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-[#1a3d1a] border-2 border-[#1a3d1a]/15 shadow-lg rounded-2xl p-3.5 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 duration-200 max-w-[240px] w-full"
                >
                  <svg className="w-9 h-9 shrink-0" viewBox="0 0 24 24">
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
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider leading-none">Google Rating</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-lg font-black text-[#1a3d1a] leading-none">4.7</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#E86A10] hover:underline mt-1 leading-none">
                      Voir les 282 avis
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            2. TABLET HERO LAYOUT (md to lg)
           ======================================================= */}
        <div className="hidden md:flex lg:hidden flex-1 flex-col relative overflow-hidden w-full h-full">
          {/* Text Layer (z-20) — vertically centered above the images */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-8 pb-[44vh]">
            <AnimatedTitle
              text="Des soins attentionnés pour vos compagnons"
              className="font-serif-display text-[#1a3d1a] text-5xl leading-[1.1] tracking-tight flex flex-wrap justify-center text-center max-w-2xl mx-auto"
            />
            <p className="mt-5 text-sm text-gray-500 font-medium max-w-md mx-auto leading-relaxed animate-fade-up delay-300">
              Notre service d'urgences vétérinaires est disponible 24h/24 et 7j/7 pour le bien-être de votre compagnon.
            </p>
          </div>


          {/* Bottom Images (maxHeight: 40vh / 48vh / 40vh) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end no-gaps w-full pointer-events-none">
            {/* Left Image */}
            <div className="flex-1 h-[42vh] relative animate-photo-reveal delay-700">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
                alt="Pet Left"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Stat Overlay Left */}
              <div 
                onClick={() => setShowHours(!showHours)}
                className="absolute bottom-0 left-0 right-0 h-[26%] flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1000 cursor-pointer select-none group transition-all"
                title="Cliquer pour voir l'adresse et les horaires"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1 group-hover:scale-105 transition-transform">
                  <span className="text-[#1a3d1a] font-sans text-xl font-extrabold tracking-tight">98K+</span>
                  <div className="flex items-center -space-x-1">
                    <img
                      src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                      alt="Pet Avatar"
                      className="w-4 h-4 rounded-full border border-white object-cover"
                    />
                    <div className="w-4 h-4 rounded-full bg-[#1a3d1a] border border-white flex items-center justify-center text-white text-[8px] font-extrabold">
                      +
                    </div>
                  </div>
                </div>
                <p className="text-[#1a3d1a]/90 text-[9px] font-bold max-w-[140px] leading-tight group-hover:text-[#E86A10] transition-colors">
                  Des clients et leurs compagnons <br /> qui nous ont trouvé ici
                </p>
                <span className="text-[7px] text-gray-400 mt-0.5 font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  📍 Horaires & Adresse
                </span>
              </div>

              {/* Popover for Tablet */}
              {showHours && (
                <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#1a3d1a]/15 p-3.5 shadow-xl text-left w-[260px] text-[11px] text-[#1a3d1a] relative animate-scale-in">
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-r-2 border-b-2 border-[#1a3d1a]/15 rotate-45" />
                    
                    {/* Popover Content */}
                    <div className="flex items-start justify-between border-b border-[#1a3d1a]/10 pb-1.5 mb-1.5">
                      <div className="flex items-start gap-1">
                        <span className="text-[#E86A10] font-bold text-xs">📍</span>
                        <div>
                          <h4 className="font-extrabold text-[11px] text-[#1a3d1a] uppercase tracking-wider">Notre Cabinet</h4>
                          <p className="text-gray-500 text-[9px] leading-tight font-medium mt-0.5 font-sans">8 Av. Antonia Augusta, 06000 Nice</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowHours(false); }}
                        className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors text-[10px]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-1 font-semibold text-[10px] text-gray-700">
                      <div className="flex justify-between items-center bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
                        <span className="flex items-center gap-1 text-[9px]">
                          <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                          Statut Actuel
                        </span>
                        <span className="font-extrabold text-[9px] uppercase">Fermé</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Lundi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between text-[#E86A10] bg-[#EFFDF0] px-0.5 rounded">
                        <span>Mardi (14 juil)</span>
                        <span className="font-bold">09:00–12:00, 15:00–19:00 *</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mercredi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jeudi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendredi</span>
                        <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span className="text-gray-600 font-medium">09:00–16:00</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Dimanche</span>
                        <span>Fermé</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-1 border-t border-[#1a3d1a]/5 text-[8px] text-gray-400 italic leading-snug">
                      * Les horaires peuvent être différents
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Image */}
            <div className="flex-[1.265] h-[52vh] relative z-10 animate-photo-reveal delay-600">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
                alt="Pet Center"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Overlay Action */}
              <div className="absolute bottom-0 left-0 right-0 h-[26%] flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1100">
                <h3 className="text-white font-sans text-xs font-extrabold tracking-tight uppercase mb-1.5 max-w-[150px] leading-tight drop-shadow-sm">
                  Une urgence avec <br /> votre compagnon ?
                </h3>
                <button
                  onClick={() => setEmergencyOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest shadow-md flex items-center gap-1 cursor-pointer border border-white/20 animate-pulse"
                >
                  <span>URGENCES</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-2 h-2 text-white animate-pulse" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 h-[42vh] relative animate-photo-reveal delay-800">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
                alt="Pet Right"
                className="w-full h-full block object-contain object-bottom"
              />
              {/* Overlay Rating */}
              <div className="absolute bottom-3 left-0 right-0 flex flex-col justify-center items-center text-center px-4 pointer-events-auto animate-scale-in delay-1200">
                <a
                  href="https://share.google/Lw017LI4gixVUO6F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-[#1a3d1a] border border-gray-200 shadow-md rounded-xl p-2.5 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 duration-200 max-w-[210px] w-full"
                >
                  <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
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
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Google Rating</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-sm font-black text-[#1a3d1a] leading-none">4.7</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-[#E86A10] hover:underline mt-0.5 leading-none">
                      Voir les 282 avis
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            3. MOBILE HERO LAYOUT (below md)
           ======================================================= */}
        <div className="flex md:hidden flex-1 flex-col justify-between pt-4 pb-0 select-none relative overflow-hidden w-full h-full">
          {/* Top Section */}
          <div className="text-center px-4 space-y-3 animate-fade-up">
            <AnimatedTitle
              text="Des soins attentionnés pour vos compagnons"
              className="font-serif-display text-3xl text-[#1a3d1a] leading-snug tracking-tight flex flex-wrap justify-center text-center max-w-xs mx-auto"
            />
            <p className="text-xs text-gray-500 font-medium max-w-[240px] mx-auto leading-normal">
              Notre service d'urgences vétérinaires est disponible 24h/24 et 7j/7 pour votre compagnon.
            </p>
            <button
              onClick={() => setEmergencyOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-xs font-black tracking-widest shadow-md flex items-center gap-1.5 mx-auto active:scale-95 transition-all cursor-pointer animate-pulse"
            >
              <span>URGENCES</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          </div>

          {/* Stats row */}
          <div 
            onClick={() => setShowHours(!showHours)}
            className="mx-4 px-4 py-2.5 bg-white/70 border border-[#1a3d1a]/15 rounded-xl backdrop-blur-sm flex items-center justify-between animate-fade-up delay-300 shadow-sm relative z-20 my-2 cursor-pointer select-none active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                  alt="User"
                  className="w-4 h-4 rounded-full border border-white"
                />
                <div className="w-4 h-4 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center text-[6px] font-bold border border-white">
                  +
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#1a3d1a]">98K+ animaux choyés</span>
            </div>
            
            <div className="h-3.5 w-[1px] bg-[#1a3d1a]/15" />

            <div className="flex items-center gap-1">
              <a
                href="https://share.google/Lw017LI4gixVUO6F1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm rounded px-1.5 py-0.5 transition-all text-[#1a3d1a] mr-1"
              >
                <span className="text-[#FBBC05] font-bold text-[9px] mr-0.5">★</span>
                <span className="text-[9px] font-black">4.7</span>
                <span className="text-[8px] text-gray-500 font-bold">(282)</span>
              </a>
              <span className="text-[8px] bg-[#E86A10] text-white px-1.5 py-0.5 rounded font-extrabold animate-pulse">📍 INFOS</span>
            </div>
          </div>

          {/* Popover for Mobile */}
          {showHours && (
            <div className="mx-4 z-30 animate-scale-in">
              <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#1a3d1a]/15 p-3.5 shadow-lg text-left text-xs text-[#1a3d1a]">
                <div className="flex items-start justify-between border-b border-[#1a3d1a]/10 pb-1.5 mb-1.5">
                  <div className="flex items-start gap-1">
                    <span className="text-[#E86A10] font-bold">📍</span>
                    <div>
                      <h4 className="font-extrabold text-[11px] text-[#1a3d1a] uppercase tracking-wider">Notre Cabinet</h4>
                      <p className="text-gray-500 text-[10px] leading-tight font-medium mt-0.5">8 Av. Antonia Augusta, Nice, France</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowHours(false); }}
                    className="text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1 font-semibold text-[10px] text-gray-700">
                  <div className="flex justify-between items-center bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
                    <span className="flex items-center gap-1 text-[9px]">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                      Statut Actuel
                    </span>
                    <span className="font-extrabold text-[9px] uppercase">Fermé</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Lundi</span>
                    <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                  </div>
                  <div className="flex justify-between text-[#E86A10] bg-[#EFFDF0] px-0.5 rounded">
                    <span>Mardi (14 juillet)</span>
                    <span className="font-bold">09:00–12:00, 15:00–19:00 *</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mercredi</span>
                    <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jeudi</span>
                    <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendredi</span>
                    <span className="text-gray-600 font-medium">09:00–12:00, 15:00–19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="text-gray-600 font-medium">09:00–16:00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-[#1a3d1a]/5 text-[8px] text-gray-400 italic leading-snug">
                  * Les horaires peuvent être différents
                </div>
              </div>
            </div>
          )}

          {/* Bottom 3 Images — all three pets visible & staggered, like desktop */}
          <div className="flex items-end justify-center w-full relative z-10 overflow-hidden mt-2 animate-photo-reveal delay-500 shrink-0 pointer-events-none">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
              alt="Pet Left"
              className="flex-1 min-w-0 h-[23vh] object-contain object-bottom"
            />
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
              alt="Pet Center"
              className="flex-[1.265] min-w-0 h-[29vh] object-contain object-bottom z-10"
            />
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
              alt="Pet Right"
              className="flex-1 min-w-0 h-[23vh] object-contain object-bottom"
            />
          </div>
        </div>

      </main>
      </div>
      {/* ===== end SECTION 1 ===== */}

      {/* =======================================================
          Interactive Modals, Drawers & Details
         ======================================================= */}
      
      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onClearCart={handleClearCart}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* Product Details Modal (Cat House card detail) */}
      <ProductDetailModal
        isOpen={productDetailOpen}
        onClose={() => setProductDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isCatHouseFavorite}
      />

      {/* TikTok/YouTube Review Video simulated player */}
      <VideoPlayerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      {/* Explore Products showcase modal */}
      <ExploreProductsModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />

      {/* Emergency info details modal */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

      {/* =======================================================
          SECTION 2 — Interactive Direct Card (covers Section 1)
         ======================================================= */}
      <DirectCardSection />

      {/* =======================================================
          SECTION 3 — Orbis (fullscreen background video)
         ======================================================= */}
      <OrbisSection />

      {/* =======================================================
          SECTION 4 — Testimonials (Google reviews)
         ======================================================= */}
      <TestimonialsSection />

      {/* =======================================================
          SECTION 5 — Contact form (liquid glass refraction)
         ======================================================= */}
      <ContactSection />

      {/* =======================================================
          SECTION 6 — Footer
         ======================================================= */}
      <Footer />
    </div>
  );
}
