import { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onApplyCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(appliedCoupon ? true : false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 399.0;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountPercent = appliedCoupon ? 0.10 : 0;
  const discountAmount = rawSubtotal * discountPercent;
  const finalSubtotal = rawSubtotal - discountAmount;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput.trim().toUpperCase());
    if (ok) {
      setCouponSuccess(true);
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Experimente VORTEX10');
      setCouponSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white">Sua Sacola de Compras</h2>
              <span className="text-xs text-slate-400 font-mono">({items.reduce((a, b) => a + b.quantity, 0)} itens)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Gauge */}
          <div className="p-4 bg-slate-950/60 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                {missingForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">Parabéns! Você ganhou Frete Grátis!</span>
                ) : (
                  <span className="text-slate-300">
                    Faltam <strong className="text-white font-mono">R$ {missingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para frete grátis
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-slate-400">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  missingForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">Sua sacola está vazia.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Explorar Tênis
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl flex gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Remover produto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-0.5 space-x-1">
                        <span>Tam: <strong className="text-slate-200 font-mono">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{item.selectedColor.split('/')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900">
                      {/* Quantity stepper */}
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-white font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-white font-mono tabular-nums">
                          R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Cupom: VORTEX10"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {couponSuccess && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  <span>Cupom {appliedCoupon} aplicado com sucesso (-10%)</span>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-rose-400">{couponError}</div>
              )}

              {/* Totals Summary */}
              <div className="space-y-1.5 text-xs border-t border-slate-900 pt-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    R$ {rawSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto ({appliedCoupon})</span>
                    <span className="font-mono tabular-nums">
                      - R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Frete</span>
                  <span className="font-mono tabular-nums text-emerald-400">
                    {missingForFreeShipping === 0 ? 'GRÁTIS' : 'R$ 24,90'}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="font-mono text-base text-blue-400 tabular-nums">
                    R$ {(finalSubtotal + (missingForFreeShipping === 0 ? 0 : 24.90)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 active:scale-98 transition-all cursor-pointer text-sm"
              >
                <span>FINALIZAR PEDIDO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-500">
                Ambiente 100% seguro com criptografia SSL e garantia de troca grátis.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
