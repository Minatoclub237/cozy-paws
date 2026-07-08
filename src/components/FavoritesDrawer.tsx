import { X, Heart, Star, ShoppingCart, Trash2 } from "lucide-react";
import { FavoriteItem, CartItem } from "../types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart
}: FavoritesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#EFFDF0] border-l-2 border-[#1a3d1a] shadow-2xl flex flex-col h-full animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1a3d1a]/15 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#E86A10] text-[#E86A10]" />
              <h2 className="text-lg font-bold text-[#1a3d1a] tracking-tight">Vos Favoris Enregistrés</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-[#1a3d1a]/70 hover:text-[#1a3d1a] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Heart className="w-16 h-16 text-[#1a3d1a]/25 mb-4 stroke-[1.5]" />
                <p className="text-[#1a3d1a] font-semibold text-base">Aucun favori pour l'instant</p>
                <p className="text-gray-500 text-sm mt-1 max-w-[200px]">Enregistrez des articles en cliquant sur les détails douillets ou les étoiles !</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-[#1a3d1a]/10 p-3 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-[#EFFDF0]" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#1a3d1a] text-sm truncate">{item.name}</h4>
                      
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
                        <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
                        <span className="text-gray-400 text-xs">({item.reviewsCount} avis)</span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#E86A10] text-sm font-bold">{item.price.toFixed(2)} $</span>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              onAddToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image
                              });
                              onRemoveFavorite(item.id);
                            }}
                            className="p-1.5 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                            title="Ajouter au panier"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Ajouter</span>
                          </button>
                          
                          <button
                            onClick={() => onRemoveFavorite(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer des favoris"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
