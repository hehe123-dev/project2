<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { showToast } from 'vant'

const router = useRouter()
const goBack = useGoBack()
const form = ref({ title: '', location: '', startDate: '', endDate: '', deadline: '', fee: 0, desc: '' })
const cover = ref<string>('')
const images = ref<string[]>([])

const uploadCover = () => {
  cover.value = `https://picsum.photos/seed/cover${Date.now()}/800/400`
  showToast('封面已上传')
}
const removeCover = () => { cover.value = '' }

const uploadImage = () => {
  if (images.value.length >= 6) { showToast('最多上传6张'); return }
  images.value.push(`https://picsum.photos/seed/act${Date.now()}${images.value.length}/400/400`)
}
const removeImage = (i: number) => { images.value.splice(i, 1) }

const onSubmit = () => {
  if (!form.value.title) { showToast('请填写活动标题'); return }
  showToast('活动发布成功！等待审核')
  setTimeout(() => goBack(), 1500)
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="发布校友活动" left-arrow @click-left="goBack" fixed placeholder />
    <van-form @submit="onSubmit" style="padding: 16px">
      <!-- 封面图上传 -->
      <div class="cover-section">
        <div class="section-label">活动封面</div>
        <div v-if="!cover" class="cover-upload" @click="uploadCover">
          <van-icon name="photograph" size="32" color="#ccc" />
          <span class="cover-tip">点击上传封面图（建议 16:9）</span>
        </div>
        <div v-else class="cover-preview">
          <img :src="cover" />
          <div class="cover-mask">
            <van-icon name="photo-o" size="20" color="#fff" @click="uploadCover" />
            <van-icon name="delete-o" size="20" color="#fff" @click="removeCover" />
          </div>
        </div>
      </div>

      <van-cell-group inset>
        <van-field v-model="form.title" label="活动标题" placeholder="请输入活动标题" required />
        <van-field v-model="form.location" label="活动地点" placeholder="请输入活动地点" />
        <van-field v-model="form.startDate" label="开始日期" placeholder="选择日期" />
        <van-field v-model="form.endDate" label="结束日期" placeholder="选择日期" />
        <van-field v-model="form.deadline" label="报名截止" placeholder="选择截止日期" />
        <van-field v-model="form.fee" label="活动费用" placeholder="0表示免费" type="number" />
        <van-field v-model="form.desc" label="活动描述" type="textarea" rows="4" placeholder="请输入活动详细描述..." />
      </van-cell-group>

      <!-- 详情图集 -->
      <div class="section-label" style="margin-top: 16px">活动详情图（最多6张）</div>
      <div class="image-grid">
        <div v-for="(img, i) in images" :key="i" class="img-cell">
          <img :src="img" />
          <span class="img-remove" @click="removeImage(i)">×</span>
        </div>
        <div v-if="images.length < 6" class="img-add" @click="uploadImage">
          <van-icon name="plus" size="24" color="#bbb" />
          <span class="add-tip">添加图片</span>
        </div>
      </div>

      <div style="margin-top: 24px">
        <van-button type="primary" block round native-type="submit" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">提交发布</van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.cover-section { margin-bottom: 16px; }
.section-label { font-size: 13px; color: var(--text-light); margin-bottom: 8px; padding-left: 4px; }

.cover-upload {
  height: 160px; border: 2px dashed #ddd; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; background: #fafafa;
}
.cover-tip { font-size: 13px; color: #999; }

.cover-preview { position: relative; height: 160px; border-radius: 12px; overflow: hidden; }
.cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.cover-mask {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0.5); padding: 8px 12px;
  display: flex; justify-content: flex-end; gap: 16px;
}

.image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.img-cell { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; }
.img-cell img { width: 100%; height: 100%; object-fit: cover; }
.img-remove {
  position: absolute; top: -2px; right: -2px;
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(0,0,0,0.6); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
.img-add {
  aspect-ratio: 1; border: 1px dashed #ddd; border-radius: 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; background: #fafafa;
}
.add-tip { font-size: 11px; color: #999; }
</style>
