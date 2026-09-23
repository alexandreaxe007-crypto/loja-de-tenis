import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface AnnouncementBarProps {
  onCopyCoupon?: (code: string) => void;
}

export function AnnouncementBar({ onCopyCoupon }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (dismissed) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText('VORTEX10');
    setCopied(true);
    if (onCopyCoupon) onCopyCoupon('VORTEX10');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs font-medium py-2 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="w-6 hidden md:block" />
        <div className="flex-1 text-center flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
          <span className="font-semibold tracking-wide">LANÇAMENTO NITRO-X</span>
          <span className="text-blue-200" aria-hidden="true">·</span>
          <span>Frete grátis para todo o Brasil acima de R$ 399</span>
          <span className="text-blue-200" aria-hidden="true">·</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white font-mono cursor-pointer"
            title="Clique para copiar o cupom"
          >
            <span>Cupom: <strong>VORTEX10</strong> (-10% OFF)</span>
            {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-blue-200" />}
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/80 hover:text-white p-1 rounded-sm transition-colors cursor-pointer"
          aria-label="Fechar aviso"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
