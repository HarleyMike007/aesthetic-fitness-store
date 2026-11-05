import React from 'react';
import { X, ShoppingBag, Truck, Trash2, Lock, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const freeShippingThreshold = 85;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = (freeShippingThreshold - subtotal).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#111115] border-l border-[#22222B] flex flex-col justify-between shadow-2xl z-10 h-full">
        {/* Header */}
        <div className="p-6 border-b border-[#22222B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF2A54]" />
            <h3 className="text-2xl font-headline tracking-wide text-white">YOUR DROP CART</h3>
            <span className="text-xs font-mono bg-[#FF2A54]/20 text-[#FF2A54] px-2 py-0.5 rounded border border-[#FF2A54]/30">
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Goal Tracker */}
        <div className="px-6 py-3.5 bg-[#17171E] border-b border-[#22222B]">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-400 font-bold">🎉 UNLOCKED: FREE GLOBAL SHIPPING!</span>
            ) : (
              <span className="text-gray-300">
                Add <strong className="text-[#FF2A54]">${diffToFree}</strong> for FREE Shipping!
              </span>
            )}
            <Truck className="w-4 h-4 text-[#FF2A54]" />
          </div>
          <div className="w-full bg-[#08080A] h-2 rounded-full overflow-hidden border border-[#22222B]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                subtotal >= freeShippingThreshold
                  ? 'bg-emerald-400'
                  : 'bg-gradient-to-r from-[#FF2A54] to-amber-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-600" />
              <div className="font-headline text-2xl text-white">YOUR CART IS EMPTY</div>
              <p className="text-xs font-mono">Unlock your physique potential with our limited Drop 001.</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#FF2A54] text-white font-headline text-base rounded-xl"
              >
                EXPLORE PIECES
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="bg-[#08080A] border border-[#22222B] rounded-2xl p-4 flex gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#17171E] border border-[#22222B]/60 flex items-center justify-center font-headline text-[#FF2A54] text-2xl font-bold">
                    V
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm leading-tight">{item.title}</div>
                    <div className="text-[11px] font-mono text-gray-400">
                      Color: {item.color} • Size: {item.size}
                    </div>
                    <div className="text-xs font-mono text-[#FF2A54] font-bold mt-1">
                      ${item.price}.00
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-gray-500 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center bg-[#111115] border border-[#22222B] rounded-lg font-mono text-xs">
                    <button
                      onClick={() => onUpdateQty(item.cartId, -1)}
                      className="px-2 py-0.5 text-gray-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.cartId, 1)}
                      className="px-2 py-0.5 text-gray-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        <div className="p-6 border-t border-[#22222B] bg-[#08080A] space-y-4">
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-gray-400">
              <span>SUBTOTAL</span>
              <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>POD DISPATCH & TAXES</span>
              <span className="text-emerald-400 font-bold">CALCULATED AT CHECKOUT</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-[#FF2A54] hover:bg-[#E01B42] disabled:opacity-50 text-white font-headline text-2xl tracking-wider rounded-xl transition duration-300 shadow-lg shadow-[#FF2A54]/30 flex items-center justify-center gap-3"
          >
            <Lock className="w-5 h-5" />
            <span>PROCEED TO SECURE CHECKOUT</span>
          </button>

          <div className="flex items-center justify-center gap-3 text-gray-400 text-xs font-mono pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL 256-Bit
            </span>
            <span>•</span>
            <span>Zero Inventory Automated POD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
