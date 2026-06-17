<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGoBack } from '@/composables/useGoBack'
import { showToast } from 'vant'

const goBack = useGoBack()
const text = ref('')
const images = ref<string[]>([])
const location = ref('')
const visibility = ref('公开')
const remind = ref('')

const canPublish = computed(() => text.value.trim().length > 0 || images.value.length > 0)

const onUpload = () => {
  if (images.value.length >= 9) { showToast('最多上传9张图片'); return }
  images.value.push(`https://picsum.photos/seed/upload${Date.now()}${images.value.length}/400/400`)
}
const removeImage = (i: number) => { images.value.splice(i, 1) }

const onLocation = () => { location.value = location.value ? '' : '北京·朝阳区' }
const onVisibility = () => {
  const opts = ['公开', '仅校友可见', '仅好友可见', '私密']
  const idx = opts.indexOf(visibility.value)
  visibility.value = opts[(idx + 1) % opts.length]
}
const onRemind = () => { remind.value = remind.value ? '' : '李明远' }

const onSubmit = () => {
  if (!canPublish.value) return
  showToast('发布成功')
  setTimeout(() => goBack(), 800)
}
</script>

<template>
  <div class="wx-publish">
    <!-- 顶部导航 -->
    <div class="wx-nav">
      <span class="wx-cancel" @click="goBack">取消</span>
      <span
        class="wx-publish-btn"
        :class="{ active: canPublish }"
        @click="onSubmit"
      >发表</span>
    </div>

    <!-- 输入区 -->
    <div class="wx-content">
      <textarea
        v-model="text"
        class="wx-textarea"
        placeholder="这一刻的想法..."
        rows="6"
      />

      <!-- 九宫格图片 -->
      <div class="wx-images">
        <div v-for="(img, i) in images" :key="i" class="wx-image-cell">
          <img :src="img" />
          <span class="wx-remove" @click="removeImage(i)">×</span>
        </div>
        <div v-if="images.length < 9" class="wx-image-add" @click="onUpload">
          <van-icon name="photograph" size="32" color="#bbb" />
        </div>
      </div>
    </div>

    <!-- 选项列表 -->
    <div class="wx-options">
      <div class="wx-opt" @click="onLocation">
        <van-icon name="location-o" size="18" color="#888" />
        <span class="wx-opt-label">所在位置</span>
        <span class="wx-opt-value">{{ location || '不显示位置' }}</span>
        <van-icon name="arrow" color="#ccc" size="14" />
      </div>
      <div class="wx-opt" @click="onRemind">
        <van-icon name="manager-o" size="18" color="#888" />
        <span class="wx-opt-label">提醒谁看</span>
        <span class="wx-opt-value">{{ remind || '无' }}</span>
        <van-icon name="arrow" color="#ccc" size="14" />
      </div>
      <div class="wx-opt" @click="onVisibility">
        <van-icon name="eye-o" size="18" color="#888" />
        <span class="wx-opt-label">谁可以看</span>
        <span class="wx-opt-value">{{ visibility }}</span>
        <van-icon name="arrow" color="#ccc" size="14" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wx-publish { min-height: 100vh; background: #ededed; }

.wx-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; background: #ededed;
}
.wx-cancel { font-size: 16px; color: #333; }
.wx-publish-btn {
  font-size: 15px; padding: 6px 14px; border-radius: 4px;
  background: #d1d1d1; color: #fff; transition: all 0.2s;
}
.wx-publish-btn.active { background: #07c160; }

.wx-content { background: #fff; padding: 16px; }
.wx-textarea {
  width: 100%; border: none; outline: none; resize: none;
  font-size: 16px; line-height: 1.6; color: #333;
  background: transparent; font-family: inherit;
}
.wx-textarea::placeholder { color: #c0c0c0; }

/* 九宫格 */
.wx-images {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 4px; margin-top: 12px;
}
.wx-image-cell { position: relative; aspect-ratio: 1; }
.wx-image-cell img { width: 100%; height: 100%; object-fit: cover; }
.wx-remove {
  position: absolute; top: -6px; right: -6px;
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(0,0,0,0.6); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; line-height: 1;
}
.wx-image-add {
  aspect-ratio: 1; background: #f5f5f5;
  display: flex; align-items: center; justify-content: center;
}

/* 选项 */
.wx-options { margin-top: 8px; background: #fff; }
.wx-opt {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 16px; border-bottom: 1px solid #f0f0f0;
}
.wx-opt:last-child { border-bottom: none; }
.wx-opt-label { font-size: 15px; color: #333; flex: 1; }
.wx-opt-value { font-size: 14px; color: #999; }
</style>
