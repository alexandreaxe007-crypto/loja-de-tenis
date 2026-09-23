import { useState } from 'react';
import { Mail, Check, ShieldCheck, Lock, RotateCcw } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl font-extrabold tracking-tight text-white uppercase block">
              KINETIX
            </span>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Engenharia biomecânica aplicada ao alto rendimento atlético e cultura de rua. Projetado e testado para quem busca velocidade sem concessões.
            </p>

            <div className="flex items-center gap-6 pt-2 text-slate-500 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>SSL 256-bit Seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                <span>30 Dias de Teste</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Garantia 1 Ano</span>
              </div>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Modelos</h4>
            <ul className="space-y-2">
              <li><a href="#lancamentos" className="hover:text-white transition-colors">Nitro-X Carbon</a></li>
              <li><a href="#colecao" className="hover:text-white transition-colors">Stride Speed</a></li>
              <li><a href="#colecao" className="hover:text-white transition-colors">Archive '88 Vintage</a></li>
              <li><a href="#colecao" className="hover:text-white transition-colors">Terra-Explorer GTX</a></li>
              <li><a href="#colecao" className="hover:text-white transition-colors">Cloud-Max Zero</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Suporte ao Atleta</h4>
            <ul className="space-y-2">
              <li><a href="#tecnologia" className="hover:text-white transition-colors">Tecnologia da Espuma</a></li>
              <li><a href="#avaliacoes" className="hover:text-white transition-colors">Depoimentos & Provas</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Política de Trocas (30 dias)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Rastreamento de Envio</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Fale com os Especialistas</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Clube de Ritmo</h4>
            <p className="text-slate-400 text-xs mb-3">
              Receba convites de treinos, lançamentos antecipados e 10% OFF no primeiro pedido.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Cadastrar
              </button>
            </form>

            {subscribed && (
              <div className="mt-2 text-emerald-400 text-[11px] flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Inscrito com sucesso! Cheque seu e-mail.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 KINETIX LAB FOOTWEAR BRASIL LTDA. CNPJ: 42.195.001/0001-88. TODOS OS DIREITOS RESERVADOS.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">Formas de Pagamento:</span>
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-300">
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-bold text-emerald-400">PIX</span>
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">VISA</span>
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">MASTERCARD</span>
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">ELO</span>
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">BOLETO</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
