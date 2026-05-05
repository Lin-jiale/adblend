import type { LogEntry } from '@/types'

export const terminalLogs: LogEntry[] = [
  {
    id: 1,
    prefix: '[System]',
    message: 'Initializing AdBlend AI Engine v3.2.1...',
    delay: 500,
  },
  {
    id: 2,
    prefix: '[System]',
    message: 'Connecting to CDN stream node: cn-shanghai-03.tencent.cdn',
    delay: 800,
  },
  {
    id: 3,
    prefix: '[System]',
    message: 'DASH stream separated: Audio / Video / Subtitle',
    delay: 400,
  },
  {
    id: 4,
    prefix: '[Pipeline]',
    message: 'Frame extraction @ 2fps | Resolution: 1920x1080 | Buffer: OK',
    delay: 600,
  },
  {
    id: 5,
    prefix: '[NLP Engine]',
    message: 'Extracting subtitle entity from timestamp 00:14:32...',
    delay: 1000,
  },
  {
    id: 6,
    prefix: '[NLP Engine]',
    message: 'Entity detected: Person=范闲 | Action=举杯 | Object=酒杯',
    delay: 500,
  },
  {
    id: 7,
    prefix: '[NLP Engine]',
    message: 'Keyword cluster found: "干杯"(0.87), "口渴"(0.72), "畅饮"(0.68)',
    delay: 700,
  },
  {
    id: 8,
    prefix: '[Emotion Model]',
    message: 'Scene emotion analysis: Joy=0.78 | Relaxed=0.65 | Excited=0.42',
    delay: 600,
  },
  {
    id: 9,
    prefix: '[Emotion Model]',
    message: 'Current scene emotion Z-Score: 2.15 (Joy / Relaxed) — High confidence',
    delay: 500,
  },
  {
    id: 10,
    prefix: '[Ad Matcher]',
    message: 'Querying Ad Pool with context vector [drink, celebration, relax]...',
    delay: 800,
  },
  {
    id: 11,
    prefix: '[Ad Matcher]',
    message: 'Match score: 0.941 | Ad ID #9527 | Category: Beverage',
    delay: 400,
  },
  {
    id: 12,
    prefix: '[Ad Matcher]',
    message: '>>> Perfect contextual match → Triggering Ad ID #9527 (Sparkling Water) <<<',
    delay: 300,
    highlight: true,
  },
  {
    id: 13,
    prefix: '[Renderer]',
    message: 'Rendering native ad overlay at coordinates (680, 320)...',
    delay: 500,
  },
  {
    id: 14,
    prefix: '[Renderer]',
    message: 'Blend mode: Soft-Light | Opacity: 0.92 | Animation: ease-in-out',
    delay: 400,
  },
  {
    id: 15,
    prefix: '[System]',
    message: 'AdBlend delivery complete. User engagement score: 0.89 ↑',
    delay: 600,
  },
]
