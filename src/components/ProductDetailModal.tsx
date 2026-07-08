import { X, Star, ShoppingCart, Heart, Shield, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";
import { CartItem, FavoriteItem } from "../types";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity"> & { category?: string }) => void;
  onToggleFavorite: (item: FavoriteItem) => void;
  isFavorite: boolean;
}

export default function ProductDetailModal({
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite
}: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState("Crème Chaleureuse");
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const product = {
    id: "cozy-cat-house",
    name: "Maison Douillette pour Chat",
    price: 49.99,
    image: "https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png",
    rating: 4.8,
    reviewsCount: 142
  };

  const colors = [
    { name: "Crème Chaleureuse", value: "bg-amber-50 border-amber-200" },
    { name: "Vert Sauge", value: "bg-emerald-50 border-emerald-200" },
    { name: "Citrouille Corail", value: "bg-orange-50 border-orange-200" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-[#EFFDF0] border-2 border-[#1a3d1a] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative z-10 animate-scale-in flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 bg-white border border-[#1a3d1a]/15 rounded-full hover:bg-gray-100 text-[#1a3d1a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-6 relative">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[300px] w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-[#EFFDF0] border border-[#1a3d1a]/10 px-3 py-1 rounded-full text-xs font-semibold text-[#1a3d1a]">
            Création Artisanale
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-[#1a3d1a]/60 tracking-wider">Mobilier Premium pour Animaux</span>
            <h3 className="text-2xl font-serif-display text-[#1a3d1a] mt-1 leading-tight">{product.name}</h3>
            
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-[#E86A10]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E86A10]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-gray-400 text-xs">({product.reviewsCount} avis)</span>
            </div>

            <div className="text-2xl font-bold text-[#E86A10] mt-3">{product.price} $</div>

            <p className="text-gray-600 text-xs leading-relaxed mt-4">
              Conçue pour l'orthopédie thérapeutique des animaux, notre cabane signature pour chat utilise du bois massif de qualité supérieure issu de sources durables. Elle comprend un toit en feutre dense et respirant, avec un coussin intérieur lavable en laine à mémoire de forme.
            </p>

            {/* Pillow Insert Selector */}
            <div className="mt-5">
              <span className="text-xs font-semibold text-[#1a3d1a] block mb-2">Couleur du coussin intérieur :</span>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedColor === color.name
                        ? "border-[#1a3d1a] bg-white text-[#1a3d1a] shadow-sm scale-[1.03]"
                        : "border-gray-200 bg-white/50 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border border-black/5 ${color.name === "Crème Chaleureuse" ? "bg-amber-100" : color.name === "Vert Sauge" ? "bg-emerald-200" : "bg-orange-300"}`} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-y border-[#1a3d1a]/10 py-3 mt-5 text-[10px] text-gray-600 font-medium">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#1a3d1a]/70 shrink-0" />
                <span>Envoi gratuit dès 50 $</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#1a3d1a]/70 shrink-0" />
                <span>Bois massif sécurisé</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#1a3d1a]/70 shrink-0" />
                <span>Essai 30 j facile</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                onToggleFavorite({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  rating: product.rating,
                  reviewsCount: product.reviewsCount
                });
              }}
              className={`p-3 rounded-xl border border-[#1a3d1a]/15 flex items-center justify-center transition-all ${
                isFavorite
                  ? "bg-[#E86A10]/10 border-[#E86A10] text-[#E86A10]"
                  : "bg-white hover:bg-gray-50 text-[#1a3d1a]/70 hover:text-[#1a3d1a]"
              }`}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-[#E86A10]" : ""}`} />
            </button>

            <button
              onClick={() => {
                onAddToCart({
                  id: product.id,
                  name: `${product.name} (${selectedColor})`,
                  price: product.price,
                  image: product.image,
                  category: "Mobilier"
                });
                onClose();
              }}
              className="flex-1 py-3 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ajouter au panier douillet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
