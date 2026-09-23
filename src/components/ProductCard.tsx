import { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: number, color: string) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onViewProduct,
  onQuickAdd,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [addedEffect, setAddedEffect] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize, product.colorways[0].name);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1500);
  };

  return (
    <div
      onClick={() => onViewProduct(product)}
      className="group bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Frame: 65-75% visual dominance */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quiet 1-line text status (No pill spam) */}
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider text-blue-400 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-blue-900/50 uppercase">
            Novo Lançamento
          </span>
        )}
        {!product.isNew && product.isBestseller && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider text-amber-400 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-900/50 uppercase">
            Mais Vendido
          </span>
        )}

        {/* Top-right wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-slate-950/70 text-slate-300 hover:text-white border border-slate-800'
          }`}
          aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Hover Quick Action bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg backdrop-blur-md border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalhes</span>
          </button>

          <button
            onClick={handleAdd}
            className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            {addedEffect ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Tam {selectedSize}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed category metadata with separator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-medium text-blue-400/90">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weight}</span>
          </div>

          <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Quick Size Pill Bar for Fast Selection */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span>Tamanhos disponíveis:</span>
            <span className="font-mono text-slate-300">{selectedSize} selecionado</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {product.sizes.slice(0, 6).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition-colors cursor-pointer tabular-nums ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 6 && (
              <span className="text-[10px] text-slate-500 pl-1">+{product.sizes.length - 6}</span>
            )}
          </div>
        </div>

        {/* Pricing Baseline */}
        <div className="pt-2 flex items-baseline justify-between border-t border-slate-800/80">
          <div>
            <div className="text-base font-bold text-white tabular-nums">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400">
              10x de R$ {(product.price / 10).toFixed(2).replace('.', ',')}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Comprar</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
