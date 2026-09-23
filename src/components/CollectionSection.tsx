import { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CollectionSectionProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: number, color: string) => void;
}

export function CollectionSection({
  products,
  wishlistIds,
  onToggleWishlist,
  onViewProduct,
  onQuickAdd,
}: CollectionSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'todos', label: 'Todos os Modelos' },
    { id: 'corrida', label: 'Corrida Pro' },
    { id: 'street', label: 'Streetwear' },
    { id: 'trilha', label: 'Trilha & Outdoor' },
    { id: 'treino', label: 'Treino & Gym' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'todos') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <section id="colecao" className="py-16 sm:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Engenharia & Silhuetas
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A COLEÇÃO KINETIX 2026
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Cada par é projetado para biomecânica máxima, combinando amortecimento dinâmico, retorno de energia e durabilidade intransigente.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-white">Mais Populares</option>
              <option value="price-asc" className="bg-slate-900 text-white">Menor Preço</option>
              <option value="price-desc" className="bg-slate-900 text-white">Maior Preço</option>
              <option value="rating" className="bg-slate-900 text-white">Melhor Avaliados</option>
            </select>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 3-column desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                onViewProduct={onViewProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-900/40 rounded-xl border border-slate-800">
            <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold">Nenhum modelo encontrado nesta categoria.</p>
            <button
              onClick={() => setActiveCategory('todos')}
              className="mt-3 text-xs text-blue-400 hover:underline cursor-pointer"
            >
              Ver todos os modelos
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
