import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

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
    <div className="absolute right-[18%] top-[28%] z-30">
      {/* Connection line */}
      <div
        className={`absolute bottom-full left-8 w-0.5 h-8 bg-gradient-to-t from-cyan-400/60 to-transparent transition-all duration-500 ${
          animate ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'bottom' }}
      />

      {/* Bubble */}
      <div
        className={`relative transition-all duration-600 ease-out ${
          animate ? 'animate-bounce-in opacity-100' : 'opacity-0 scale-75'
        }`}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-2xl scale-125" />

        <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-cyan-400/40 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,229,255,0.15)] min-w-[220px]">
          {/* Corner sparkle */}
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-cyan-400 animate-pulse" size={20} />

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🫧</span>
            <div>
              <div className="text-xs text-cyan-400 font-bold tracking-wide">
                范闲同款
              </div>
              <div className="text-sm text-white font-bold">
                解压气泡水
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
            喝一口霸气值+10，<br />
            古装爽剧标配饮品 ⚔️
          </p>

          {/* CTA */}
          <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-xs font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-95">
            点击上车 🛒
          </button>
        </div>
      </div>
    </div>
  )
}
