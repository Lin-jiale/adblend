import { useState, useEffect, useRef } from 'react'
import type { DanmakuItem } from '@/types'

interface UseDanmakuOptions {
  enabled: boolean
  danmakuItems: DanmakuItem[]
}

export function useDanmaku({ enabled, danmakuItems }: UseDanmakuOptions) {
  const [visibleItems, setVisibleItems] = useState<DanmakuItem[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setVisibleItems([])

    if (!enabled) return

    danmakuItems.forEach((item) => {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => [...prev, { ...item }])
      }, item.delay)
      timersRef.current.push(timer)
    })

    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [enabled, danmakuItems])

  return { visibleItems }
}
