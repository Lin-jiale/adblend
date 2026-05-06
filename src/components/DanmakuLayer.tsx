interface TimelineDanmakuDef {
  id: string
  time: number
  text: string
  type: 'normal' | 'ad-react'
  top: number
  speed: number
}

const danmakuData: TimelineDanmakuDef[] = [
  { id: 'tl-3', time: 3, text: '老王求生欲拉满', type: 'normal', top: 18, speed: 8 },
  { id: 'tl-15', time: 15, text: '太子：又来找我？', type: 'normal', top: 25, speed: 8 },
  { id: 'tl-27', time: 27, text: '范闲太难了，疯狂找人', type: 'normal', top: 12, speed: 7 },
  // 绝对红线：以下弹幕必须在 34 秒之后才能渲染
  { id: 'tl-34', time: 34, text: '卧槽这广告绝了！无缝衔接啊', type: 'ad-react', top: 20, speed: 7 },
  { id: 'tl-35', time: 35, text: '这彩蛋猝不及防，懂业务', type: 'ad-react', top: 35, speed: 8 },
  { id: 'tl-37', time: 37, text: '同款气泡水给我来一打', type: 'ad-react', top: 50, speed: 6 },
]

interface DanmakuLayerProps {
  currentTime: number
}

export default function DanmakuLayer({ currentTime }: DanmakuLayerProps) {
  const visibleDanmaku = danmakuData.filter(
    (d) => currentTime >= d.time && currentTime < d.time + 4,
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {visibleDanmaku.map((item) => (
        <div
          key={item.id}
          className="absolute whitespace-nowrap font-bold text-sm"
          style={{
            top: `${item.top}%`,
            animation: `slideLeft ${item.speed}s linear forwards`,
            color: item.type === 'ad-react' ? '#fbbf24' : '#a78bfa',
            textShadow:
              item.type === 'ad-react'
                ? '0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.4)'
                : '0 0 10px rgba(167,139,250,0.6)',
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
