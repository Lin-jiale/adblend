import type { AdMode } from '@/types'

interface TogglePanelProps {
  mode: AdMode
  onChange: (mode: AdMode) => void
}

export default function TogglePanel({ mode, onChange }: TogglePanelProps) {
  const isAi = mode === 'ai'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1 text-xs tracking-widest text-zinc-500 uppercase">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        ADBLEND AB TEST SUITE
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={() => onChange('traditional')}
          className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-500 ${
            !isAi
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              : 'text-zinc-600 hover:text-zinc-400 border border-transparent'
          }`}
        >
          传统暴力插播模式
        </button>

        <button
          onClick={() => onChange('ai')}
          className="relative group"
          aria-label="Toggle ad mode"
        >
          <div
            className={`w-16 h-8 rounded-full p-0.5 transition-all duration-500 cursor-pointer ${
              isAi
                ? 'bg-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.4)] border border-cyan-400/50'
                : 'bg-zinc-800 border border-zinc-700'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full transition-all duration-500 flex items-center justify-center ${
                isAi
                  ? 'translate-x-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.6)]'
                  : 'translate-x-0 bg-zinc-500'
              }`}
            >
              {isAi && (
                <span className="text-xs text-black font-bold">AI</span>
              )}
            </div>
          </div>
        </button>

        <button
          onClick={() => onChange('ai')}
          className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-500 ${
            isAi
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
              : 'text-zinc-600 hover:text-zinc-400 border border-transparent'
          }`}
        >
          AdBlend AI 原生模式
        </button>
      </div>
    </div>
  )
}
