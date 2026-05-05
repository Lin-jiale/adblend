import type { AdMode } from '@/types'
import { Play, SkipForward, SkipBack, Volume2, Maximize, Settings, Cpu, Activity, Radio } from 'lucide-react'

interface VideoPlayerProps {
  mode: AdMode
  showAdBubble: boolean
  countdown: number
}

function AudioWaveform() {
  const bars = [
    { h: 60, d: 0.6 },
    { h: 85, d: 1.2 },
    { h: 40, d: 0.4 },
    { h: 95, d: 0.8 },
    { h: 55, d: 1.5 },
    { h: 75, d: 0.7 },
    { h: 45, d: 1.1 },
    { h: 90, d: 0.5 },
    { h: 65, d: 1.3 },
    { h: 80, d: 0.9 },
    { h: 35, d: 0.6 },
    { h: 70, d: 1.0 },
    { h: 50, d: 0.4 },
    { h: 88, d: 1.4 },
    { h: 42, d: 0.7 },
    { h: 78, d: 1.2 },
    { h: 58, d: 0.5 },
    { h: 92, d: 0.9 },
    { h: 48, d: 1.1 },
    { h: 72, d: 0.8 },
    { h: 38, d: 1.3 },
    { h: 82, d: 0.6 },
    { h: 52, d: 1.0 },
    { h: 68, d: 0.4 },
  ]

  return (
    <div className="flex items-end gap-[2px] h-32">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t-sm"
          style={{
            height: `${bar.h}%`,
            transformOrigin: 'bottom',
            background: i % 3 === 0
              ? 'linear-gradient(to top, rgba(0,229,255,0.2), rgba(0,229,255,0.9))'
              : i % 3 === 1
                ? 'linear-gradient(to top, rgba(139,92,246,0.2), rgba(139,92,246,0.7))'
                : 'linear-gradient(to top, rgba(34,197,94,0.2), rgba(34,197,94,0.6))',
            animation: `waveformPulse ${bar.d}s ease-in-out infinite alternate`,
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  )
}

export default function VideoPlayer({ mode, showAdBubble, countdown }: VideoPlayerProps) {
  const isTraditional = mode === 'traditional'

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 group">
      {/* Scene Background */}
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
          <div className="w-full h-full relative overflow-hidden bg-[#02040a]">
            {/* Deep background with subtle gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

            {/* Hex grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300e5ff' stroke-width='0.5'%3E%3Cpath d='M10 5 L20 0 L30 5 L30 15 L20 20 L10 15 Z'/%3E%3Cpath d='M10 25 L20 20 L30 25 L30 35 L20 40 L10 35 Z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
              }}
            />

            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Audio Waveform - Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <AudioWaveform />

              {/* Data stream text overlay */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-cyan-400/80 font-mono text-xs tracking-widest">
                  <Radio size={14} className="animate-pulse" />
                  LIVE STREAM DECODED
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="text-cyan-500/50 font-mono text-[10px] tracking-[0.2em]">
                  TX_VIDEO_CHANNEL_01 :: PROTOCOL v3.2.1
                </div>
              </div>

              {/* Data rate indicator */}
              <div className="flex items-center gap-3 text-zinc-600 font-mono text-[10px]">
                <Activity size={12} className="text-cyan-500/60" />
                <span>BITRATE: 15.6 Mbps</span>
                <span className="text-zinc-800">|</span>
                <span>FPS: 29.97</span>
                <span className="text-zinc-800">|</span>
                <span>CODEC: H.265</span>
              </div>
            </div>

            {/* Floating data hex particles */}
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute font-mono text-xs text-cyan-500/20"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animation: `fadeIn 2s ease-out ${i * 0.3}s infinite alternate`,
                }}
              >
                {`0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase()}`}
              </div>
            ))}

            {/* Subtle corner glows */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/[0.03] rounded-full blur-[100px]" />

            {/* Scanline effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent animate-scan-line" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

            {/* Corner tech decoration */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-cyan-500/20 rounded-tl-xl pointer-events-none">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-cyan-400/40 rounded-full" />
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-cyan-500/20 rounded-tr-xl pointer-events-none">
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400/40 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-cyan-500/20 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-cyan-500/20 rounded-br-xl pointer-events-none" />
          </div>
        )}
      </div>

      {/* Video Player Controls (Decorative) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-3">
          <button className="text-white/80 hover:text-white transition-colors">
            <SkipBack size={16} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Play size={18} fill="white" />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
          <div className="flex-1 mx-2">
            <div className="h-1 bg-zinc-600 rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-cyan-400 rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>14:32</span>
              <span>41:08</span>
            </div>
          </div>
          <button className="text-white/80 hover:text-white transition-colors">
            <Volume2 size={16} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Settings size={16} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* Corner badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-zinc-400 font-mono border border-zinc-700/50 flex items-center gap-1">
          <Cpu size={10} className="text-cyan-400" />
          {isTraditional ? 'AD INSERTION' : 'AI NATIVE'}
        </span>
        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-zinc-500 font-mono border border-zinc-700/50">
          1080P · 臻彩
        </span>
      </div>
      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-zinc-500 font-mono border border-zinc-700/50">
        00:14:32 / 00:41:08
      </div>
    </div>
  )
}
