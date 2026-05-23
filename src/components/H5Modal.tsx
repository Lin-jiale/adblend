import { useCallback, useState } from 'react'
import { X, Star, Gift, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react'
import type { AdConfig } from '@/types'

interface H5ModalProps {
  adConfig: AdConfig
  onClose: () => void
}

const BENEFIT_ITEMS_GAME = [
  '萧炎同款【异火限定绝版坐骑】×1',
  '公测限定全套流光时装 + 高级招募令 ×30',
  '腾讯视频尊享【不屈火莲】限定动态弹幕徽章',
]

const BENEFIT_ITEMS_ECOMMERCE = [
  '立即解锁【范闲限时高燃专属弹幕特效皮肤】',
  '获赠《庆余年》正版独家联名精美徽章卡片',
  '获得腾讯视频 VIP 黄金会员月卡抽奖券 ×1',
]

export default function H5Modal({ adConfig, onClose }: H5ModalProps) {
  const isGame = adConfig.type === 'video'
  const [lotteryStatus, setLotteryStatus] = useState<'idle' | 'spinning' | 'won'>('idle')

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const lotteryRow = (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-amber-500" />
          <span className="text-[11px] font-bold text-gray-700">联动专属福利抽奖</span>
        </div>
        {lotteryStatus === 'idle' && (
          <button
            onClick={() => { setLotteryStatus('spinning'); setTimeout(() => setLotteryStatus('won'), 1500) }}
            className="text-[10px] bg-amber-500 text-white px-3 py-1 rounded-full font-bold shadow-sm"
          >
            点击抽取
          </button>
        )}
        {lotteryStatus === 'spinning' && <span className="text-[10px] text-gray-400 animate-pulse">正在转动...</span>}
        {lotteryStatus === 'won' && <span className="text-[10px] text-green-600 font-bold">已中奖！</span>}
      </div>
      <div className="text-[9px] text-gray-400 mt-1 ml-1">
        {isGame
          ? '已有 85,671 位热血玩家成功参与抽奖'
          : '已有 12,392 位剧迷成功参与抽奖'}
      </div>
    </div>
  )

  return (
    <>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity"
        onClick={handleClose}
      />

      <div className="absolute bottom-0 left-0 right-0 h-[75%] z-[100] bg-white rounded-t-3xl flex flex-col overflow-hidden shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-0">
        <div className="shrink-0 flex items-center justify-center pt-3 pb-3 relative border-b border-gray-100 bg-gray-50/50">
          <div className="w-12 h-1.5 rounded-full bg-gray-300" />
          <span className="absolute left-4 text-[10px] text-gray-400 font-semibold flex items-center gap-1">
            <ShieldCheck size={12} className="text-gray-400" />
            第三方授权页面
          </span>
          <button
            onClick={handleClose}
            className="absolute right-4 top-2.5 w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
          {isGame ? (
            <div className="flex flex-col h-full">
              <div className="px-5 pt-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                  <Gift className="w-3 h-3" />
                  {adConfig.ctaText}
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
                <img
                  src={`${import.meta.env.BASE_URL}assets/nsh.jpg`}
                  alt="逆水寒Icon"
                  className="w-16 h-16 rounded-2xl shadow-md border border-gray-100 shrink-0 object-contain bg-black"
                />
                <div className="flex-1">
                  <div className="text-base font-bold text-gray-900">逆水寒：会呼吸的江湖</div>
                  <div className="text-xs text-blue-600 font-bold mt-0.5">网易移动游戏 · 旗舰级武侠</div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-700 font-bold">4.9</span>
                    <span className="text-[10px] text-gray-400 ml-1">· 128 万个评分</span>
                  </div>
                </div>
              </div>

              {/* 抽奖小组件 */}
              {lotteryRow}

              {/* 权益图标列表 */}
              <div className="px-5 pt-2 pb-2">
                <h4 className="text-xs font-bold text-gray-900 mb-3 tracking-wider uppercase flex items-center gap-1.5">
                  <div className="w-1 h-3 bg-amber-500 rounded-full" />
                  影游联动专享福利
                </h4>
                <div className="space-y-2">
                  {BENEFIT_ITEMS_GAME.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4">
                <h4 className="text-xs font-bold text-gray-900 mb-3 tracking-wider uppercase flex items-center gap-1.5">
                  <div className="w-1 h-3 bg-blue-600 rounded-full" />
                  官方精彩实机
                </h4>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="w-48 h-32 flex-shrink-0 bg-gray-900 rounded-xl border border-gray-200 overflow-hidden relative flex items-center justify-center shadow-sm"
                    >
                      <div className="absolute w-[200px] h-[200px] flex items-center justify-center rotate-90">
                        <img
                          src={`${import.meta.env.BASE_URL}assets/nsh-${num}.jpg`}
                          alt={`逆水寒截图${num}`}
                          className="max-w-full max-h-full object-contain drop-shadow-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4">
                <div className="text-sm font-bold text-gray-900 mb-2">应用简介</div>
                <div className="text-[11px] text-gray-500 leading-relaxed text-justify bg-gray-50 p-3 rounded-lg border border-gray-100">
                  网易颠覆级武侠巨作，会呼吸的江湖。深度融合动态情绪感知引擎，为您保留绝版联动特权。由于平台限制，请前往第三方官方网页获取完整游戏体验。
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="px-5 pt-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                  <Gift className="w-3 h-3" />
                  {adConfig.ctaText}
                </div>
              </div>

              <div className="px-5 pt-4">
                <div className="w-full h-56 bg-white border border-gray-100 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-sm">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/dpty.jpg`}
                    alt="东鹏特饮实物"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-[9px] px-2 py-0.5 rounded-full font-bold">正品溯源</div>
                </div>
              </div>

              {/* 抽奖小组件 */}
              {lotteryRow}

              <div className="px-5 pt-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-red-500">¥</span>
                  <span className="text-3xl font-black text-red-500 tracking-tight">59.9</span>
                  <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded ml-2 border border-red-100">专享价</span>
                  <span className="text-xs text-gray-400 line-through ml-auto">¥79.9</span>
                </div>
                <div className="text-sm font-extrabold text-gray-900 mt-3 leading-snug">
                  东鹏特饮 维生素功能饮料 250ml*24罐 整箱装 剧迷提神补充能量官方正品
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    🛡️ 第三方正品保障
                  </span>
                  <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    📦 极速发货
                  </span>
                </div>
              </div>

              {/* 权益图标列表 */}
              <div className="px-5 pt-4 pb-2">
                <h4 className="text-xs font-bold text-gray-900 mb-3 tracking-wider uppercase flex items-center gap-1.5">
                  <div className="w-1 h-3 bg-red-500 rounded-full" />
                  剧迷专属福利
                </h4>
                <div className="space-y-2">
                  {BENEFIT_ITEMS_ECOMMERCE.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部主转化按钮 — 全程可见 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-2.5 flex items-center shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-20">
          {isGame ? (
            <button
              onClick={() => window.open('https://h.163.com', '_blank')}
              className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md"
            >
              跳转第三方网页下载
              <ExternalLink className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => window.open('https://3.cn/2P-bjkm7?jkl=@YCGIO7hT2y', '_blank')}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md shadow-red-500/20"
            >
              跳转第三方平台
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
