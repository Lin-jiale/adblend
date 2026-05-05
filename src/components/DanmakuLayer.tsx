import type { AdMode, DanmakuItem } from '@/types'
import { useDanmaku } from '@/hooks/useDanmaku'

interface DanmakuLayerProps {
  mode: AdMode
  danmakuItems: DanmakuItem[]
}

export default function DanmakuLayer({ mode, danmakuItems }: DanmakuLayerProps) {
  const { visibleItems } = useDanmaku({
    enabled: true,
    danmakuItems,
  })

  const colorClass = mode === 'traditional'
    ? 'text-red-400'
    : 'text-green-400'

  const textShadow = mode === 'traditional'
    ? '0 0 8px rgba(239,68,68,0.5)'
    : '0 0 8px rgba(34,197,94,0.5)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/70 to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/70 to-transparent z-30 pointer-events-none" />

      {visibleItems.map((item) => (
        <div
          key={item.id}
          className={`absolute whitespace-nowrap text-lg font-bold z-20 ${colorClass}`}
          style={{
            top: `${item.top}%`,
            animation: `slideLeft ${item.speed}s linear forwards`,
            textShadow,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
