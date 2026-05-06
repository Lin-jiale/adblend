import { useEffect, useRef, useState, useCallback } from 'react'
import type { LogEntry, AdMode } from '@/types'
import { terminalLogs } from '@/data/terminalLogs'
import { useTypewriter } from '@/hooks/useTypewriter'

interface TerminalProps {
  mode: AdMode
  onAdTriggered: () => void
  resetKey: number
  videoLogs: LogEntry[]
}

function getPrefixColor(prefix: string): string {
  if (prefix.includes('System')) return 'text-cyan-400'
  if (prefix.includes('NLP')) return 'text-green-400'
  if (prefix.includes('Emotion')) return 'text-purple-400'
  if (prefix.includes('Ad Matcher')) return 'text-yellow-400'
  if (prefix.includes('Renderer')) return 'text-orange-400'
  if (prefix.includes('Pipeline')) return 'text-blue-400'
  if (prefix.includes('Subtitle')) return 'text-purple-400'
  return 'text-zinc-400'
}

export default function Terminal({ mode, onAdTriggered, resetKey, videoLogs }: TerminalProps) {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  const onTypeComplete = useCallback(() => {
    const idx = currentIndexRef.current
    const entry = terminalLogs[idx]
    if (!entry) return

    setVisibleLogs((prev) => [...prev, entry])

    if (entry.highlight && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      onAdTriggered()
    }

    setCurrentIndex((prev) => prev + 1)
    setIsTyping(false)
  }, [onAdTriggered])

  const { displayedText, reset: resetTypewriter } = useTypewriter({
    text: terminalLogs[currentIndex]?.message ?? '',
    speed: 25,
    enabled: isTyping && mode === 'ai',
    onComplete: onTypeComplete,
  })

  useEffect(() => {
    setVisibleLogs([])
    setCurrentIndex(0)
    setIsTyping(false)
    hasTriggeredRef.current = false
    resetTypewriter()
  }, [resetKey, mode])

  useEffect(() => {
    if (mode !== 'ai') return
    if (currentIndex >= terminalLogs.length) return
    if (isTyping) return

    const entry = terminalLogs[currentIndex]
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, entry.delay)

    return () => clearTimeout(timer)
  }, [mode, currentIndex, isTyping, resetKey])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLogs, displayedText, videoLogs])

  if (mode === 'traditional') {
    return (
      <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-zinc-800 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-zinc-600 font-mono">terminal — adblend-engine</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-zinc-500 font-mono text-sm leading-relaxed">
              传统模式下 AI 引擎已休眠...
            </p>
            <p className="text-zinc-700 font-mono text-xs mt-2">
              切换至 AI 原生模式以激活实时分析
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-zinc-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-zinc-500 font-mono">terminal — adblend-engine — ai-mode</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400/70 font-mono">LIVE</span>
        </div>
      </div>

      {/* Logs */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 scrollbar-thin"
      >
        {/* Startup banner */}
        <div className="text-cyan-400/60 mb-3 select-none">
          ╔══════════════════════════════════════╗
          <br />
          ║   AdBlend AI Engine v3.2.1          ║
          <br />
          ║   Multi-modal Native Ad System      ║
          <br />
          ╚══════════════════════════════════════╝
        </div>

        {visibleLogs.map((entry) => (
          <div
            key={entry.id}
            className={`flex gap-2 ${
              entry.highlight
                ? 'bg-yellow-400/10 border border-yellow-500/30 rounded px-2 py-1.5 -mx-2 my-2'
                : ''
            }`}
          >
            <span className={`shrink-0 ${getPrefixColor(entry.prefix)} font-semibold`}>
              {entry.prefix}
            </span>
            <span className={entry.highlight ? 'text-yellow-300 font-bold' : 'text-zinc-300'}>
              {entry.message}
            </span>
          </div>
        ))}

        {/* Video-driven logs */}
        {videoLogs.map((entry) => (
          <div
            key={entry.id}
            className="flex gap-2 animate-fade-in-up"
          >
            <span className={`shrink-0 ${getPrefixColor(entry.prefix)} font-semibold`}>
              {entry.prefix}
            </span>
            <span className="text-zinc-300">
              {entry.message}
            </span>
          </div>
        ))}

        {/* Current typing line */}
        {isTyping && mode === 'ai' && currentIndex < terminalLogs.length && (
          <div className="flex gap-2">
            <span className={`shrink-0 ${getPrefixColor(terminalLogs[currentIndex].prefix)} font-semibold`}>
              {terminalLogs[currentIndex].prefix}
            </span>
            <span className={terminalLogs[currentIndex].highlight ? 'text-yellow-300 font-bold' : 'text-zinc-300'}>
              {displayedText}
              <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-0.5 animate-blink align-middle" />
            </span>
          </div>
        )}

        {/* Completion indicator */}
        {currentIndex >= terminalLogs.length && !isTyping && (
          <div className="text-green-400 mt-3">
            <span className="text-green-400">┌─</span> Engine Standing By{' '}
            <span className="text-green-400">────────────────────────────────</span>
            <br />
            <span className="text-green-400">└─</span> Listening for timeline events...
            <span className="inline-block w-2 h-3.5 bg-green-400 ml-1 animate-blink align-middle" />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-4 py-1.5 border-t border-zinc-800 bg-zinc-900/50 flex items-center gap-4 text-[10px] font-mono text-zinc-600">
        <span>CPU: {Math.floor(Math.random() * 30 + 15)}%</span>
        <span>MEM: {Math.floor(Math.random() * 40 + 30)}MB</span>
        <span>NET: ↓{Math.floor(Math.random() * 5 + 2)}MB/s</span>
        <span className="ml-auto">PING: {Math.floor(Math.random() * 30 + 5)}ms</span>
      </div>
    </div>
  )
}
