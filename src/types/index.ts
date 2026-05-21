/** 场景标识 */
export type Scene = 'qingyunian' | 'doupo'

/** 广告素材形态 */
export type AdType = 'image' | 'video'

/** 广告素材配置 */
export interface AdConfig {
  type: AdType
  url: string
  ctaText: string
}

/** 弹幕条目 */
export interface DanmakuItem {
  time: number
  text: string
}

/** 实时标签条目 */
export interface LiveTagItem {
  time: number
  tags: string[]
}

/** 终端日志条目 */
export interface SceneLog {
  time: number
  text: string
}

/** 单个场景的完整数据包 */
export interface SceneData {
  title: string
  mainVideoUrl: string
  adTriggerTime: number
  ad: AdConfig
  liveTags: LiveTagItem[]
  danmaku: DanmakuItem[]
  logs: SceneLog[]
}
