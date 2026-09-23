import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, size: number, color: string) => void;
  onViewProduct: (product: Product) => void;
}

export function WishlistModal({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onQuickAdd,
  onViewProduct,
}: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-white">Meus Favoritos</h3>
            <span className="text-xs text-slate-400 font-mono">({wishlistProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">Você ainda não favoritou nenhum tênis.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Explorar Tênis
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onViewProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-blue-400 font-semibold uppercase">{product.categoryLabel}</span>
                    <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                    <div className="text-xs font-mono text-slate-300 font-bold mt-1">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onQuickAdd(product, product.sizes[1] || product.sizes[0], product.colorways[0].name);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Adicionar à sacola"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Comprar</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
