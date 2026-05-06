import { useState, useEffect } from 'react'

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
      const timer = setTimeout(() => setShouldRender(false), 700)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!shouldRender) return null

  return (
    <div className="absolute right-12 bottom-1/4 z-50">
      <div
        className={`transition-all duration-700 transform ${
          animate ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-16 opacity-0 scale-90'
        }`}
      >
        <div className="flex flex-col items-center p-4 rounded-2xl shadow-2xl w-64 backdrop-blur-md bg-black/40 border border-white/20">
          <div className="text-5xl drop-shadow-2xl mb-2 animate-bounce">🥤</div>
          <div className="text-center">
            <div className="font-bold text-lg text-yellow-400">京都特供·回血气泡水</div>
            <div className="text-sm text-white mt-1">时间紧迫？一口满血复活！</div>
            <button className="mt-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-1.5 px-4 rounded-full text-sm hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all">
              + 补充体力 ⚡️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
