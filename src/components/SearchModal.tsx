import { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  const quickTags = ['Carbono', 'Corrida', 'Streetwear', 'Trilha', 'Maratona', 'Amortecimento'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.techHighlights.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por modelo, tecnologia ou modalidade..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-300 mr-1"
            >
              Limpar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0">Sugestões:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-10 text-center text-xs text-slate-400">
              Digite algo para buscar em todo o catálogo Kinetix.
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400">
              Nenhum tênis encontrado para "{query}". Tente buscar por "Carbono" ou "Corrida".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700 flex items-center justify-between gap-3 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div>
                    <div className="text-[11px] text-blue-400 uppercase font-semibold">{product.categoryLabel}</div>
                    <div className="text-sm font-bold text-white">{product.name}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{product.subtitle}</div>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-3">
                  <div>
                    <div className="text-sm font-bold text-white tabular-nums">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-emerald-400">10x sem juros</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
