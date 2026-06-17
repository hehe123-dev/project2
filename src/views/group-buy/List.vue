<script setup lang="ts">
import { useRouter } from 'vue-router'
import { groupBuyList } from '@/mock/data'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="团购专区" left-arrow @click-left="goBack" fixed placeholder />
    <div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px 12px">
      <div v-for="item in groupBuyList" :key="item.id" class="gb-card" @click="router.push('/group-buy/' + item.id)">
        <div class="gb-img-wrap">
          <img :src="item.cover" class="gb-cover" />
          <van-tag v-for="t in item.tags" :key="t" type="danger" size="mini" class="gb-tag">{{ t }}</van-tag>
        </div>
        <div class="gb-body">
          <div class="gb-title">{{ item.title }}</div>
          <div class="gb-price-row">
            <span class="gb-price">¥{{ item.price }}</span>
            <span class="gb-original">¥{{ item.originalPrice }}</span>
          </div>
          <van-progress :percentage="Math.round((item.soldCount / item.totalCount) * 100)" stroke-color="#ee0a24" stroke-width="6" />
          <div class="gb-progress-text">已售{{ item.soldCount }}件 · 截止{{ item.endDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gb-card {
  width: calc(50% - 4px);
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 4px;
}
.gb-img-wrap {
  position: relative;
}
.gb-cover {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.gb-tag {
  position: absolute;
  top: 6px;
  left: 6px;
}
.gb-body {
  padding: 10px;
}
.gb-title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
  min-height: 36px;
}
.gb-price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 6px;
}
.gb-price {
  font-size: 18px;
  font-weight: 700;
  color: #ee0a24;
}
.gb-original {
  font-size: 11px;
  color: var(--text-lighter);
  text-decoration: line-through;
}
.gb-progress-text {
  font-size: 10px;
  color: var(--text-lighter);
  margin-top: 4px;
}
</style>
