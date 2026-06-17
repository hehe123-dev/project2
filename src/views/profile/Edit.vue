<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
const form = ref({
  name: '赵明辉', gender: '男', birth: '1987-05', phone: '138****8888', email: 'zhaomh@example.com',
  school: '自动化学院', major: '控制科学与工程', year: '2005级', degree: '硕士',
  hometown: '江苏南京', city: '北京', tags: '创业,人工智能,智能制造', intro: ''
})

const onSubmit = () => { showToast('信息保存成功'); setTimeout(() => goBack(), 1000) }
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="编辑校友信息" left-arrow @click-left="goBack" fixed placeholder />
    <van-form @submit="onSubmit" style="padding: 16px">
      <div class="form-section">个人基础信息</div>
      <van-cell-group inset>
        <van-field v-model="form.name" label="姓名" required />
        <van-field v-model="form.gender" label="性别" />
        <van-field v-model="form.birth" label="出生年月" placeholder="YYYY-MM" />
        <van-field v-model="form.phone" label="电话" required />
        <van-field v-model="form.email" label="邮箱" />
      </van-cell-group>

      <div class="form-section">校友认证信息</div>
      <van-cell-group inset>
        <van-field v-model="form.school" label="学校" required />
        <van-field v-model="form.major" label="院系" required />
        <van-field v-model="form.year" label="入学年份" required />
        <van-field v-model="form.degree" label="学历层次" />
      </van-cell-group>

      <div class="form-section">其它信息</div>
      <van-cell-group inset>
        <van-field v-model="form.hometown" label="籍贯" />
        <van-field v-model="form.city" label="现住城市" />
        <van-field v-model="form.tags" label="个人标签" placeholder="用逗号分隔" />
        <van-field v-model="form.intro" label="个人简介" type="textarea" rows="3" placeholder="简单介绍一下自己..." />
      </van-cell-group>

      <div style="margin-top: 24px">
        <van-button type="primary" block round native-type="submit" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.form-section { font-size: 13px; font-weight: 600; color: var(--text-light); padding: 16px 0 8px 4px; }
</style>
