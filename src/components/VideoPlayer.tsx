import type { AdMode } from '@/types'
import { useRef, useEffect, useState } from 'react'
import { Play, Pause } from 'lucide-react'

interface VideoPlayerProps {
  mode: AdMode
  countdown: number
  onTimeUpdate: (currentTime: number) => void
}

export default function VideoPlayer({ mode, countdown, onTimeUpdate }: VideoPlayerProps) {
  const isTraditional = mode === 'traditional'
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mode === 'ai' && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [mode])

  const handleTimeUpdate = () => {
    if (videoRef.current && mode === 'ai') {
      onTimeUpdate(videoRef.current.currentTime)
    }
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 group">
      <div className="absolute inset-0">
        {isTraditional ? (
          <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900 flex flex-col items-center justify-center gap-6">
            <div className="text-6xl font-black text-red-500/80 animate-pulse tracking-widest">
              AD
            </div>
            <div className="text-2xl text-zinc-400 font-mono">
              广告剩余
              <span className="text-4xl text-red-400 font-bold mx-2">
                {countdown}
              </span>
              秒
            </div>
            <div className="text-sm text-zinc-600 mt-4">
              开通 VIP 会员即可跳过广告
            </div>
            <button className="mt-2 px-6 py-2 bg-yellow-600/80 text-yellow-100 rounded-full text-sm font-bold hover:bg-yellow-500/80 transition-colors">
              立即开通 ¥15/月
            </button>
            <div className="absolute bottom-4 text-xs text-zinc-700">
              广告赞助商提供此内容
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={`${import.meta.env.BASE_URL}video.mp4`}
            onTimeUpdate={handleTimeUpdate}
            controls
            muted
            playsInline
          />
        )}
      </div>
    </div>
  )
}
