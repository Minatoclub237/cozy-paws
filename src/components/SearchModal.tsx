import { Search, X, ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";
import { CartItem } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

const SUGGESTED_ITEMS = [
  {
    id: "cozy-cat-house",
    name: "Maison Douillette pour Chat",
    price: 49.99,
    rating: 4.8,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png",
    category: "Mobilier"
  },
  {
    id: "dog-wool-sweater",
    name: "Pull Sherpa pour Chien",
    price: 29.99,
    rating: 4.9,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png",
    category: "Vêtements"
  },
  {
    id: "luxury-scratching-post",
    name: "Griffoir en Sisal Premium",
    price: 34.99,
    rating: 4.7,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png",
    category: "Jouets"
  },
  {
    id: "plush-orthopedic-bed",
    name: "Lit Orthopédique Douillet",
    price: 59.99,
    rating: 5.0,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024",
    category: "Lits"
  }
];

export default function SearchModal({ isOpen, onClose, onAddToCart }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredItems = SUGGESTED_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-[#EFFDF0] border-2 border-[#1a3d1a] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10 animate-scale-in">
        <div className="p-4 border-b border-[#1a3d1a]/10 flex items-center gap-3 bg-white">
          <Search className="text-[#1a3d1a] w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher des produits, marques, guides..."
            className="flex-1 bg-transparent border-none outline-none text-[#1a3d1a] font-medium text-lg placeholder-[#1a3d1a]/50"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-[#1a3d1a]/70 hover:text-[#1a3d1a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searchQuery === "" ? (
            <div>
              <p className="text-xs font-semibold text-[#1a3d1a]/60 uppercase tracking-wider mb-3">Recherches Populaires</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Maison pour Chat", "Griffoir Sisal", "Pull pour Chien", "Lit Orthopédique", "Cataire", "Jouets Premium"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-[#1a3d1a]/15 text-sm font-medium text-[#1a3d1a] hover:bg-[#1a3d1a] hover:text-[#EFFDF0] transition-all rounded-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold text-[#1a3d1a]/60 uppercase tracking-wider mb-3">Recommandé Pour Vous</p>
              <div className="space-y-3">
                {SUGGESTED_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#1a3d1a]/10 hover:border-[#1a3d1a]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-[#EFFDF0]" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#1a3d1a]">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#E86A10] font-bold text-xs">{item.price.toFixed(2)} $</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-500 text-xs flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-[#E86A10] text-[#E86A10]" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onAddToCart(item);
                        onClose();
                      }}
                      className="p-2 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-[#1a3d1a]/60 uppercase tracking-wider mb-3">
                Résultats de Recherche ({filteredItems.length})
              </p>
              {filteredItems.length > 0 ? (
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#1a3d1a]/10 hover:border-[#1a3d1a]/30 transition-all animate-fade-up">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-[#EFFDF0]" />
                        <div>
                          <h4 className="font-semibold text-sm text-[#1a3d1a]">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[#E86A10] font-bold text-xs">{item.price.toFixed(2)} $</span>
                            <span className="text-gray-400 text-xs">•</span>
                            <span className="text-xs px-2 py-0.5 bg-[#EFFDF0] text-[#1a3d1a] font-medium rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onAddToCart(item);
                          onClose();
                        }}
                        className="p-2 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Ajouter
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#1a3d1a]/70 font-medium mb-1">Aucun produit ne correspond à "{searchQuery}"</p>
                  <p className="text-xs text-gray-500">Essayez de vérifier l'orthographe ou recherchez "Chat" ou "Chien".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
