import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import type { AdMode } from '@/types'
import TogglePanel from '@/components/TogglePanel'
import VideoPlayer from '@/components/VideoPlayer'
import Terminal from '@/components/Terminal'
import DanmakuLayer from '@/components/DanmakuLayer'
import AdBubble from '@/components/AdBubble'
import { generateTraditionalDanmaku, generateAiDanmaku } from '@/data/danmaku'

export default function App() {
  const [mode, setMode] = useState<AdMode>('ai')
  const [showAdBubble, setShowAdBubble] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [terminalResetKey, setTerminalResetKey] = useState(0)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const traditionalDanmaku = useMemo(() => generateTraditionalDanmaku(), [])
  const aiDanmaku = useMemo(() => generateAiDanmaku(), [])

  useEffect(() => {
    if (mode === 'traditional') {
      setCountdown(60)
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 60
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }
    }
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }
    }
  }, [mode])

  const handleModeChange = useCallback((newMode: AdMode) => {
    setMode(newMode)
    setShowAdBubble(false)
    setTerminalResetKey((prev) => prev + 1)
  }, [])

  const handleAdTriggered = useCallback(() => {
    setShowAdBubble(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">
      {/* Background noise / grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#050508]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-black text-sm font-black">AB</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-white">Ad</span>
              <span className="text-cyan-400">Blend</span>
            </h1>
            <p className="text-[10px] text-zinc-600 -mt-0.5">AI 原生广告系统 · 腾讯 PCG 校园 AI 产品创意大赛</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-600 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            v3.2.1-beta
          </span>
          <span>|</span>
          <span>NLP · CV · GAN</span>
        </div>
      </header>

      {/* Toggle Panel */}
      <div className="relative z-10 pt-5 pb-3">
        <TogglePanel mode={mode} onChange={handleModeChange} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 pb-6">
        <div className="flex flex-col lg:flex-row gap-4 max-w-[1600px] mx-auto h-[calc(100vh-200px)] min-h-[500px]">
          {/* Left: Video Player */}
          <div className="flex-1 lg:w-[60%] relative flex flex-col">
            <div className="relative flex-1 rounded-xl overflow-hidden border border-zinc-800/50 shadow-[0_0_60px_rgba(0,229,255,0.03)]">
              <VideoPlayer
                mode={mode}
                showAdBubble={showAdBubble}
                countdown={countdown}
              />
              {/* Danmaku Layer */}
              <DanmakuLayer
                mode={mode}
                danmakuItems={mode === 'traditional' ? traditionalDanmaku : aiDanmaku}
              />
              {/* Ad Bubble (positioned absolutely within player) */}
              <AdBubble visible={showAdBubble && mode === 'ai'} />
            </div>

            {/* Mode indicator bar */}
            <div className="mt-2 flex items-center gap-3 px-1">
              <div className={`flex items-center gap-2 text-xs font-mono ${mode === 'ai' ? 'text-cyan-400' : 'text-red-400'}`}>
                <span className={`w-2 h-2 rounded-full ${mode === 'ai' ? 'bg-cyan-400 animate-pulse' : 'bg-red-400 animate-pulse'}`} />
                {mode === 'ai' ? 'AI NATIVE AD ACTIVE' : 'TRADITIONAL AD BREAK'}
              </div>
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-xs text-zinc-700 font-mono">
                {mode === 'ai' ? '引擎状态: 运行中' : '引擎状态: 休眠'}
              </span>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="lg:w-[40%] h-[300px] lg:h-auto">
            <Terminal
              mode={mode}
              onAdTriggered={handleAdTriggered}
              resetKey={terminalResetKey}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-3 border-t border-zinc-800/50 flex items-center justify-between text-[10px] text-zinc-700 font-mono">
        <span>© 2025 AdBlend · Tencent PCG Campus AI Innovation Contest</span>
        <span>Designed for Demo Only</span>
      </footer>
    </div>
  )
}
