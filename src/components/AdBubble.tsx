import { useState, useEffect } from 'react'
import { Sparkles, Zap, ShoppingCart } from 'lucide-react'

interface AdBubbleProps {
  visible: boolean
}

export default function AdBubble({ visible }: AdBubbleProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true))
      })
      return () => cancelAnimationFrame(t)
    } else {
      setAnimate(false)
      const timer = setTimeout(() => setShouldRender(false), 600)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!shouldRender) return null

  return (
    <div className="absolute right-[12%] top-[20%] z-30">
      {/* Animated dot-line connector */}
      <div className="absolute -top-12 left-12 flex flex-col items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
        <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-400/60 to-cyan-400/10" />
        <span className="text-[10px] text-cyan-400/60 font-mono tracking-wider whitespace-nowrap">
          AD_MATCH =&gt;
        </span>
      </div>

      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-blue-500/30 blur-2xl rounded-2xl scale-110 transition-all duration-700 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Main Card */}
      <div
        className={`relative transition-all duration-500 ease-out ${
          animate ? 'animate-bounce-in opacity-100' : 'opacity-0 scale-75'
        }`}
      >
        {/* Glass card container */}
        <div className="relative bg-zinc-900/70 backdrop-blur-2xl rounded-2xl border border-cyan-400/30 overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.1),0_0_80px_rgba(139,92,246,0.05)]">
          {/* Inner glow border animation */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(0,229,255,0.15), transparent, rgba(139,92,246,0.15), transparent)',
              backgroundSize: '200% 200%',
              animation: 'glowRotate 4s linear infinite',
            }}
          />
          <div className="absolute inset-[1px] bg-zinc-900/95 backdrop-blur-2xl rounded-2xl" />

          {/* Content */}
          <div className="relative p-5 min-w-[240px]">
            {/* Top sparkle icon */}
            <div className="absolute -top-3 -right-3">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 bg-cyan-400 blur-md rounded-full opacity-40 animate-pulse" />
              </div>
            </div>

            {/* Product emoji header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20">
                <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.4))' }}>
                  🥤
                </span>
                {/* Small glow under emoji */}
                <div className="absolute bottom-1 w-8 h-1 bg-cyan-400/40 blur-md rounded-full" />
              </div>
              <div>
                <div className="text-[11px] text-cyan-400 font-bold tracking-wider uppercase">
                  ADBLEND MATCH
                </div>
                <div className="text-base text-white font-bold mt-0.5">
                  同款情绪解压气泡水
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-cyan-400/30 via-purple-400/20 to-transparent mb-3" />

            {/* Tagline */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-zinc-200">
                <Zap size={14} className="text-yellow-400 shrink-0" />
                <span>喝一口，扫除焦躁值！</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-base">💪</span>
                <span>范闲同款配方，霸气值 +10</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-base">🧊</span>
                <span>0糖0卡，喝不胖的解压神器</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group relative w-full py-2.5 rounded-xl text-white text-sm font-bold overflow-hidden transition-all duration-300 active:scale-[0.97]">
              {/* Button glow bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse" />
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <ShoppingCart size={15} />
                点击一键下单
                <span className="text-base">🛒</span>
              </span>
            </button>

            {/* Tiny footer */}
            <div className="mt-2 text-center text-[10px] text-zinc-600 font-mono">
              Ad ID #9527 · Context Match 94.1%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
