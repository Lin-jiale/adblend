import { useState, useCallback, useRef } from 'react'
import type { Scene, SceneLog, AdConfig } from '@/types'
import { mockData } from '@/data/mockData'
import TogglePanel from '@/components/TogglePanel'
import VideoPlayer from '@/components/VideoPlayer'
import TerminalPanel from '@/components/TerminalPanel'
import DanmakuLayer from '@/components/DanmakuLayer'
import LiveTagOverlay from '@/components/LiveTagOverlay'
import AdBubble from '@/components/AdBubble'
import H5Modal from '@/components/H5Modal'

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('qingyunian')
  const [currentTime, setCurrentTime] = useState(0)
  const [showAd, setShowAd] = useState(false)
  const [displayedLogs, setDisplayedLogs] = useState<SceneLog[]>([])
  const [h5ModalOpen, setH5ModalOpen] = useState(false)
  const [h5ModalAd, setH5ModalAd] = useState<AdConfig | null>(null)

  const triggeredRef = useRef<Set<number>>(new Set())
  const adTriggeredRef = useRef(false)
  const prevTimeRef = useRef(0)
  const timeRef = useRef(0)

  const sceneData = mockData[currentScene]
  const { logs, adTriggerTime, ad, mainVideoUrl, danmaku, liveTags, title } = sceneData

  const handleSceneChange = useCallback((scene: Scene) => {
    setCurrentScene(scene)
    setCurrentTime(0)
    setShowAd(false)
    setDisplayedLogs([])
    setH5ModalOpen(false)
    setH5ModalAd(null)
    triggeredRef.current.clear()
    adTriggeredRef.current = false
    prevTimeRef.current = 0
    timeRef.current = 0
  }, [])

  const handleTimeUpdate = useCallback(
    (time: number) => {
      const prevTime = prevTimeRef.current
      prevTimeRef.current = time
      timeRef.current = time
      setCurrentTime(time)

      if (Math.abs(time - prevTime) > 1.5) {
        triggeredRef.current.clear()
        adTriggeredRef.current = false
        setDisplayedLogs([])
        setShowAd(false)
        setH5ModalOpen(false)
        setH5ModalAd(null)
      }

      for (let i = 0; i < logs.length; i++) {
        if (time >= logs[i].time && !triggeredRef.current.has(i)) {
          triggeredRef.current.add(i)
          setDisplayedLogs((prev) => [...prev, logs[i]])
        }
      }

      if (time >= adTriggerTime && !adTriggeredRef.current) {
        adTriggeredRef.current = true
        setShowAd(true)
      }
    },
    [logs, adTriggerTime],
  )

  const injectLiveLog = useCallback((text: string) => {
    const t = Math.floor(timeRef.current)
    setDisplayedLogs((prev) => [...prev, { time: t, text }])
  }, [])

  const handleAdClose = useCallback(() => {
    setShowAd(false)
  }, [])

  const handleOpenH5Modal = useCallback((adConfig: AdConfig) => {
    setH5ModalAd(adConfig)
    setH5ModalOpen(true)
  }, [])

  // ── 关闭 H5 ──
  const handleCloseH5 = useCallback(() => {
    setH5ModalOpen(false)
    setH5ModalAd(null)
    injectLiveLog('[Pipeline] Funnel closed. Re-engaging full-screen video context.')
    injectLiveLog('[Pipeline] Ad lifecycle ended. Initiating scene cooldown period (600s).')
  }, [injectLiveLog])

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <header className="relative z-10 px-6 py-3.5 flex items-center justify-between border-b border-zinc-800/50 bg-[#050508]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-black text-sm font-black">AB</span>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">
              <span className="text-white">Ad</span>
              <span className="text-cyan-400">Blend</span>
            </h1>
            <p className="text-[10px] text-zinc-600 -mt-0.5">
              情绪驱动的 AI 商业化广告引擎 · 腾讯 PCG 校园 AI 产品创意大赛
            </p>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-6 pt-4 pb-2 flex justify-center">
        <TogglePanel currentScene={currentScene} onChange={handleSceneChange} />
      </div>

      <main className="relative z-10 flex-1 px-4 sm:px-6 pb-6">
        <div className="flex flex-col lg:flex-row gap-4 max-w-[1600px] mx-auto h-[calc(100vh-180px)] min-h-[500px]">
          <div className="flex-1 lg:w-[60%] relative flex flex-col">
            <div className="relative flex-1 rounded-xl overflow-hidden border border-zinc-800/50 shadow-[0_0_60px_rgba(0,229,255,0.03)]">
              <VideoPlayer
                key={currentScene}
                scene={currentScene}
                videoSrc={mainVideoUrl}
                isH5Open={h5ModalOpen}
                onTimeUpdate={handleTimeUpdate}
              />
              <LiveTagOverlay currentTime={currentTime} liveTags={liveTags} />
              <DanmakuLayer currentTime={currentTime} danmakuItems={danmaku} />
              {showAd && (
                <AdBubble
                  key={`${currentScene}-ad`}
                  adConfig={ad}
                  onOpenH5Modal={handleOpenH5Modal}
                  onClose={handleAdClose}
                  injectLiveLog={injectLiveLog}
                />
              )}
              {h5ModalOpen && h5ModalAd && (
                <H5Modal
                  adConfig={h5ModalAd}
                  onClose={handleCloseH5}
                />
              )}
            </div>
            <div className="mt-2 flex items-center gap-3 px-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                AI NATIVE AD ACTIVE
              </div>
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-[10px] text-zinc-600 font-mono">{title}</span>
            </div>
          </div>

          <div className="lg:w-[40%] h-[300px] lg:h-auto">
            <TerminalPanel scene={currentScene} logs={displayedLogs} />
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 py-2.5 border-t border-zinc-800/50 flex items-center justify-between text-[10px] text-zinc-700 font-mono">
        <span>© 2026 AdBlend · Tencent PCG Campus AI Innovation Contest</span>
        <span>Designed for Demo Only</span>
      </footer>
    </div>
  )
}
