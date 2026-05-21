import type { Scene } from '@/types'
import { mockData } from '@/data/mockData'

interface TogglePanelProps {
  currentScene: Scene
  onChange: (scene: Scene) => void
}

export default function TogglePanel({ currentScene, onChange }: TogglePanelProps) {
  const scenes: Scene[] = ['qingyunian', 'doupo']

  return (
    <div className="flex items-center gap-3">
      {scenes.map((scene) => {
        const active = currentScene === scene
        const data = mockData[scene]

        return (
          <button
            key={scene}
            onClick={() => onChange(scene)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-500 border ${
              active
                ? scene === 'qingyunian'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                : 'text-zinc-500 hover:text-zinc-300 border-zinc-700/50 hover:border-zinc-600'
            }`}
          >
            {data.title}
          </button>
        )
      })}
    </div>
  )
}
