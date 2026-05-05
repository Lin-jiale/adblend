import type { DanmakuItem } from '@/types'

let danmakuId = 0

function makeId(): string {
  return `dm-${++danmakuId}-${Date.now()}`
}

export function generateTraditionalDanmaku(): DanmakuItem[] {
  danmakuId = 0
  const texts = [
    '？？？又来广告',
    '太扫兴了！',
    '我要充会员跳过',
    '又来硬广，烦不烦',
    '退钱！退钱！',
    '正看到精彩的地方',
    '60秒？？你认真的？',
    '能不能别插广告了',
    '真的烦这种硬广',
    '果断关掉换个平台',
  ]
  return texts.map((text, i) => ({
    id: makeId(),
    text,
    speed: 7,
    top: 8 + (i % 8) * 10,
    delay: i * 1200,
  }))
}

export function generateAiDanmaku(): DanmakuItem[] {
  danmakuId = 0
  const texts = [
    '哈哈这广告绝了',
    '这彩蛋我吃！',
    '猝不及防被种草',
    '这才是广告该有的样子',
    '范闲同款？买买买',
    '太丝滑了吧这个',
    'AI 还能这么玩？',
    '设计师加鸡腿！',
    '种草了种草了',
    '比硬广好一万倍',
    '这种广告多来点',
    '广告比正片还好看',
  ]
  return texts.map((text, i) => ({
    id: makeId(),
    text,
    speed: 7,
    top: 6 + (i % 8) * 10,
    delay: i * 1400,
  }))
}
