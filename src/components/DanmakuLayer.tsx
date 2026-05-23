import { useEffect, useState, useRef } from 'react'
import type { DanmakuItem } from '@/types'

interface ActiveDanmaku {
  id: string
  text: string
  top: number
  speed: number
}

interface DanmakuLayerProps {
  currentTime: number
  danmakuItems: DanmakuItem[]
}

let globalId = 0

const TOP_SLOTS = [5, 10, 16, 23, 31, 40]

export default function DanmakuLayer({ currentTime, danmakuItems }: DanmakuLayerProps) {
  const [activeDanmakus, setActiveDanmakus] = useState<ActiveDanmaku[]>([])
  const dispatchedRef = useRef<Set<string>>(new Set())
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const prevItemsRef = useRef(danmakuItems)

  useEffect(() => {
    if (prevItemsRef.current !== danmakuItems) {
      prevItemsRef.current = danmakuItems
      setActiveDanmakus([])
      dispatchedRef.current.clear()
      timersRef.current.forEach((t) => clearTimeout(t))
      timersRef.current.clear()
    }
  }, [danmakuItems])

  useEffect(() => {
    for (let i = 0; i < danmakuItems.length; i++) {
      const item = danmakuItems[i]
      const key = `${item.time}-${item.text}`
      if (currentTime >= item.time && !dispatchedRef.current.has(key)) {
        dispatchedRef.current.add(key)
        const uniqueId = `${key}-${++globalId}`
        const slotIdx = Math.floor(Math.random() * TOP_SLOTS.length)
        const newDanmaku: ActiveDanmaku = {
          id: uniqueId,
          text: item.text,
          top: TOP_SLOTS[slotIdx],
          speed: 8,
        }
        setActiveDanmakus((prev) => [...prev, newDanmaku])
        const timer = setTimeout(() => {
          setActiveDanmakus((prev) => prev.filter((d) => d.id !== uniqueId))
          timersRef.current.delete(uniqueId)
        }, 9000)
        timersRef.current.set(uniqueId, timer)
      }
    }
  }, [currentTime, danmakuItems])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t))
      timersRef.current.clear()
    }
  }, [])

  if (activeDanmakus.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {activeDanmakus.map((item) => (
        <div
          key={item.id}
          className="danmaku-item absolute whitespace-nowrap font-bold text-sm"
          style={{
            top: `${item.top}%`,
            animation: `slide-left ${item.speed}s linear forwards`,
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
