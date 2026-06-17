<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { groupBuyList } from '@/mock/data'
import { useGoBack } from '@/composables/useGoBack'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(groupBuyList.find(g => g.id === Number(route.params.id)) || groupBuyList[0])
const quantity = ref(1)
const showSku = ref(false)

const discount = Math.round((1 - item.value.price / item.value.originalPrice) * 100)
const progress = Math.round((item.value.soldCount / item.value.totalCount) * 100)
const totalPrice = item.value.price * quantity.value

const doBuy = () => {
  showSku.value = true
}

const confirmBuy = () => {
  showConfirmDialog({
    title: '确认订单',
    message: `${item.value.title}\n数量：×${quantity.value}\n合计：¥${totalPrice}\n\n确认下单？`
  }).then(() => {
    showSku.value = false
    showToast('下单成功！')
  })
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="团购详情" left-arrow @click-left="goBack" fixed placeholder />

    <!-- 商品图片轮播 -->
    <van-swipe :autoplay="3000" indicator-color="#ee0a24" class="gb-swipe">
      <van-swipe-item v-for="(img, i) in item.images" :key="i">
        <img :src="img" class="gb-swipe-img" @click="showImagePreview({ images: item.images, startPosition: i })" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品基本信息 -->
    <div class="gb-info-section">
      <div class="gb-price-box">
        <span class="gb-current-price">¥{{ item.price }}</span>
        <span class="gb-orig-price">¥{{ item.originalPrice }}</span>
        <van-tag type="danger" size="medium">{{ discount }}% OFF</van-tag>
      </div>
      <div class="gb-title">{{ item.title }}</div>
      <div class="gb-meta">
        <span>{{ item.supplier }}</span>
        <van-tag v-for="t in item.tags" :key="t" type="danger" size="mini" plain>{{ t }}</van-tag>
      </div>
    </div>

    <!-- 团购进度 -->
    <div class="gb-progress-section">
      <div class="progress-header">
        <span>已售{{ item.soldCount }}件</span>
        <span style="color:#ee0a24">仅剩{{ item.totalCount - item.soldCount }}件</span>
      </div>
      <van-progress :percentage="progress" stroke-color="#ee0a24" stroke-width="8" />
      <div class="progress-footer">活动截止：{{ item.endDate }}</div>
    </div>

    <!-- 商品规格 -->
    <van-cell-group inset style="margin-top:10px">
      <van-cell title="商品规格" is-link @click="showSku = true">
        <template #label>
          <div v-for="s in item.specs" :key="s" class="spec-line">{{ s }}</div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 商品详情 -->
    <div class="section-label">商品详情</div>
    <div class="gb-desc">{{ item.desc }}</div>

    <!-- 配送说明 -->
    <div class="section-label">配送说明</div>
    <div class="gb-desc" style="background:#f0f9eb;color:#07c160">
      <van-icon name="logistics" /> {{ item.shipping }}
    </div>

    <!-- 底部购买栏 -->
    <div class="gb-bottom-bar">
      <div class="bottom-left">
        <span class="bottom-total">¥{{ totalPrice }}</span>
        <span class="bottom-hint">合计（不含运费）</span>
      </div>
      <van-button type="danger" round size="large" @click="doBuy" class="buy-btn">立即购买</van-button>
    </div>

    <!-- 规格/数量选择弹窗 -->
    <van-popup v-model:show="showSku" round position="bottom" :style="{ padding: '20px' }">
      <div class="sku-header">
        <img :src="item.cover" class="sku-img" />
        <div>
          <div class="sku-price">¥{{ item.price }}</div>
          <div class="sku-stock">库存 {{ item.totalCount - item.soldCount }} 件</div>
        </div>
      </div>
      <div class="sku-section">
        <div class="sku-label">数量</div>
        <van-stepper v-model="quantity" :min="1" :max="item.totalCount - item.soldCount" integer />
      </div>
      <div class="sku-total">合计：<span style="color:#ee0a24;font-size:20px;font-weight:700">¥{{ totalPrice }}</span></div>
      <van-button type="danger" block round @click="confirmBuy">确认下单</van-button>
    </van-popup>
  </div>
</template>

<style scoped>
.gb-swipe { height: 375px; }
.gb-swipe-img { width: 100%; height: 375px; object-fit: cover; cursor: pointer; }

.gb-info-section { padding: 14px 16px; background: #fff; }
.gb-price-box { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
.gb-current-price { font-size: 28px; font-weight: 700; color: #ee0a24; }
.gb-orig-price { font-size: 14px; color: var(--text-lighter); text-decoration: line-through; }
.gb-title { font-size: 16px; font-weight: 600; line-height: 1.5; margin-bottom: 8px; }
.gb-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-light); flex-wrap: wrap; }

.gb-progress-section { margin: 10px 12px; padding: 14px; background: #fff; border-radius: 8px; }
.progress-header { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
.progress-footer { font-size: 12px; color: var(--text-lighter); margin-top: 6px; }

.spec-line { font-size: 12px; color: var(--text-light); line-height: 1.6; }

.section-label { font-size: 13px; font-weight: 600; color: var(--text-light); padding: 14px 16px 6px; }
.gb-desc { padding: 12px 16px; background: #fff; font-size: 14px; line-height: 1.8; border-radius: 8px; margin: 0 12px; }

.gb-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; background: #fff;
  border-top: 1px solid var(--border);
  z-index: 50;
}
.bottom-left { display: flex; flex-direction: column; }
.bottom-total { font-size: 18px; font-weight: 700; color: #ee0a24; }
.bottom-hint { font-size: 10px; color: var(--text-lighter); }
.buy-btn { flex: 1; }

/* SKU弹窗 */
.sku-header { display: flex; gap: 12px; margin-bottom: 16px; }
.sku-img { width: 100px; height: 100px; border-radius: 8px; object-fit: cover; }
.sku-price { font-size: 20px; font-weight: 700; color: #ee0a24; }
.sku-stock { font-size: 12px; color: var(--text-lighter); margin-top: 4px; }
.sku-section { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.sku-label { font-size: 14px; }
.sku-total { text-align: right; margin-bottom: 16px; font-size: 14px; }
</style>
