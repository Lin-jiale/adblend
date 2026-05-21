import type { DanmakuItem } from '@/types'

interface DanmakuLayerProps {
  currentTime: number
  /** 当前场景的弹幕列表 */
  danmakuItems: DanmakuItem[]
}

export default function DanmakuLayer({ currentTime, danmakuItems }: DanmakuLayerProps) {
  const visible = danmakuItems.filter(
    (d) => currentTime >= d.time && currentTime < d.time + 4,
  )

  if (visible.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {visible.map((item, idx) => (
        <div
          key={`${item.time}-${idx}`}
          className="absolute whitespace-nowrap font-bold text-sm"
          style={{
            top: `${10 + (idx % 5) * 16}%`,
            animation: `slideLeft ${6 + idx}s linear forwards`,
            color: '#a78bfa',
            textShadow: '0 0 10px rgba(167,139,250,0.6)',
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
