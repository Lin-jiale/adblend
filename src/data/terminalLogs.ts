import type { LogEntry } from '@/types'

export const terminalLogs: LogEntry[] = [
  {
    id: 1,
    prefix: '[System]',
    message: 'AdBlend AI Engine v3.2.1 Ready...',
    delay: 500,
  },
  {
    id: 2,
    prefix: '[System]',
    message: 'Waiting for video stream...',
    delay: 600,
  },
  {
    id: 3,
    prefix: '[System]',
    message: 'DASH stream connected: Audio / Video / Subtitle channels active.',
    delay: 500,
  },
  {
    id: 4,
    prefix: '[Pipeline]',
    message: 'Frame extraction @ 2fps | Resolution: 1920x1080 | Buffer: OK',
    delay: 600,
  },
  {
    id: 5,
    prefix: '[System]',
    message: 'NLP / Emotion / Ad-Matcher modules loaded. Awaiting timeline triggers...',
    delay: 800,
  },
]
