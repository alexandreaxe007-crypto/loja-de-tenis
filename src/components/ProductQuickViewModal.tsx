import { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}: ProductQuickViewModalProps) {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorways[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const images = product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/70 hover:bg-slate-800 rounded-full transition-colors cursor-pointer border border-slate-700/60"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-8">
          
          {/* Gallery Column (Sticky left on desktop) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail switcher */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-blue-500 ring-2 ring-blue-500/40'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Tech highlights */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Destaques da Construção
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {product.techHighlights.map((tech, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contiguous Purchase Module (Right Column) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                <span className="text-blue-400">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.weight}</span>
                <span aria-hidden="true">·</span>
                <span>Drop {product.drop}</span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">
                {product.name}
              </h2>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} avaliações de atletas)</span>
              </div>

              {/* Price baseline */}
              <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white tabular-nums">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    10x de R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  ou R$ {(product.price * 0.95).toFixed(2).replace('.', ',')} via PIX
                </span>
              </div>

              {/* Colorways */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Cor:</span>
                  <span className="text-slate-400 font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colorways.map((cw) => (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColor(cw.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer ${
                        selectedColor === cw.name
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: cw.hex }}
                      />
                      <span>{cw.name.split('/')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Tamanho (BR):</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Não sabe o tamanho?
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer tabular-nums ${
                        selectedSize === sz
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity stepper */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-slate-300 font-medium">Quantidade:</span>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 active:scale-98 transition-all cursor-pointer text-sm"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar à Sacola · R$ {(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Envio expresso para todo BR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>30 dias de troca grátis</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
