<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { activityList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(activityList.find(a => a.id === Number(route.params.id)) || activityList[0])
const registered = ref(false)

const doRegister = () => {
  if (item.value.fee > 0) {
    showConfirmDialog({ title: '确认报名', message: `活动费用：¥${item.value.fee}，确认缴纳费用并报名？` })
      .then(() => { registered.value = true; showToast('报名成功！请按时参加活动') })
  } else {
    registered.value = true
    showToast('报名成功！请按时参加活动')
  }
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="活动详情" left-arrow @click-left="goBack" fixed placeholder />
    <img :src="item.cover" style="width:100%;height:200px;object-fit:cover" />
    <div style="padding: 16px">
      <div style="font-size:18px;font-weight:700;margin-bottom:12px">{{ item.title }}</div>
      <van-cell-group inset>
        <van-cell title="活动时间" :value="item.date" />
        <van-cell title="活动地点" :value="item.location" />
        <van-cell title="发起人" :value="item.organizer" />
        <van-cell title="报名截止" :value="item.deadline" />
        <van-cell title="活动费用" :value="item.fee === 0 ? '免费' : '¥' + item.fee" />
      </van-cell-group>
      <div style="margin-top:16px;font-size:14px;line-height:1.8">{{ item.description }}</div>
      <div style="margin-top:16px">
        <span style="font-size:14px;font-weight:600">已报名校友</span>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
          <img v-for="i in 8" :key="i" :src="`https://picsum.photos/seed/r${i}/60/60`" style="width:36px;height:36px;border-radius:50%" />
          <div v-if="item.registered > 8" style="width:36px;height:36px;border-radius:50%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--text-light)">+{{ item.registered - 8 }}</div>
        </div>
      </div>
    </div>
    <div style="padding: 16px; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid var(--border)">
      <van-button v-if="!registered && item.status === '报名中'" type="danger" block round @click="doRegister">立即报名</van-button>
      <van-button v-else-if="registered" type="default" block round disabled>已报名</van-button>
      <van-button v-else type="default" block round disabled>报名已截止</van-button>
    </div>
  </div>
</template>
