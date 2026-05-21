import type { SceneData } from '@/types'

/**
 * AdBlend V5.0 终极工业版 — 离线在线双轨架构 (Lambda Architecture) + IP 互动钩子
 */
export const mockData: Record<string, SceneData> = {
  qingyunian: {
    title: '场景一：品牌快消 (庆余年)',
    mainVideoUrl: `${import.meta.env.BASE_URL}assets/video.mp4`,
    adTriggerTime: 26,
    ad: {
      type: 'image',
      url: `${import.meta.env.BASE_URL}assets/东鹏特饮.png`,
      ctaText: '🎁 点击解锁范闲专属弹幕特效',
    },
    liveTags: [
      { time: 0, tags: ['剧情推进', '文戏环境'] },
      { time: 20, tags: ['绝境求生', '负面高压', '能量低谷'] },
    ],
    danmaku: [
      { time: 20, text: '太惨了吧' },
      { time: 22, text: '范闲快站起来！' },
      { time: 24, text: '绝境求生啊' },
      { time: 26, text: '我要活下去！燃！' },
    ],
    logs: [
      {
        time: 0,
        text: '[Pipeline] System Init. Task_ID: #8848_QYN. Context loaded successfully.',
      },
      {
        time: 20.5,
        text: '[Cache Hit] Fetching Offline Index (CV/ASR) from Redis... Success.',
      },
      {
        time: 21.0,
        text: "[Stream Parse] Ingesting Real-time Danmaku. Extracted: ['绝境', '求生']",
      },
      {
        time: 23,
        text: "[Vectorization] Scene_Tags: ['高压', '求生', '急需能量'] -> Vector_Generated.",
      },
      {
        time: 25,
        text: "[AI Matcher] Ad_Tags: ['回血', 'IP联动_庆余年'] (SKU_DRINK_DP). Cosine_Similarity: 0.985",
      },
      {
        time: 26,
        text: "[Renderer] Threshold > 0.95. Action: Inject_Component(type='Image', hook='IP_Reward')... ✅",
      },
    ],
  },
  doupo: {
    title: '场景二：效果游戏 (斗破苍穹)',
    mainVideoUrl: `${import.meta.env.BASE_URL}assets/Video_dpcq.mp4`,
    adTriggerTime: 38,
    ad: {
      type: 'video',
      url: `${import.meta.env.BASE_URL}assets/Video_nsh.mp4`,
      ctaText: '🎁 领取萧炎专属异火坐骑',
    },
    liveTags: [
      { time: 0, tags: ['战前对峙', '暗流涌动'] },
      { time: 27, tags: ['战斗爆发', '极高光流', '异火融合'] },
    ],
    danmaku: [
      { time: 10, text: '萧炎你这个疯子哈哈哈' },
      { time: 27, text: '老子跟你拼了！太燃了！' },
      { time: 32, text: '搓大招了搓大招了' },
      { time: 35, text: '佛怒火莲！！！' },
      { time: 38, text: '经费在燃烧！' },
    ],
    logs: [
      {
        time: 0,
        text: '[Pipeline] System Init. Task_ID: #9527_DPCQ. Context loaded successfully.',
      },
      {
        time: 32.5,
        text: '[Cache Hit] Fetching Offline Index (CV/ASR) from Redis... Success.',
      },
      {
        time: 33.0,
        text: "[Stream Parse] Ingesting Real-time Danmaku. Extracted: ['佛怒火莲', '开大']",
      },
      {
        time: 35,
        text: "[Vectorization] Scene_Tags: ['战斗爆发', '热血', '绝地反击'] -> Vector_Generated.",
      },
      {
        time: 37,
        text: "[AI Matcher] Ad_Tags: ['硬核战斗', '影游联动_斗破'] (SKU_GAME_NSH). Cosine_Similarity: 0.992",
      },
      {
        time: 38,
        text: "[Renderer] Threshold > 0.95. Action: Inject_Component(type='Video', hook='IP_Reward')... ✅",
      },
    ],
  },
}
