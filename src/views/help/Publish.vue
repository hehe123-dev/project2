<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
const router = useRouter()
const goBack = useGoBack()
const form = ref({ title: '', desc: '' })
const onSubmit = () => {
  if (!form.value.title || !form.value.desc) { showToast('请填写需求标的和描述'); return }
  showToast('求助信息发布成功！')
  setTimeout(() => goBack(), 1500)
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="发布求助信息" left-arrow @click-left="goBack" fixed placeholder />
    <van-form @submit="onSubmit" style="padding: 16px">
      <van-cell-group inset>
        <van-field v-model="form.title" label="需求标的" placeholder="请输入需求标题" required />
        <van-field v-model="form.desc" label="需求描述" type="textarea" rows="5" placeholder="请详细描述您的需求..." required />
      </van-cell-group>
      <div style="margin-top: 24px">
        <van-button type="primary" block round native-type="submit" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">提交发布</van-button>
      </div>
    </van-form>
  </div>
</template>
