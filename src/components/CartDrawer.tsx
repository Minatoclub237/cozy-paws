import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import React, { useState } from "react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    if (promoCode.trim().toUpperCase() === "COZYPAWS10") {
      setDiscountPercent(10);
      setPromoSuccess("Remise de 10 % appliquée !");
    } else if (promoCode.trim().toUpperCase() === "FREEPET") {
      setDiscountPercent(20);
      setPromoSuccess("Remise spéciale de 20 % appliquée !");
    } else {
      setPromoError("Code invalide. Essayez 'COZYPAWS10' ou 'FREEPET' !");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  const triggerCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1500);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutComplete(false);
    setPromoCode("");
    setDiscountPercent(0);
    setPromoSuccess("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#EFFDF0] border-l-2 border-[#1a3d1a] shadow-2xl flex flex-col h-full animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1a3d1a]/15 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1a3d1a]" />
              <h2 className="text-lg font-bold text-[#1a3d1a] tracking-tight">Votre Panier Douillet</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-[#1a3d1a]/70 hover:text-[#1a3d1a] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutComplete ? (
            /* Checkout Success State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <div className="w-16 h-16 bg-[#EFFDF0] border-2 border-[#1a3d1a] rounded-full flex items-center justify-center mb-6 animate-scale-in">
                <ShieldCheck className="w-8 h-8 text-[#1a3d1a]" />
              </div>
              <h3 className="text-2xl font-serif-display text-[#1a3d1a] mb-2">Commande Confirmée !</h3>
              <p className="text-gray-600 text-sm max-w-xs mb-8">
                Hourra ! Vos animaux vont adorer. Votre commande a été passée avec succès et sera préparée avec amour.
              </p>
              <button
                onClick={handleReset}
                className="w-full max-w-xs py-3 px-6 bg-[#E86A10] hover:bg-[#d45e0d] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            /* Main Cart Content */
            <div className="flex-1 flex flex-col min-h-0">
              {cartItems.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/50">
                  <ShoppingBag className="w-16 h-16 text-[#1a3d1a]/25 mb-4 stroke-[1.5]" />
                  <p className="text-[#1a3d1a] font-semibold text-base">Votre panier est vide</p>
                  <p className="text-gray-500 text-sm mt-1 max-w-[200px]">Ajoutez des produits douillets pour faire le bonheur de vos compagnons !</p>
                </div>
              ) : (
                /* Active Cart Items */
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  <div className="bg-[#1a3d1a]/5 rounded-xl p-3 text-center text-xs font-semibold text-[#1a3d1a]">
                    {subtotal >= 50 ? (
                      "🎉 Vous avez débloqué la livraison premium gratuite !"
                    ) : (
                      `Ajoutez ${(50 - subtotal).toFixed(2)} $ de plus pour la livraison premium GRATUITE !`
                    )}
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border border-[#1a3d1a]/10 p-3 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-[#EFFDF0]" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#1a3d1a] text-sm truncate">{item.name}</h4>
                          <p className="text-[#E86A10] text-xs font-bold mt-0.5">{item.price.toFixed(2)} $</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-[#EFFDF0] border border-[#1a3d1a]/10 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 rounded-md hover:bg-white text-[#1a3d1a]/70 hover:text-[#1a3d1a] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-[#1a3d1a] min-w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 rounded-md hover:bg-white text-[#1a3d1a]/70 hover:text-[#1a3d1a] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary and Promo code (Only visible if items exist) */}
              {cartItems.length > 0 && (
                <div className="border-t border-[#1a3d1a]/15 bg-white p-6 space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Code promo (COZYPAWS10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#1a3d1a]/15 rounded-lg outline-none focus:border-[#1a3d1a] text-[#1a3d1a]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Appliquer
                    </button>
                  </form>
                  {promoError && <p className="text-xs font-semibold text-red-500">{promoError}</p>}
                  {promoSuccess && <p className="text-xs font-semibold text-[#1a3d1a]">{promoSuccess}</p>}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-sm font-medium text-gray-600">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="text-[#1a3d1a]">{subtotal.toFixed(2)} $</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#1a3d1a]">
                        <span>Remise code promo ({discountPercent}%)</span>
                        <span>-{discountAmount.toFixed(2)} $</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span className="text-[#1a3d1a]">{shipping === 0 ? "GRATUIT" : `${shipping.toFixed(2)} $`}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#1a3d1a] pt-2 border-t border-[#1a3d1a]/10">
                      <span>Total</span>
                      <span className="text-[#E86A10]">{total.toFixed(2)} $</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={triggerCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3 bg-[#E86A10] hover:bg-[#d45e0d] disabled:bg-[#E86A10]/50 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        <span>Traitement de la commande...</span>
                      </div>
                    ) : (
                      <>
                        <span>Paiement sécurisé</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
