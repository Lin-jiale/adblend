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
  injectLiveLog?: (text: string) => void
}

export default function AdBubble({ adConfig, onOpenH5Modal, onClose, injectLiveLog }: AdBubbleProps) {
  const [animated, setAnimated] = useState(false)
  const [canClose, setCanClose] = useState(false)
  const [closing, setClosing] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [bounce, setBounce] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isClickedRef = useRef(false)
  const hasLoggedRef = useRef(false)

  const isImage = adConfig.type === 'image'

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true))
    })
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setBounce(true), 3000)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (hasLoggedRef.current) return

    let tick = 5
    setCountdown(tick)

    intervalRef.current = setInterval(() => {
      tick -= 1
      setCountdown(tick)

      if (tick <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setCanClose(true)

        if (!isClickedRef.current && !hasLoggedRef.current) {
          if (injectLiveLog) {
            injectLiveLog('[Tracking] Effective Viewable Impression (>5s) verified. Component unlocked.')
          }
          hasLoggedRef.current = true
        }
      }
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [injectLiveLog])

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

      isClickedRef.current = true

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (injectLiveLog) {
        injectLiveLog('[User Action] Click_Event captured. User engaged with IP_Hook. Seamless Funnel Active... 🚀')
      }

      onOpenH5Modal(adConfig)
      doClose()
    },
    [adConfig, onOpenH5Modal, doClose, injectLiveLog],
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
        <div className={`relative rounded-2xl shadow-2xl w-72 overflow-hidden backdrop-blur-md bg-black/60 border border-white/10 ${bounce && !closing ? 'animate-bounce-short' : ''}`}>
          {/* 稀缺感标签 */}
          <div className="absolute top-3 right-3 z-10">
            <span className="backdrop-blur-md bg-amber-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              {isImage ? '剧迷特权' : '限时联名'}
            </span>
          </div>

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

      {/* 倒计时圆环 */}
      {!canClose && !closing && (
        <div className="absolute -top-2 -right-2 z-[55] w-6 h-6 bg-black/70 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg">
          <span className="text-[10px] text-white font-mono font-bold">{countdown}</span>
        </div>
      )}

      {canClose && !closing && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()

            isClickedRef.current = true
            if (injectLiveLog) {
              injectLiveLog('[User Action] Dismiss_Event captured. Ad dismissed manually by user.')
              injectLiveLog('[Pipeline] Ad lifecycle ended. Initiating scene cooldown period (600s).')
            }
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
