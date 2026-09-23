import { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, QrCode, CreditCard, ShieldCheck, Copy, Check, Truck, ArrowLeft, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string;
  onClearCart: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onClearCart,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<'dados' | 'pagamento' | 'sucesso'>('dados');
  const [copiedPix, setCopiedPix] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(11) 98765-4321',
    cep: '01310-100',
    address: 'Av. Paulista',
    number: '1578',
    complement: 'Apt 82',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    paymentMethod: 'pix' as 'pix' | 'cartao',
    cardNumber: '•••• •••• •••• 4829',
    cardName: 'CARLOS MENDES',
    cardExpiry: '08/29',
    cardCvv: '382',
    installments: '1',
  });

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? rawSubtotal * 0.10 : 0;
  const shippingFee = rawSubtotal >= 399 ? 0 : 24.90;
  
  // Extra 5% if PIX
  const isPix = formData.paymentMethod === 'pix';
  const pixDiscount = isPix ? (rawSubtotal - discountAmount) * 0.05 : 0;
  const finalTotal = rawSubtotal - discountAmount - pixDiscount + shippingFee;

  const pixPayload = `00020126580014BR.GOV.BCB.PIX0136kinetix-pay@kinetixlab.com520400005303986540${finalTotal.toFixed(2)}5802BR5916KINETIX FOOTWEAR6009SAO PAULO62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleConfirmOrder = () => {
    setStep('sucesso');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              {step === 'sucesso' ? 'Pedido Confirmado' : 'Finalizar Compra Segura'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          
          {/* Progress Steps */}
          {step !== 'sucesso' && (
            <div className="flex items-center justify-center gap-3 mb-6 text-xs">
              <span className={`font-semibold ${step === 'dados' ? 'text-blue-400' : 'text-slate-400'}`}>
                1. Entrega
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className={`font-semibold ${step === 'pagamento' ? 'text-blue-400' : 'text-slate-400'}`}>
                2. Pagamento
              </span>
            </div>
          )}

          {/* STEP 1: DADOS DE ENTREGA */}
          {step === 'dados' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('pagamento');
              }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Dados Pessoais & Contato
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">E-mail para Rastreio *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">WhatsApp / Telefone *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider pt-2">
                Endereço de Entrega
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">CEP *</label>
                  <input
                    type="text"
                    required
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Logradouro *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Complemento</label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Estado (UF)</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-blue-600/20"
                >
                  <span>Ir para o Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAGAMENTO */}
          {step === 'pagamento' && (
            <div className="space-y-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                  className={`flex-1 p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'pix'
                      ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">PIX (5% OFF)</span>
                  <span className="text-[10px] text-emerald-400">Aprovação imediata</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cartao' })}
                  className={`flex-1 p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'cartao'
                      ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500/40'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold">Cartão de Crédito</span>
                  <span className="text-[10px] text-slate-400">Até 10x sem juros</span>
                </button>
              </div>

              {/* PIX Details */}
              {formData.paymentMethod === 'pix' && (
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/50 space-y-4 text-center">
                  <div className="text-xs text-emerald-400 font-semibold">
                    Economize R$ {pixDiscount.toFixed(2).replace('.', ',')} pagando via PIX
                  </div>

                  {/* Simulated QR Code SVG */}
                  <div className="w-40 h-40 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="25" height="25" fill="black" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="black" />

                      <rect x="65" y="10" width="25" height="25" fill="black" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="black" />

                      <rect x="10" y="65" width="25" height="25" fill="black" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="black" />

                      <rect x="40" y="20" width="6" height="6" fill="black" />
                      <rect x="50" y="30" width="8" height="8" fill="black" />
                      <rect x="42" y="45" width="16" height="16" fill="black" />
                      <rect x="65" y="45" width="10" height="10" fill="black" />
                      <rect x="40" y="70" width="8" height="15" fill="black" />
                      <rect x="55" y="65" width="12" height="8" fill="black" />
                      <rect x="75" y="75" width="15" height="15" fill="black" />
                    </svg>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyPix}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Código PIX Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-200" />
                        <span>Copiar Código Pix Copia e Cola</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-400">
                    Abra o app do seu banco &gt; Escolha Pix Copia e Cola &gt; Cole o código para pagar
                  </div>
                </div>
              )}

              {/* Credit Card Details */}
              {formData.paymentMethod === 'cartao' && (
                <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nome no Cartão</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Validade</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVV</label>
                      <input
                        type="text"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Parcelamento</label>
                    <select
                      value={formData.installments}
                      onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      <option value="1">1x de R$ {finalTotal.toFixed(2).replace('.', ',')} sem juros</option>
                      <option value="3">3x de R$ {(finalTotal / 3).toFixed(2).replace('.', ',')} sem juros</option>
                      <option value="6">6x de R$ {(finalTotal / 6).toFixed(2).replace('.', ',')} sem juros</option>
                      <option value="10">10x de R$ {(finalTotal / 10).toFixed(2).replace('.', ',')} sem juros</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Total dos produtos ({items.length} itens):</span>
                  <span className="font-mono text-slate-200">R$ {rawSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Cupom {appliedCoupon}:</span>
                    <span className="font-mono">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                {isPix && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto PIX (5%):</span>
                    <span className="font-mono">- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Frete para {formData.city}:</span>
                  <span className="font-mono text-emerald-400">{shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-slate-800">
                  <span>Total Final:</span>
                  <span className="font-mono text-blue-400 text-base">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('dados')}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>

                <button
                  onClick={handleConfirmOrder}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 active:scale-98 transition-all cursor-pointer"
                >
                  Confirmar e Finalizar Pedido
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCESSO DO PEDIDO */}
          {step === 'sucesso' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-semibold text-blue-400">PEDIDO #KX-92841</span>
                <h3 className="text-2xl font-bold text-white mt-1">Parabéns, {formData.name.split(' ')[0]}!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Seu pedido foi registrado em nosso centro de distribuição. Enviamos os detalhes do rastreamento para o e-mail <strong>{formData.email}</strong>.
                </p>
              </div>

              {/* Delivery ETA card */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>Previsão de Entrega: 2 a 4 dias úteis</span>
                </div>
                <div className="text-slate-400">
                  Destino: {formData.address}, {formData.number} - {formData.city}, {formData.state}
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-900 font-mono">
                  Código de Rastreio Inicial: BR-KNX-827491-SP
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/25"
                >
                  Continuar Navegando
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
