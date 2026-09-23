import { useState } from 'react';
import { X, Ruler, Footprints, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectRecommended: (product: Product) => void;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  products,
  onSelectRecommended,
}: SizeGuideModalProps) {
  const [pronation, setPronation] = useState<'neutra' | 'pronada' | 'supinada'>('neutra');
  const [goal, setGoal] = useState<'velocidade' | 'conforto' | 'estilo' | 'trilha'>('velocidade');
  const [footCm, setFootCm] = useState<number>(26.5);

  if (!isOpen) return null;

  // Conversion table
  const sizeChart = [
    { cm: '24.5 cm', br: 37, us: '6.5', eur: 38 },
    { cm: '25.0 cm', br: 38, us: '7.0', eur: 39 },
    { cm: '25.5 cm', br: 39, us: '7.5', eur: 40 },
    { cm: '26.5 cm', br: 40, us: '8.5', eur: 41 },
    { cm: '27.0 cm', br: 41, us: '9.5', eur: 42 },
    { cm: '28.0 cm', br: 42, us: '10.0', eur: 43 },
    { cm: '28.5 cm', br: 43, us: '11.0', eur: 44 },
    { cm: '29.5 cm', br: 44, us: '12.0', eur: 45 },
  ];

  // Logic to determine recommended product
  const getRecommendation = (): Product => {
    if (goal === 'trilha') {
      return products.find((p) => p.category === 'trilha') || products[0];
    }
    if (goal === 'estilo') {
      return products.find((p) => p.category === 'street') || products[0];
    }
    if (goal === 'conforto') {
      return products.find((p) => p.id === 'kinetix-cloud-max') || products[1];
    }
    // velocidade
    return products.find((p) => p.id === 'kinetix-nitro-x') || products[0];
  };

  const recommended = getRecommendation();

  // Find corresponding BR size based on footCm
  const recommendedSize = sizeChart.reduce((prev, curr) => {
    const prevDiff = Math.abs(parseFloat(prev.cm) - footCm);
    const currDiff = Math.abs(parseFloat(curr.cm) - footCm);
    return currDiff < prevDiff ? curr : prev;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Guia de Pisada & Calculadora de Tamanho</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Step 1: Pronation */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-3">
              1. Qual é a sua pisada biomecânica?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'neutra', title: 'Pisada Neutra', desc: 'Apoio uniforme do calcanhar ao centro do antepé' },
                { id: 'pronada', title: 'Pisada Pronada', desc: 'Apoio voltado para a parte interna do pé' },
                { id: 'supinada', title: 'Pisada Supinada', desc: 'Apoio voltado para a borda externa do pé' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPronation(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    pronation === item.id
                      ? 'border-blue-500 bg-blue-500/10 text-white shadow-md'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                  <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Goal */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-3">
              2. Qual o seu principal objetivo?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'velocidade', label: 'Velocidade / Provas' },
                { id: 'conforto', label: 'Rodagens & Conforto' },
                { id: 'trilha', label: 'Trilhas & Natureza' },
                { id: 'estilo', label: 'Estilo & Dia a Dia' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                    goal === g.id
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Measurement Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold uppercase tracking-wider text-blue-400">
                3. Comprimento do Pé
              </span>
              <span className="font-mono text-sm font-bold text-white">{footCm.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min="24.0"
              max="30.0"
              step="0.5"
              value={footCm}
              onChange={(e) => setFootCm(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>24 cm (Tam 36)</span>
              <span>27 cm (Tam 41)</span>
              <span>30 cm (Tam 45)</span>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={recommended.image}
                alt={recommended.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover border border-slate-700"
              />
              <div>
                <div className="text-[11px] text-blue-300 font-medium">Recomendação Biomecânica Kinetix</div>
                <div className="text-sm font-bold text-white">{recommended.name}</div>
                <div className="text-xs text-emerald-400 font-mono font-semibold">
                  Tamanho sugerido: {recommendedSize.br} BR ({recommendedSize.cm})
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectRecommended(recommended);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Ver Este Tênis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Size Chart Table */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2">Tabela de Conversão Oficial</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-950 text-slate-400 font-mono">
                  <tr>
                    <th className="p-2.5">Medida do Pé</th>
                    <th className="p-2.5 font-bold text-blue-400">Brasil (BR)</th>
                    <th className="p-2.5">EUA (US)</th>
                    <th className="p-2.5">Europa (EUR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums text-slate-300">
                  {sizeChart.map((row) => (
                    <tr
                      key={row.br}
                      className={row.br === recommendedSize.br ? 'bg-blue-600/15 font-bold text-white' : 'hover:bg-slate-800/40'}
                    >
                      <td className="p-2.5">{row.cm}</td>
                      <td className="p-2.5 text-blue-400 font-bold">{row.br}</td>
                      <td className="p-2.5">{row.us}</td>
                      <td className="p-2.5">{row.eur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              * Dica: Se você corre provas longas (+15 km), recomendamos escolher 1 número maior para acomodar a dilatação natural dos pés.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
