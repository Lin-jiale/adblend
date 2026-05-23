import type { SceneData } from '@/types'

/**
 * AdBlend V7.0 终极工业封板数据字典
 */
export const mockData: Record<string, SceneData> = {
  qingyunian: {
    title: '庆余年',
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
      { time: 35, tags: ['危机解除', '剧情平缓'] },
    ],
    danmaku: [
      { time: 2, text: '第一集打卡！' },
      { time: 5, text: '闲哥帅爆' },
      { time: 8, text: '前方高能预警' },
      { time: 16, text: '局势开始不对劲了...' },
      { time: 20, text: '太惨了吧，顶住啊' },
      { time: 21, text: '范闲快站起来！！' },
      { time: 23, text: '绝境求生，心跳加速' },
      { time: 25, text: '快喝口东鹏特饮提提神吧闲哥！' },
      { time: 28, text: '前面的弹幕神预言' },
      { time: 32, text: '这广告绝了，毫无违和感' },
      { time: 45, text: '期待下一集' },
    ],
    logs: [
      {
        time: 0,
        text: '[Pipeline] System Init. Task_ID: #8848_QYN. Context loaded successfully.',
      },
      {
        time: 5.0,
        text: '[Monitor] Continuous indexing active. Baseline danmaku density: 0.5 msg/s. Sentiment: Stable.',
      },
      {
        time: 14.0,
        text: '[Monitor] Optical Flow stable. Danmaku keywords filtered: [打卡, 期待]. Waiting for triggers...',
      },
      {
        time: 20.5,
        text: '[Cache Hit] Fetching Offline Index (CV/ASR) from Redis... Success.',
      },
      {
        time: 21.0,
        text: "[Stream Parse] Danmaku spike detected (>3 msg/s)! Extracted: ['绝境', '求生', '惨'].",
      },
      {
        time: 23.0,
        text: "[Vectorization] Scene_Tags: ['高压', '求生', '急需能量'] -> Multi-modal Vector Generated.",
      },
      {
        time: 25.0,
        text: "[AI Matcher] Ad_Tags: ['回血', 'IP联动_庆余年'] (SKU_DRINK_DP). Cosine_Similarity: 0.985",
      },
      {
        time: 25.5,
        text: '[Ranking] Candidate Pool: 3. Winner: SKU_DRINK_DP (eCPM: ¥125.40). Bidding Success.',
      },
      {
        time: 26.0,
        text: "[Renderer] Threshold crossed (>0.95). Action: Inject_Component(type='Image', hook='IP_Reward')... ✅",
      },
      {
        time: 26.5,
        text: '[Tracking] Impression Beacon received. Billing cycle initiated.',
      },
    ],
  },
  doupo: {
    title: '斗破苍穹',
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
      { time: 45, tags: ['战斗结束', '余波荡漾'] },
    ],
    danmaku: [
      { time: 3, text: '三年之约，血债血偿！' },
      { time: 6, text: '云山老狗拿命来！' },
      { time: 10, text: '萧炎你这个疯子哈哈哈' },
      { time: 15, text: 'BGM压迫感拉满，退后' },
      { time: 22, text: '前方核能！！！' },
      { time: 27, text: '老子跟你拼了！太燃了！' },
      { time: 32, text: '佛怒火莲准备！' },
      { time: 35, text: '经费在燃烧！！' },
      { time: 38, text: '爆炸输出！震撼全场！' },
      { time: 41, text: '这福利气泡绝了，无缝衔接异火' },
      { time: 48, text: '国漫天花板' },
    ],
    logs: [
      {
        time: 0,
        text: '[Pipeline] System Init. Task_ID: #9527_DPCQ. Context loaded successfully.',
      },
      {
        time: 10.0,
        text: '[Monitor] Continuous indexing active. Baseline danmaku density: 1.0 msg/s. Sentiment: Stable.',
      },
      {
        time: 22.0,
        text: '[Monitor] Minor optical flow detected. Danmaku keywords filtered: [高能, 期待]. No threshold crossed.',
      },
      {
        time: 32.5,
        text: '[Cache Hit] Fetching Offline Index (CV/ASR) from Redis... Success.',
      },
      {
        time: 33.0,
        text: "[Stream Parse] Danmaku density surge (4x baseline)! Extracted: ['拼了', '佛怒火莲', '燃'].",
      },
      {
        time: 35.0,
        text: "[Vectorization] Scene_Tags: ['战斗爆发', '热血', '绝地反击'] -> Multi-modal Vector Generated.",
      },
      {
        time: 37.0,
        text: "[AI Matcher] Ad_Tags: ['硬核战斗', '影游联动_斗破'] (SKU_GAME_NSH). Cosine_Similarity: 0.992",
      },
      {
        time: 37.5,
        text: '[Ranking] Candidate Pool: 5. Winner: SKU_GAME_NSH (eCPM: ¥280.50). Bidding Success.',
      },
      {
        time: 38.0,
        text: "[Renderer] Threshold crossed (>0.95). Action: Inject_Component(type='Video', muted=true)... ✅",
      },
      {
        time: 38.5,
        text: '[Tracking] Impression Beacon received. Billing cycle initiated.',
      },
    ],
  },
}
