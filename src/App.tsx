import { useState, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionSection } from './components/CollectionSection';
import { TechSection } from './components/TechSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      product: PRODUCTS[0],
      selectedSize: 41,
      selectedColor: PRODUCTS[0].colorways[0].name,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['kinetix-nitro-x']));
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'favorite' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number, color: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${size}-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    addToast(`${product.name} (Tam ${size}) adicionado à sacola!`, 'success');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    addToast('Item removido da sacola.', 'info');
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'VORTEX10' || code === 'PRIMEIRACOMPRA') {
      setAppliedCoupon(code);
      addToast(`Cupom ${code} aplicado! 10% de desconto ativado.`, 'success');
      return true;
    }
    return false;
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast(`${product.name} removido dos favoritos.`, 'info');
      } else {
        next.add(product.id);
        addToast(`${product.name} adicionado aos favoritos!`, 'favorite');
      }
      return next;
    });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans">
      {/* 1. Announcement Bar */}
      <AnnouncementBar onCopyCoupon={(code) => addToast(`Cupom ${code} copiado! Use na sacola.`, 'info')} />

      {/* 2. Top Bar Contract Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section (Flagship Campaign) */}
        <HeroSection
          flagshipProduct={PRODUCTS[0]}
          onAddToCart={handleAddToCart}
          onViewProduct={(product) => setViewingProduct(product)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* 4. Full Filterable Collection Grid */}
        <CollectionSection
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onViewProduct={(product) => setViewingProduct(product)}
          onQuickAdd={(product, size, color) => handleAddToCart(product, size, color, 1)}
        />

        {/* 5. Technology & Sole Engineering Section */}
        <TechSection />

        {/* 6. Athlete Reviews & Social Proof */}
        <ReviewsSection />
      </main>

      {/* 7. Institutional Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <ProductQuickViewModal
        product={viewingProduct}
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setViewingProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        products={PRODUCTS}
        onSelectRecommended={(prod) => setViewingProduct(prod)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(prod) => setViewingProduct(prod)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickAdd={(product, size, color) => handleAddToCart(product, size, color, 1)}
        onViewProduct={(prod) => setViewingProduct(prod)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onClearCart={() => setCartItems([])}
      />

      {/* Real-time Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
