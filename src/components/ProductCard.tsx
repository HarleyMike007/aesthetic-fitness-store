import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { Ruler, ShoppingCart, Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: ProductSize, color: string) => void;
  onOpenFitGuide: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenFitGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[2] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');

  return (
    <div className="bg-[#111115] border border-[#22222B] hover:border-[#FF2A54]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group">
      {/* Top Media & Badges */}
      <div className="relative bg-[#17171E] aspect-[4/5] flex items-center justify-center overflow-hidden p-6">
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-[#FF2A54] text-white font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md">
              {product.badge}
            </span>
          )}
          {product.techBadge && (
            <span className="bg-[#08080A]/80 backdrop-blur-md text-[#00F0FF] border border-[#00F0FF]/30 font-mono text-[10px] px-2 py-0.5 rounded">
              {product.techBadge}
            </span>
          )}
        </div>

        <button
          onClick={onOpenFitGuide}
          className="absolute top-4 right-4 z-10 bg-[#08080A]/80 hover:bg-[#08080A] text-gray-300 hover:text-white p-2 rounded-full border border-[#22222B] transition"
          title="Open V-Taper Fit Guide"
        >
          <Ruler className="w-4 h-4" />
        </button>

        {/* Dynamic Mockup Graphic Container */}
        <div className="w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-105">
          <div className="w-36 h-48 rounded-2xl bg-gradient-to-br from-[#20202a] to-[#0d0d12] border border-[#2b2b3a] flex flex-col items-center justify-center p-4 relative shadow-inner">
            <span className="font-headline text-5xl text-[#FF2A54] font-extrabold tracking-widest opacity-80">
              V
            </span>
            <span className="text-[9px] font-mono text-gray-400 mt-2 uppercase tracking-widest text-center">
              {selectedColor}
            </span>
            <div className="absolute inset-x-4 bottom-3 h-0.5 bg-gradient-to-r from-transparent via-[#FF2A54] to-transparent"></div>
          </div>
        </div>

        {/* Hover Quick Add Action */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onAddToCart(product, selectedSize, selectedColor)}
            className="w-full bg-[#FF2A54] hover:bg-[#E01B42] text-white font-headline text-lg py-2.5 rounded-xl tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>QUICK ADD — ${product.price}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
            <span className="uppercase">{product.subtitle}</span>
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <h3 className="text-2xl font-headline tracking-wide text-white group-hover:text-[#FF2A54] transition">
            {product.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Color Swatches, Size Selector & Price */}
        <div className="mt-4 pt-4 border-t border-[#22222B]/80">
          {/* Swatches */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    selectedColor === c.name
                      ? 'ring-2 ring-[#FF2A54] scale-110'
                      : 'border border-[#22222B] hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-gray-400">{selectedColor}</span>
          </div>

          {/* Sizes */}
          <div className="flex items-center gap-1.5 mb-4 font-mono text-xs">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`flex-1 py-1.5 rounded-lg border transition ${
                  selectedSize === s
                    ? 'bg-[#FF2A54] text-white font-bold border-[#FF2A54]'
                    : 'bg-[#08080A] text-gray-300 border-[#22222B] hover:border-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 line-through">${product.originalPrice}.00</span>
              <span className="text-2xl font-headline text-white tracking-wide ml-1.5">
                ${product.price}.00
              </span>
            </div>
            <button
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="px-5 py-2.5 bg-[#FF2A54] hover:bg-[#E01B42] text-white font-headline text-base tracking-wider rounded-xl transition flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
