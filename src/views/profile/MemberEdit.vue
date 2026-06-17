<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
const companies = ref([{ name: '', title: '', address: '', industry: '', intro: '' }])
const products = ref([{ name: '', field: '', industry: '', intro: '' }])

const addCompany = () => companies.value.push({ name: '', title: '', address: '', industry: '', intro: '' })
const addProduct = () => products.value.push({ name: '', field: '', industry: '', intro: '' })
const onSubmit = () => { showToast('会员资料保存成功'); setTimeout(() => goBack(), 1000) }
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="完善会员资料" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px">
      <div v-for="(c, i) in companies" :key="'c' + i" class="form-card">
        <div class="form-card-title">关联企业 {{ i + 1 }}</div>
        <van-cell-group inset>
          <van-field v-model="c.name" label="企业名称" placeholder="请输入企业名称" />
          <van-field v-model="c.title" label="担任职务" placeholder="如：创始人兼CEO" />
          <van-field v-model="c.address" label="企业地址" />
          <van-field v-model="c.industry" label="行业选择" placeholder="按国家行业标准" />
          <van-field v-model="c.intro" label="企业简介" type="textarea" rows="2" placeholder="简单介绍企业..." />
        </van-cell-group>
      </div>
      <van-button plain block round size="small" @click="addCompany" style="margin-top: 8px">+ 添加关联企业</van-button>

      <div v-for="(p, i) in products" :key="'p' + i" class="form-card" style="margin-top: 16px">
        <div class="form-card-title">关联产品 {{ i + 1 }}</div>
        <van-cell-group inset>
          <van-field v-model="p.name" label="产品名称" />
          <van-field v-model="p.field" label="应用领域" />
          <van-field v-model="p.industry" label="所属行业" />
          <van-field v-model="p.intro" label="产品简介" type="textarea" rows="2" />
        </van-cell-group>
      </div>
      <van-button plain block round size="small" @click="addProduct" style="margin-top: 8px">+ 添加关联产品</van-button>

      <van-button type="primary" block round @click="onSubmit" style="margin-top: 24px" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">保存会员资料</van-button>
    </div>
  </div>
</template>

<style scoped>
.form-card { margin-bottom: 8px; }
.form-card-title { font-size: 14px; font-weight: 600; padding: 8px 0 8px 4px; color: var(--primary); }
</style>
