import { X, Star, ShoppingCart, Search, Heart } from "lucide-react";
import { useState } from "react";
import { CartItem, FavoriteItem } from "../types";

interface ExploreProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
  onToggleFavorite: (item: FavoriteItem) => void;
  favorites: FavoriteItem[];
}

const ALL_PRODUCTS = [
  {
    id: "cozy-cat-house",
    name: "Maison Douillette pour Chat",
    price: 49.99,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png",
    category: "Mobilier",
    rating: 4.8,
    reviewsCount: 142
  },
  {
    id: "dog-wool-sweater",
    name: "Pull Sherpa pour Chien",
    price: 29.99,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png",
    category: "Vêtements",
    rating: 4.9,
    reviewsCount: 94
  },
  {
    id: "luxury-scratching-post",
    name: "Griffoir en Sisal Premium",
    price: 34.99,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png",
    category: "Jouets",
    rating: 4.7,
    reviewsCount: 76
  },
  {
    id: "plush-orthopedic-bed",
    name: "Lit Orthopédique Douillet",
    price: 59.99,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024",
    category: "Lits",
    rating: 5.0,
    reviewsCount: 210
  }
];

export default function ExploreProductsModal({
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  favorites
}: ExploreProductsModalProps) {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const categories = ["Tout", "Mobilier", "Vêtements", "Jouets", "Lits"];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "Tout" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-[#EFFDF0] border-2 border-[#1a3d1a] rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl relative z-10 flex flex-col animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-[#1a3d1a]/10 bg-white flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif-display text-[#1a3d1a]">Vitrine CozyPaws</h3>
              <p className="text-xs text-gray-500 mt-0.5">Choisissez parmi des accessoires de qualité supérieure pour vos compagnons</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs and search bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#1a3d1a] text-white"
                      : "bg-[#EFFDF0] border border-[#1a3d1a]/10 text-[#1a3d1a] hover:bg-[#1a3d1a]/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans la vitrine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#EFFDF0] border border-[#1a3d1a]/15 rounded-lg outline-none focus:border-[#1a3d1a] text-[#1a3d1a] font-medium"
              />
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#EFFDF0]/50">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((item) => {
                const isFav = favorites.some((fav) => fav.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-xl border border-[#1a3d1a]/10 p-4 flex flex-col justify-between hover:shadow-md hover:border-[#1a3d1a]/20 transition-all group">
                    <div className="relative bg-[#EFFDF0]/50 rounded-lg p-3 flex items-center justify-center mb-3">
                      <img src={item.image} alt={item.name} className="h-32 w-auto object-contain transition-transform group-hover:scale-105 duration-300" />
                      <button
                        onClick={() => onToggleFavorite({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          rating: item.rating,
                          reviewsCount: item.reviewsCount
                        })}
                        className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all ${
                          isFav
                            ? "bg-[#E86A10]/15 border-[#E86A10]/30 text-[#E86A10]"
                            : "bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-[#E86A10]" : ""}`} />
                      </button>
                      <span className="absolute bottom-2 left-2 text-[10px] bg-white border border-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-500">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-[#1a3d1a] line-clamp-1">{item.name}</h4>
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500">
                        <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
                        <span className="font-semibold text-gray-700">{item.rating}</span>
                        <span>({item.reviewsCount} avis)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                      <span className="text-[#E86A10] font-bold text-sm">{item.price.toFixed(2)} $</span>
                      <button
                        onClick={() => onAddToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          category: item.category
                        })}
                        className="py-1.5 px-3 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">Aucun produit ne correspond à vos critères.</p>
              <button
                onClick={() => {
                  setActiveCategory("Tout");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-[#1a3d1a] underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
