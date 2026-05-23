import { useMemo } from 'react'
import type { LiveTagItem } from '@/types'

interface LiveTagOverlayProps {
  currentTime: number
  liveTags: LiveTagItem[]
}

export default function LiveTagOverlay({ currentTime, liveTags }: LiveTagOverlayProps) {
  const active = useMemo(() => {
    let match = liveTags[0]
    for (let i = liveTags.length - 1; i >= 0; i--) {
      if (currentTime >= liveTags[i].time) {
        match = liveTags[i]
        break
      }
    }
    return match
  }, [currentTime, liveTags])

  return (
    <div className="absolute top-3 left-3 z-30 pointer-events-none">
      <div className="flex flex-wrap gap-1.5">
        {active.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
