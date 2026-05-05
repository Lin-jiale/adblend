import type { AdMode } from '@/types'
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize, Settings } from 'lucide-react'

interface VideoPlayerProps {
  mode: AdMode
  showAdBubble: boolean
  countdown: number
}

export default function VideoPlayer({ mode, showAdBubble, countdown }: VideoPlayerProps) {
  const isTraditional = mode === 'traditional'

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 group">
      {/* Scene Background */}
      <div className="absolute inset-0">
        {isTraditional ? (
          /* Traditional: Black screen with ad */
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
          /* AI Mode: Scene with characters toasting */
          <div className="w-full h-full relative overflow-hidden">
            {/* Night Sky / Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-[#161b22]" />

            {/* Stars / Particles */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animation: 'pulse 3s ease-in-out infinite',
                  }}
                />
              ))}
            </div>

            {/* Moon / Light Source */}
            <div className="absolute top-8 right-16 w-20 h-20 rounded-full bg-gradient-to-b from-yellow-100/20 to-transparent blur-xl" />
            <div className="absolute top-10 right-20 w-12 h-12 rounded-full bg-yellow-100/40" />

            {/* Table */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[30%] bg-gradient-to-t from-amber-900/40 to-amber-800/20 rounded-t-3xl border-t border-amber-700/30" />

            {/* Character 1 - Left (范闲) */}
            <div className="absolute left-[20%] bottom-[28%] flex flex-col items-center">
              {/* Body */}
              <div className="w-16 h-28 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800 rounded-t-2xl relative">
                {/* Robe collar detail */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-cyan-800 to-slate-700 rounded-b-lg" />
                {/* Arm raising cup */}
                <div className="absolute -right-8 top-8 w-8 h-16 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full origin-bottom rotate-[-30deg]">
                  {/* Hand */}
                  <div className="absolute -right-2 top-0 w-6 h-6 bg-amber-200/80 rounded-full" />
                  {/* Cup */}
                  <div className="absolute -right-3 -top-4 w-7 h-5 bg-gradient-to-b from-amber-300/60 to-amber-500/40 rounded-md border border-amber-400/30" />
                </div>
              </div>
              {/* Head */}
              <div className="w-10 h-10 bg-amber-200/80 rounded-full -mt-1 relative">
                {/* Hair */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-5 bg-slate-900 rounded-t-full" />
              </div>
            </div>

            {/* Character 2 - Right (举杯人物) */}
            <div className="absolute right-[22%] bottom-[28%] flex flex-col items-center">
              {/* Body */}
              <div className="w-14 h-26 bg-gradient-to-b from-red-900 via-red-800 to-red-950 rounded-t-2xl relative">
                {/* Robe detail */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-amber-700 to-red-800 rounded-b-lg" />
                {/* Arm raising cup */}
                <div className="absolute -left-8 top-10 w-7 h-14 bg-gradient-to-l from-red-700 to-red-600 rounded-full origin-bottom rotate-[25deg]">
                  {/* Hand */}
                  <div className="absolute -left-1 top-0 w-5 h-5 bg-amber-200/80 rounded-full" />
                  {/* Cup */}
                  <div className="absolute -left-2 -top-3 w-6 h-4 bg-gradient-to-b from-amber-300/60 to-amber-500/40 rounded-md border border-amber-400/30" />
                </div>
              </div>
              {/* Head */}
              <div className="w-9 h-9 bg-amber-200/80 rounded-full -mt-1 relative">
                {/* Hair / Crown */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-6 bg-slate-800 rounded-t-full" />
              </div>
            </div>

            {/* Table items - dishes */}
            <div className="absolute bottom-[26%] left-[35%] w-7 h-3 bg-amber-700/50 rounded-full" />
            <div className="absolute bottom-[26%] left-[52%] w-5 h-3 bg-amber-700/50 rounded-full" />
            <div className="absolute bottom-[26%] right-[38%] w-6 h-2 bg-red-800/50 rounded-full" />

            {/* Warm ambient light */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-gradient-to-t from-amber-600/10 to-transparent rounded-full blur-3xl" />

            {/* Lanterns */}
            <div className="absolute top-12 left-[25%] w-4 h-6 bg-red-500/30 rounded-full blur-sm" />
            <div className="absolute top-14 right-[28%] w-4 h-6 bg-red-500/30 rounded-full blur-sm" />

            {/* Scanline effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.015] to-transparent animate-scan-line" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
          </div>
        )}
      </div>

      {/* Subtitles */}
      {!isTraditional && (
        <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-white text-lg font-medium drop-shadow-lg text-center px-4 py-1 bg-black/40 rounded">
          来，干杯！今日不醉不归——
        </div>
      )}

      {/* Video Player Controls (Decorative) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] text-zinc-400 font-mono border border-zinc-700/50">
          {isTraditional ? 'AD INSERTION' : 'AI NATIVE'}
        </span>
        <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] text-zinc-500 font-mono border border-zinc-700/50">
          1080P · 臻彩
        </span>
      </div>
      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 rounded text-[10px] text-zinc-500 font-mono border border-zinc-700/50">
        00:14:32 / 00:41:08
      </div>
    </div>
  )
}
