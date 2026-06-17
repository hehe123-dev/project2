<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Loading } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: string
  size?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const showUrlInput = ref(false)
const urlValue = ref('')

const TARGET = props.size || 600

const cropToSquare = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('图片加载失败'))
      img.onload = () => {
        const side = Math.min(img.width, img.height)
        const sx = (img.width - side) / 2
        const sy = (img.height - side) / 2
        const canvas = document.createElement('canvas')
        canvas.width = TARGET
        canvas.height = TARGET
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas不可用'))
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, TARGET, TARGET)
        ctx.drawImage(img, sx, sy, side, side, 0, 0, TARGET, TARGET)
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        resolve(canvas.toDataURL(mime, 0.9))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })

const onPickFile = () => fileInputRef.value?.click()

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    ElMessage.warning('请选择图片文件')
    target.value = ''
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过 5MB')
    target.value = ''
    return
  }
  loading.value = true
  try {
    const dataUrl = await cropToSquare(file)
    emit('update:modelValue', dataUrl)
    ElMessage.success('封面已自动裁剪为 1:1')
  } catch (err: any) {
    ElMessage.error(err?.message || '处理图片失败')
  } finally {
    loading.value = false
    target.value = ''
  }
}

const onRemove = () => emit('update:modelValue', '')

const onUrlConfirm = () => {
  const url = urlValue.value.trim()
  if (!url) return
  emit('update:modelValue', url)
  urlValue.value = ''
  showUrlInput.value = false
}
</script>

<template>
  <div class="cover-uploader">
    <div class="cover-box" :class="{ 'has-image': modelValue, 'is-loading': loading }">
      <img v-if="modelValue" :src="modelValue" class="cover-img" />
      <div v-else class="cover-placeholder" @click="onPickFile">
        <el-icon :size="28"><Plus /></el-icon>
        <div class="placeholder-text">点击上传封面</div>
        <div class="placeholder-hint">1:1 比例 / ≤5MB</div>
      </div>
      <div v-if="modelValue" class="cover-mask">
        <el-button size="small" type="primary" @click="onPickFile">更换</el-button>
        <el-button size="small" type="danger" @click="onRemove">移除</el-button>
      </div>
      <div v-if="loading" class="cover-loading">
        <el-icon class="is-loading"><Loading /></el-icon>
      </div>
    </div>

    <div class="cover-actions">
      <el-button size="small" link type="primary" @click="onPickFile">上传图片</el-button>
      <el-divider direction="vertical" />
      <el-button size="small" link type="primary" @click="showUrlInput = !showUrlInput">
        {{ showUrlInput ? '收起URL' : '使用URL' }}
      </el-button>
    </div>

    <div v-if="showUrlInput" class="url-row">
      <el-input v-model="urlValue" placeholder="粘贴图片URL（建议1:1比例）" size="small" @keyup.enter="onUrlConfirm">
        <template #append>
          <el-button @click="onUrlConfirm">确定</el-button>
        </template>
      </el-input>
    </div>

    <input ref="fileInputRef" type="file" accept="image/*" style="display:none" @change="onFileChange" />
  </div>
</template>

<style scoped>
.cover-uploader { display: flex; flex-direction: column; gap: 6px; }
.cover-box {
  position: relative;
  width: 160px; height: 160px;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
  background: #fafbfc;
  transition: border-color 0.2s;
}
.cover-box:hover { border-color: #6fa4cf; }
.cover-box.has-image { border-style: solid; }
.cover-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cover-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; color: #909399;
}
.placeholder-text { font-size: 13px; margin-top: 6px; }
.placeholder-hint { font-size: 11px; color: #c0c4cc; margin-top: 2px; }
.cover-mask {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  opacity: 0; transition: opacity 0.2s;
}
.cover-box:hover .cover-mask { opacity: 1; }
.cover-loading {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.7);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #6fa4cf;
}
.cover-actions { display: flex; align-items: center; font-size: 12px; }
.url-row { width: 320px; }
</style>
