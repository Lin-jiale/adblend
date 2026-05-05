export type AdMode = 'ai' | 'traditional'

export interface LogEntry {
  id: number
  prefix: string
  message: string
  delay: number
  highlight?: boolean
}

export interface DanmakuItem {
  id: string
  text: string
  speed: number
  top: number
  delay: number
}

export interface AdBubbleInfo {
  id: string
  name: string
  tagline: string
  icon: string
  cta: string
}
