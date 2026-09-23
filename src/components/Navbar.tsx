import { Search, ShoppingBag, Heart, HelpCircle } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
  onOpenWishlist: () => void;
}

export function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenSizeGuide,
  onOpenWishlist,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-white hover:text-blue-400 transition-colors uppercase select-none"
        >
          KINETIX
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#lancamentos"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
          >
            Lançamentos
          </a>
          <a
            href="#colecao"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
          >
            Coleção
          </a>
          <a
            href="#tecnologia"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
          >
            Tecnologia
          </a>
          <a
            href="#avaliacoes"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
          >
            Atletas & Reviews
          </a>
          <button
            onClick={onOpenSizeGuide}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Guia de Pisada</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Buscar tênis"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative cursor-pointer"
            aria-label="Ver favoritos"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-2 px-3.5 sm:px-4 rounded-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sacola</span>
            {cartCount > 0 && (
              <span className="bg-white text-blue-900 text-xs font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
