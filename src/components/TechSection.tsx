import { useState } from 'react';
import { TECH_IMAGE } from '../data/products';
import { Zap, Shield, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export function TechSection() {
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  const techLayers = [
    {
      id: 'nitrogen',
      name: 'Espuma K-Nitro Supercrítica',
      tagline: '85% de retorno de energia comprovado',
      icon: Zap,
      description: 'Infundida com gás nitrogênio em estado supercrítico sob alta pressão molecular. Oferece resiliência elástica inigualável com peso 40% menor do que o EVA tradicional.',
      metrics: [
        { label: 'Densidade', value: '0.12 g/cm³' },
        { label: 'Retorno Elástico', value: '85.4%' },
        { label: 'Durabilidade', value: '+800 km' },
      ],
    },
    {
      id: 'carbon',
      name: 'Placa AeroBlade Carbon 3K',
      tagline: 'Propulsão biomecânica a cada ciclo de passada',
      icon: Shield,
      description: 'Geometria em colher curva esculpida em fibra de carbono 3K aeroespacial. Ela flexiona na aterrissagem e catapulta o antepé no desprendimento dos dedos, reduzindo o esforço do músculo sóleo.',
      metrics: [
        { label: 'Rigidez', value: 'Grau Pro 3K' },
        { label: 'Espessura', value: '1.2 mm' },
        { label: 'Economia Energética', value: '+4.2%' },
      ],
    },
    {
      id: 'upper',
      name: 'Cabedal AeroKnit 3D Monofilamento',
      tagline: 'Ventilação contínua e contenção milimétrica',
      icon: Wind,
      description: 'Tecelagem computadorizada de camada única sem costuras. Ajusta-se dinamicamente às dilatações térmicas do pé ao longo de treinos longos, sem causar fricção ou bolhas.',
      metrics: [
        { label: 'Transpirabilidade', value: '450 l/m²/s' },
        { label: 'Peso do cabedal', value: '42g' },
        { label: 'Costuras', value: 'Zero atrito' },
      ],
    },
    {
      id: 'grip',
      name: 'Solado TractionShield WetGrip',
      tagline: 'Aderência máxima mesmo em asfalto ensopado',
      icon: Sparkles,
      description: 'Composto vulcanizado de alta tração com padrão micro-sulcado derivado de pneus de automobilismo. Evita derrapagens em curvas fechadas sob chuva intensa.',
      metrics: [
        { label: 'Aderência Úmida', value: '+35%' },
        { label: 'Espessura Borracha', value: '2.0 mm' },
        { label: 'Padrão Lug', value: '3.5 mm' },
      ],
    },
  ];

  const current = techLayers[activeTechIndex];

  return (
    <section id="tecnologia" className="py-16 sm:py-24 border-b border-white/10 bg-slate-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Laboratório de Engenharia
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            A ANATOMIA DO IMPULSO
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Desmontamos o tênis camada por camada. Conheça as quatro inovações que transformam cada grama de força do seu corpo em aceleração pura.
          </p>
        </div>

        {/* Tech Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Macro Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={TECH_IMAGE}
                  alt="Tecnologia de solado e entressola KINETIX"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* In-Image Overlay Specs */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                  <span>CORTE TRANSVERSAL MICRO-TOMOGRÁFICO</span>
                  <span aria-hidden="true">·</span>
                  <span>ESCALA 1:1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{current.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg">{current.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Layer Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {techLayers.map((tech, idx) => {
              const isSelected = activeTechIndex === idx;
              const Icon = tech.icon;
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveTechIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500/80 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{tech.name}</h4>
                        {isSelected && (
                          <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tech.tagline}</p>

                      {/* Expanded Specs when selected */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
                          {tech.metrics.map((m) => (
                            <div key={m.label} className="p-2 bg-slate-950/60 rounded border border-slate-800/60">
                              <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                              <div className="text-xs font-bold text-emerald-400 font-mono tabular-nums">{m.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
