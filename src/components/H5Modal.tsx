import { useCallback } from 'react'
import { X, Star, ShoppingCart, Download, Gift } from 'lucide-react'
import type { AdConfig } from '@/types'

interface H5ModalProps {
  adConfig: AdConfig
  onClose: () => void
}

export default function H5Modal({ adConfig, onClose }: H5ModalProps) {
  const isVideo = adConfig.type === 'video'

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[90]"
        onClick={handleClose}
      />

      {/* 半屏 H5 面板 */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] z-[100] bg-white rounded-t-3xl flex flex-col overflow-hidden shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-0">
        {/* 顶部拖拽指示器 + 关闭 */}
        <div className="shrink-0 flex items-center justify-center pt-3 pb-2 relative border-b border-gray-100">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
          <button
            onClick={handleClose}
            className="absolute right-4 top-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto">
          {isVideo ? (
            /* ── 游戏下载详情页 ── */
            <div className="flex flex-col h-full">
              {/* IP 联名福利 Badge */}
              <div className="px-6 pt-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md shadow-violet-500/20">
                  <Gift className="w-3 h-3" />
                  {adConfig.ctaText}
                </div>
              </div>

              {/* 应用图标区 */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-black">逆</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-gray-900">逆水寒 · 实机试玩</div>
                  <div className="text-xs text-gray-500 mt-0.5">网易 · 旗舰级武侠开放世界</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-700 font-bold">4.9</span>
                    <span className="text-[10px] text-gray-400">· 128 万评分</span>
                  </div>
                </div>
              </div>

              {/* 截图预览 */}
              <div className="px-6 py-4 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-[9px] text-gray-400 font-bold"
                  >
                    实机截图 {i}
                  </div>
                ))}
              </div>

              {/* 描述 */}
              <div className="px-6 pb-4">
                <div className="text-sm font-bold text-gray-900 mb-2">硬核武侠动作手游</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  雷火工作室倾力打造，全场景可破坏物理引擎。千人同屏战场、300+ 连招组合。今天登陆即送限定时装「墨染」。
                </div>
              </div>

              <div className="flex-1" />

              {/* 底部固定按钮 */}
              <div className="shrink-0 px-6 pb-8 pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                  }}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  立即获取
                </button>
              </div>
            </div>
          ) : (
            /* ── 电商详情页 ── */
            <div className="flex flex-col h-full">
              {/* IP 联名福利 Badge */}
              <div className="px-6 pt-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md shadow-red-500/20">
                  <Gift className="w-3 h-3" />
                  {adConfig.ctaText}
                </div>
              </div>

              {/* 商品大图 */}
              <div className="px-6 pt-4">
                <div className="w-full aspect-video bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl">🥤</span>
                </div>
              </div>

              {/* 价格信息 */}
              <div className="px-6 pt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-red-500">¥</span>
                  <span className="text-3xl font-black text-red-500">59.9</span>
                  <span className="text-xs text-gray-400 line-through ml-2">¥99.9</span>
                </div>
                <div className="text-sm font-bold text-gray-900 mt-2">东鹏特饮 · 京都特供回血版</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    已售 10万+
                  </span>
                  <span className="text-[10px] text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                    ⭐ 4.8 · 2.3万评价
                  </span>
                </div>
              </div>

              {/* 规格选择 */}
              <div className="px-6 pt-4 space-y-2">
                <div className="text-xs text-gray-500">选择规格</div>
                <div className="grid grid-cols-3 gap-2">
                  {['6 瓶装', '12 瓶装', '24 瓶装'].map((spec, i) => (
                    <button
                      key={spec}
                      className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                        i === 1
                          ? 'bg-red-50 text-red-500 border-red-300'
                          : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1" />

              {/* 底部固定按钮 */}
              <div className="shrink-0 px-6 pb-8 pt-3 flex gap-3">
                <button className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-200">
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                  }}
                  className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-500/25 transition-all active:scale-[0.98]"
                >
                  立即购买
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
