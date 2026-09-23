import { useState } from 'react';
import { Product } from '../types';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Zap, Star } from 'lucide-react';

interface HeroSectionProps {
  flagshipProduct: Product;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onViewProduct: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export function HeroSection({
  flagshipProduct,
  onAddToCart,
  onViewProduct,
  onOpenSizeGuide,
}: HeroSectionProps) {
  const [selectedSize, setSelectedSize] = useState<number>(flagshipProduct.sizes[2] || 40);
  const [selectedColor, setSelectedColor] = useState<string>(flagshipProduct.colorways[0].name);

  const handleBuyNow = () => {
    onAddToCart(flagshipProduct, selectedSize, selectedColor);
  };

  return (
    <section id="lancamentos" className="relative pt-6 pb-16 lg:py-20 overflow-hidden border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial & Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed metadata (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span>Edição Limitada 2026</span>
              <span aria-hidden="true">·</span>
              <span>Placa de Carbono 3.0</span>
              <span aria-hidden="true">·</span>
              <span>195g Ultra-Leve</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              ENGRENADO PARA VELOCIDADE PURA.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Conheça o <strong className="text-white font-semibold">{flagshipProduct.name}</strong>. A fusão definitiva entre o retorno elástico da placa AeroBlade e o amortecimento por nitrogênio supercrítico. Feito para bater recordes.
            </p>

            {/* Rating line */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-200">4.9 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span>148 maratonistas e corredores avaliaram</span>
            </div>

            {/* Interactive Buy Configuration Box */}
            <div className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-5 shadow-2xl backdrop-blur-sm">
              {/* Price Row */}
              <div className="flex items-baseline justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">Preço de Lançamento</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tabular-nums">
                      R$ {flagshipProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-slate-500 line-through tabular-nums">
                      R$ {flagshipProduct.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-emerald-400">10x de R$ {(flagshipProduct.price / 10).toFixed(2).replace('.', ',')} sem juros</div>
                  <div className="text-[11px] text-slate-400">ou com 5% de desconto no PIX</div>
                </div>
              </div>

              {/* Colorways Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Cor Selecionada:</span>
                  <span className="text-slate-400 font-medium">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {flagshipProduct.colorways.map((cw) => {
                    const isSelected = selectedColor === cw.name;
                    return (
                      <button
                        key={cw.name}
                        onClick={() => setSelectedColor(cw.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: cw.hex }}
                        />
                        <span className="truncate max-w-[120px]">{cw.name.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Tamanho (BR):</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Guia de tamanhos & pisada
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {flagshipProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer tabular-nums ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                            : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-blue-600/30 active:scale-98 transition-all cursor-pointer text-sm"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>COMPRAR AGORA (Tam {selectedSize})</span>
                </button>
                <button
                  onClick={() => onViewProduct(flagshipProduct)}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-lg text-sm transition-colors border border-slate-700/60 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Ver Detalhes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium">Peso do Calçado</div>
                <div className="text-base font-bold text-white tabular-nums">195g</div>
                <div className="text-[10px] text-slate-500">Tamanho 41</div>
              </div>
              <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium">Drop Geométrico</div>
                <div className="text-base font-bold text-white tabular-nums">8 mm</div>
                <div className="text-[10px] text-slate-500">38mm / 30mm</div>
              </div>
              <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <div className="text-[11px] text-slate-400 font-medium">Retorno Energia</div>
                <div className="text-base font-bold text-emerald-400 tabular-nums">+85%</div>
                <div className="text-[10px] text-slate-500">K-Nitro Foam</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative group mx-auto max-w-xl lg:max-w-none">
              
              {/* Product Frame with Glow */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-3 sm:p-6 shadow-2xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden rounded-xl bg-slate-950">
                  <img
                    src={flagshipProduct.image}
                    alt={flagshipProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating callout badges on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700">
                      CABEDAL AEROKNIT 3D
                    </span>
                    <span className="font-mono text-blue-300 bg-blue-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-blue-800">
                      PLACA AEROBLADE CARBON
                    </span>
                  </div>
                </div>

                {/* Thumbnail angle selectors */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {flagshipProduct.images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onViewProduct(flagshipProduct)}
                      className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 hover:border-blue-500 bg-slate-950 transition-all cursor-pointer relative"
                    >
                      <img
                        src={imgSrc}
                        alt={`Ângulo ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-slate-300 px-1 rounded">
                        {idx === 0 ? 'Lateral' : idx === 1 ? 'Sola' : 'Frontal'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Commitments Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 rounded-lg shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Frete Grátis Express</div>
              <div className="text-xs text-slate-400">Em compras acima de R$ 399</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 rounded-lg shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">30 Dias de Teste</div>
              <div className="text-xs text-slate-400">Corra na rua. Não gostou? Devolva.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Garantia Kinetix Lab</div>
              <div className="text-xs text-slate-400">1 ano contra defeitos de fabricação</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 rounded-lg shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">10x Sem Juros</div>
              <div className="text-xs text-slate-400">Ou 5% de desconto à vista via PIX</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
