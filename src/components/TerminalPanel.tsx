import { useEffect, useRef } from 'react'
import type { Scene, SceneLog } from '@/types'

interface TerminalPanelProps {
  scene: Scene
  logs: SceneLog[]
}

function getLogStyle(text: string): { prefixColor: string; textColor: string } {
  if (text.includes('Renderer')) return { prefixColor: 'text-lime-400', textColor: 'text-lime-300' }
  if (text.includes('Risk Eval') || text.includes('⛔'))
    return { prefixColor: 'text-red-400', textColor: 'text-red-400' }
  if (text.includes('Calculate') || text.includes('Fusion'))
    return { prefixColor: 'text-cyan-400', textColor: 'text-cyan-300' }
  if (text.includes('Matcher') || text.includes('CV Parser') || text.includes('ASR'))
    return { prefixColor: 'text-yellow-400', textColor: 'text-yellow-300' }
  if (text.includes('System')) return { prefixColor: 'text-green-400', textColor: 'text-green-300' }
  if (text.includes('Danmaku')) return { prefixColor: 'text-purple-400', textColor: 'text-purple-300' }
  if (text.includes('Audio')) return { prefixColor: 'text-pink-400', textColor: 'text-pink-300' }
  return { prefixColor: 'text-green-500', textColor: 'text-green-400' }
}

function splitPrefix(fullText: string): { prefix: string; message: string } {
  const match = fullText.match(/^(\[[^\]]+\])\s*/)
  if (match) return { prefix: match[1], message: fullText.slice(match[0].length) }
  return { prefix: '', message: fullText }
}

function formatTimestamp(time: number): string {
  const m = String(Math.floor(time / 60)).padStart(2, '0')
  const s = String(time % 60).padStart(2, '0')
  return `[${m}:${s}]`
}

export default function TerminalPanel({ scene, logs }: TerminalPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="w-full h-full bg-black border border-zinc-800 rounded-xl flex flex-col overflow-hidden font-mono">
      {/* 标题栏 */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-950">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[11px] text-green-500/60">
          adblend-engine — {scene === 'qingyunian' ? '庆余年' : '斗破苍穹'}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[9px] text-lime-500/70">LIVE</span>
        </div>
      </div>

      {/* 内容区 */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 text-[11px] space-y-1 scrollbar-thin bg-black"
      >
        {/* 启动头 */}
        <div className="text-green-600/40 mb-3 select-none leading-relaxed">
          ╔══════════════════════════════════╗
          <br />
          ║  AdBlend AI Engine v3.2.1     ║
          <br />
          ║  ▸ Multi-modal Ad Matcher    ║
          <br />
          ╚══════════════════════════════════╝
        </div>

        {/* 日志流 */}
        {logs.map((entry, idx) => {
          const { prefix, message } = splitPrefix(entry.text)
          const style = getLogStyle(entry.text)
          const isRisk = entry.text.includes('Risk Eval') || entry.text.includes('⛔')
          const isRenderer = entry.text.includes('Renderer')

          return (
            <div
              key={idx}
              className={`flex gap-1.5 animate-fade-in-up ${
                isRisk
                  ? 'bg-red-500/10 border-l-2 border-red-500 rounded px-2 py-1 my-1'
                  : isRenderer
                    ? 'bg-lime-500/5 border-l-2 border-lime-500 rounded px-2 py-1 my-1'
                    : ''
              }`}
            >
              <span className="shrink-0 text-zinc-600">{formatTimestamp(entry.time)}</span>
              {prefix && (
                <span className={`shrink-0 ${style.prefixColor}`}>
                  {prefix}
                </span>
              )}
              <span className={`${style.textColor} ${isRisk || isRenderer ? 'font-bold' : ''}`}>
                {message}
              </span>
            </div>
          )
        })}

        {/* 等待中闪烁光标 */}
        <div className="text-green-500 mt-2">
          <span className="inline-block w-2 h-3.5 bg-green-500 ml-0.5 animate-blink align-middle" />
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="px-4 py-1.5 border-t border-zinc-800/60 bg-zinc-950 flex items-center gap-4 text-[9px] text-zinc-600">
        <span className="text-green-600">{`[${new Date().toTimeString().slice(0, 8)}]`}</span>
        <span className="ml-auto">Session: {scene}</span>
      </div>
    </div>
  )
}
