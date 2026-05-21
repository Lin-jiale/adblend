import { useState, useEffect, useCallback, useRef } from 'react'
import { X } from 'lucide-react'
import type { AdConfig } from '@/types'

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="158" viewBox="0 0 280 158">
      <rect fill="#0f172a" width="280" height="158" rx="12"/>
      <text fill="#fbbf24" font-family="system-ui" font-size="14" font-weight="bold" x="140" y="76" text-anchor="middle">东鹏特饮</text>
      <text fill="#64748b" font-family="system-ui" font-size="11" x="140" y="96" text-anchor="middle">年轻就要醒着拼！</text>
    </svg>`,
  )

interface AdBubbleProps {
  adConfig: AdConfig
  onOpenH5Modal: (adConfig: AdConfig) => void
  onClose: () => void
}

export default function AdBubble({ adConfig, onOpenH5Modal, onClose }: AdBubbleProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [canClose, setCanClose] = useState(false)
  const [closing, setClosing] = useState(false)
  const exposureRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isImage = adConfig.type === 'image'

  useEffect(() => {
    setShouldRender(true)
    setCanClose(false)
    setClosing(false)
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true))
    })
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    if (shouldRender && animated && !canClose && !closing) {
      exposureRef.current = setTimeout(() => setCanClose(true), 5000)
    }
    return () => {
      if (exposureRef.current) {
        clearTimeout(exposureRef.current)
        exposureRef.current = null
      }
    }
  }, [shouldRender, animated, canClose, closing])

  useEffect(() => {
    return () => {
      if (exposureRef.current) clearTimeout(exposureRef.current)
    }
  }, [])

  const doClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    setAnimated(false)
    const timer = setTimeout(() => onClose(), 700)
    return () => clearTimeout(timer)
  }, [closing, onClose])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      onOpenH5Modal(adConfig)
      doClose()
    },
    [adConfig, onOpenH5Modal, doClose],
  )

  const handleVideoEnded = useCallback(() => {
    doClose()
  }, [doClose])

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
      <div
        onClick={handleClick}
        className={`transition-all duration-500 transform cursor-pointer ${
          animated && !closing
            ? 'translate-x-0 opacity-100 scale-100'
            : 'translate-x-16 opacity-0 scale-90'
        }`}
      >
        <div className="relative rounded-2xl shadow-2xl w-72 overflow-hidden backdrop-blur-md bg-black/60 border border-white/10">
          {isImage ? (
            <img
              className="w-full aspect-video object-cover"
              src={adConfig.url}
              alt="广告"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
              }}
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src={adConfig.url}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
            />
          )}

          {/* 互动福利按钮 */}
          <div className="p-4">
            <button
              onClick={handleClick}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse drop-shadow-md"
            >
              {adConfig.ctaText}
            </button>
          </div>
        </div>
      </div>

      {canClose && !closing && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            doClose()
          }}
          className="absolute -top-2 -right-2 z-[55] w-6 h-6 bg-zinc-700/90 hover:bg-red-500/80 rounded-full flex items-center justify-center border border-zinc-500/30 backdrop-blur-sm transition-all duration-300 animate-fade-in-up"
          aria-label="关闭广告"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      )}
    </div>
  )
}
