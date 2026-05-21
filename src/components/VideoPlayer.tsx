import { useRef, useEffect } from 'react'
import type { Scene } from '@/types'

interface VideoPlayerProps {
  scene: Scene
  videoSrc: string
  isH5Open: boolean
  onTimeUpdate: (currentTime: number) => void
}

export default function VideoPlayer({
  scene,
  videoSrc,
  isH5Open,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // 场景切换：重置进度并自动播放
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.play().catch(() => {})
  }, [scene])

  // H5 拉起时自动暂停，关闭时不自动播放
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (isH5Open) {
      el.pause()
    }
  }, [isH5Open])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime)
    }
  }

  return (
    <div
      className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isH5Open ? 'scale-[0.85] -translate-y-12 rounded-2xl shadow-2xl' : ''
      }`}
    >
      <video
        ref={videoRef}
        key={scene}
        className="w-full h-full object-cover"
        src={videoSrc}
        onTimeUpdate={handleTimeUpdate}
        muted
        controls
        playsInline
      />
    </div>
  )
}
