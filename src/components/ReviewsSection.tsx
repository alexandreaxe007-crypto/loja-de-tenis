import { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus } from 'lucide-react';

export function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [cityName, setCityName] = useState('');
  const [modelName, setModelName] = useState('KINETIX NITRO-X CARBON');
  const [distance, setDistance] = useState('120 km rodados');
  const [commentText, setCommentText] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [successToast, setSuccessToast] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      role: 'Corredor Verificado',
      city: cityName.trim() || 'Brasil',
      rating: starRating,
      date: 'Hoje',
      model: modelName,
      distanceLogged: distance.trim() || '50 km rodados',
      comment: commentText.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setAuthorName('');
    setCityName('');
    setCommentText('');
    setShowAddForm(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <section id="avaliacoes" className="py-16 sm:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Feedback de Atletas & Clientes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              TESTADO NA PISTA. APROVADO NO CRONÔMETRO.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Mais de 1.200 corredores já completaram maratonas, treinos e quilômetros diários com a tecnologia Kinetix.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shrink-0">
            <div className="text-center pr-4 border-r border-slate-800">
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">4.9</div>
              <div className="flex items-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-white">99.2% de Aprovação</div>
              <div className="text-[11px] text-slate-400">148 avaliações auditadas pós-compra</div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Fechar formulário' : 'Escrever avaliação'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Obrigado! Sua avaliação foi enviada e já está visível para a comunidade.</span>
          </div>
        )}

        {/* Add Review Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-10 p-6 bg-slate-900/90 border border-blue-500/40 rounded-xl space-y-4 max-w-2xl mx-auto shadow-2xl"
          >
            <h3 className="text-base font-bold text-white">Compartilhe sua experiência de corrida</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ex: João Ferreira"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sua Cidade / Estado</label>
                <input
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Ex: São Paulo, SP"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Modelo Adquirido</label>
                <select
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="KINETIX NITRO-X CARBON">KINETIX NITRO-X CARBON</option>
                  <option value="KINETIX STRIDE SPEED">KINETIX STRIDE SPEED</option>
                  <option value="KINETIX ARCHIVE '88">KINETIX ARCHIVE '88</option>
                  <option value="KINETIX TERRA-EXPLORER GTX">KINETIX TERRA-EXPLORER GTX</option>
                  <option value="KINETIX PULSE TRAINER">KINETIX PULSE TRAINER</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Distância Testada</label>
                <input
                  type="text"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Ex: 350 km rodados"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Classificação</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStarRating(num)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        num <= starRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Comentário Detalhado *</label>
              <textarea
                required
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Conte sobre o conforto, amortecimento, tração ou ganho de velocidade..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
              >
                Publicar Avaliação
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{rev.date}</span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{rev.author}</span>
                    <span title="Compra Verificada" className="inline-flex">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {rev.role} · {rev.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] font-semibold text-emerald-400">{rev.distanceLogged}</div>
                  <div className="text-[10px] text-slate-400">{rev.model}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
