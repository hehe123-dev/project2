<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
const showQR = ref(false)
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="服务提供方详情" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px; text-align: center">
      <img src="https://picsum.photos/seed/prov/200/200" style="width:80px;height:80px;border-radius:16px;margin-bottom:12px" />
      <div style="font-size:18px;font-weight:700">服务机构名称</div>
      <div style="font-size:13px;color:var(--text-light);margin-top:4px">驻站服务方</div>
      <div style="margin-top:16px;font-size:14px;line-height:1.8;text-align:left;background:#fff;padding:14px;border-radius:8px">
        机构简介：该机构与白石桥七号平台签署合作协议，为校友和会员提供专属服务。
      </div>
      <van-button type="primary" block round style="margin-top:24px" @click="showQR = true" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">
        <van-icon name="qr" /> 联系Ta
      </van-button>
    </div>
    <van-popup v-model:show="showQR" round :style="{ width: '80%', padding: '30px', textAlign: 'center' }">
      <div style="font-size:16px;font-weight:600;margin-bottom:16px">微信扫码联系</div>
      <img src="https://picsum.photos/seed/qr/300/300" style="width:200px;height:200px" />
      <div style="font-size:12px;color:var(--text-lighter);margin-top:8px">长按识别二维码添加微信</div>
    </van-popup>
  </div>
</template>
