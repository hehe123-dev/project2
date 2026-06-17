<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  minHeight?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const linkInputVisible = ref(false)
const linkUrl = ref('')
const savedRange = ref<Range | null>(null)
const fontSize = ref('14')
const headingLevel = ref('p')
const fgColor = ref('#333333')

const fontSizes = ['12', '13', '14', '16', '18', '20', '24', '28', '32']
const headings = [
  { value: 'p', label: '正文' },
  { value: 'h1', label: '一级标题' },
  { value: 'h2', label: '二级标题' },
  { value: 'h3', label: '三级标题' }
]

const syncOut = () => {
  if (!editorRef.value) return
  const html = editorRef.value.innerHTML
  if (html !== props.modelValue) emit('update:modelValue', html)
}

const saveSelection = () => {
  const sel = window.getSelection()
  if (sel && sel.rangeCount > 0 && editorRef.value?.contains(sel.anchorNode)) {
    savedRange.value = sel.getRangeAt(0).cloneRange()
  }
}

const restoreSelection = () => {
  if (!savedRange.value) {
    focusEditor()
    return
  }
  const sel = window.getSelection()
  if (!sel) return
  sel.removeAllRanges()
  sel.addRange(savedRange.value)
}

const focusEditor = () => {
  editorRef.value?.focus()
}

const exec = (command: string, value?: string) => {
  restoreSelection()
  document.execCommand(command, false, value)
  syncOut()
  saveSelection()
}

const onHeadingChange = (val: string) => {
  headingLevel.value = val
  exec('formatBlock', val === 'p' ? 'P' : val.toUpperCase())
}

const onFontSizeChange = (val: string) => {
  fontSize.value = val
  restoreSelection()
  document.execCommand('fontSize', false, '7')
  if (editorRef.value) {
    editorRef.value.querySelectorAll('font[size="7"]').forEach(el => {
      const span = document.createElement('span')
      span.style.fontSize = val + 'px'
      span.innerHTML = el.innerHTML
      el.replaceWith(span)
    })
  }
  syncOut()
  saveSelection()
}

const onColorChange = (val: string) => {
  fgColor.value = val
  exec('foreColor', val)
}

const onLinkClick = () => {
  saveSelection()
  linkUrl.value = ''
  linkInputVisible.value = true
}

const confirmLink = () => {
  if (linkUrl.value.trim()) {
    exec('createLink', linkUrl.value.trim())
    if (editorRef.value) {
      editorRef.value.querySelectorAll('a').forEach(a => {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener')
      })
      syncOut()
    }
  }
  linkInputVisible.value = false
}

const onImageClick = () => {
  saveSelection()
  fileInputRef.value?.click()
}

const onImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = reader.result as string
    restoreSelection()
    const html = `<img src="${dataUrl}" style="max-width:100%;border-radius:4px;margin:8px 0" />`
    document.execCommand('insertHTML', false, html)
    syncOut()
    saveSelection()
  }
  reader.readAsDataURL(file)
  target.value = ''
}

const onImageUrlInsert = () => {
  const url = window.prompt('请输入图片URL')
  if (!url) return
  restoreSelection()
  const html = `<img src="${url}" style="max-width:100%;border-radius:4px;margin:8px 0" />`
  document.execCommand('insertHTML', false, html)
  syncOut()
  saveSelection()
}

const onClearFormat = () => {
  exec('removeFormat')
}

const onInput = () => syncOut()
const onBlur = () => saveSelection()

watch(() => props.modelValue, (val) => {
  if (editorRef.value && editorRef.value.innerHTML !== val) {
    editorRef.value.innerHTML = val || ''
  }
})

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
  nextTick(() => {
    document.addEventListener('selectionchange', onSelectionChange)
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', onSelectionChange)
})

const onSelectionChange = () => {
  if (!editorRef.value) return
  const sel = window.getSelection()
  if (sel && sel.rangeCount > 0 && editorRef.value.contains(sel.anchorNode)) {
    saveSelection()
  }
}
</script>

<template>
  <div class="rich-editor" :class="{ 'is-empty': !modelValue }">
    <div class="rich-toolbar" @mousedown.prevent>
      <select class="tb-select" :value="headingLevel" @change="onHeadingChange(($event.target as HTMLSelectElement).value)" title="段落格式">
        <option v-for="h in headings" :key="h.value" :value="h.value">{{ h.label }}</option>
      </select>
      <select class="tb-select" :value="fontSize" @change="onFontSizeChange(($event.target as HTMLSelectElement).value)" title="字号">
        <option v-for="s in fontSizes" :key="s" :value="s">{{ s }}px</option>
      </select>
      <span class="tb-divider"></span>
      <button type="button" class="tb-btn" @click="exec('bold')" title="加粗"><b>B</b></button>
      <button type="button" class="tb-btn" @click="exec('italic')" title="斜体"><i>I</i></button>
      <button type="button" class="tb-btn" @click="exec('underline')" title="下划线"><u>U</u></button>
      <button type="button" class="tb-btn" @click="exec('strikeThrough')" title="删除线"><s>S</s></button>
      <span class="tb-divider"></span>
      <label class="tb-color" title="字体颜色">
        <span class="tb-color-label" :style="{ color: fgColor }">A</span>
        <input type="color" :value="fgColor" @input="onColorChange(($event.target as HTMLInputElement).value)" />
      </label>
      <span class="tb-divider"></span>
      <button type="button" class="tb-btn" @click="exec('insertUnorderedList')" title="无序列表">•</button>
      <button type="button" class="tb-btn" @click="exec('insertOrderedList')" title="有序列表">1.</button>
      <span class="tb-divider"></span>
      <button type="button" class="tb-btn" @click="exec('justifyLeft')" title="左对齐">⯇</button>
      <button type="button" class="tb-btn" @click="exec('justifyCenter')" title="居中">▬</button>
      <button type="button" class="tb-btn" @click="exec('justifyRight')" title="右对齐">⯈</button>
      <span class="tb-divider"></span>
      <button type="button" class="tb-btn" @click="onLinkClick" title="插入链接">🔗</button>
      <button type="button" class="tb-btn" @click="onImageClick" title="上传图片">📁图</button>
      <button type="button" class="tb-btn" @click="onImageUrlInsert" title="图片URL">🌐图</button>
      <span class="tb-divider"></span>
      <button type="button" class="tb-btn" @click="onClearFormat" title="清除格式">⌫</button>
    </div>

    <div
      ref="editorRef"
      class="rich-content"
      contenteditable="true"
      :data-placeholder="placeholder || '请输入正文…'"
      :style="{ minHeight: (minHeight || 220) + 'px' }"
      @input="onInput"
      @blur="onBlur"
    ></div>

    <div v-if="linkInputVisible" class="link-pop" @mousedown.stop>
      <input v-model="linkUrl" placeholder="请输入链接URL（含 https://）" class="link-input" @keyup.enter="confirmLink" />
      <button type="button" class="link-btn" @click="confirmLink">确定</button>
      <button type="button" class="link-btn cancel" @click="linkInputVisible = false">取消</button>
    </div>

    <input ref="fileInputRef" type="file" accept="image/*" style="display:none" @change="onImageChange" />
  </div>
</template>

<style scoped>
.rich-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  position: relative;
}
.rich-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 4px;
  padding: 6px 8px;
  border-bottom: 1px solid #ebeef5;
  background: #fafbfc;
  border-radius: 4px 4px 0 0;
}
.tb-btn {
  min-width: 28px; height: 28px;
  padding: 0 6px;
  font-size: 13px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #303133;
  display: inline-flex; align-items: center; justify-content: center;
}
.tb-btn:hover { background: #ecf2f8; border-color: #d6e0eb; }
.tb-select {
  height: 28px;
  padding: 0 6px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  color: #303133;
  cursor: pointer;
}
.tb-divider {
  width: 1px; height: 18px; background: #e4e7ed; margin: 0 2px;
}
.tb-color {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 4px; cursor: pointer;
  border: 1px solid transparent;
}
.tb-color:hover { background: #ecf2f8; border-color: #d6e0eb; }
.tb-color-label {
  font-weight: 700; font-size: 14px; pointer-events: none;
}
.tb-color input[type="color"] {
  position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
}
.rich-content {
  padding: 12px;
  font-size: 14px;
  line-height: 1.7;
  color: #303133;
  outline: none;
  word-break: break-word;
}
.rich-content:empty::before {
  content: attr(data-placeholder);
  color: #c0c4cc;
  pointer-events: none;
}
.rich-content :deep(img) { max-width: 100%; border-radius: 4px; margin: 8px 0; }
.rich-content :deep(h1) { font-size: 22px; font-weight: 700; margin: 12px 0 8px; }
.rich-content :deep(h2) { font-size: 18px; font-weight: 700; margin: 10px 0 6px; }
.rich-content :deep(h3) { font-size: 16px; font-weight: 600; margin: 8px 0 4px; }
.rich-content :deep(p) { margin: 4px 0; }
.rich-content :deep(ul), .rich-content :deep(ol) { padding-left: 24px; margin: 6px 0; }
.rich-content :deep(a) { color: #6fa4cf; text-decoration: underline; }

.link-pop {
  position: absolute; left: 8px; right: 8px; top: 44px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex; gap: 6px; z-index: 10;
}
.link-input {
  flex: 1; height: 28px; padding: 0 8px;
  border: 1px solid #dcdfe6; border-radius: 4px;
  font-size: 13px; outline: none;
}
.link-input:focus { border-color: #6fa4cf; }
.link-btn {
  height: 28px; padding: 0 12px; font-size: 12px;
  border: 1px solid #6fa4cf; background: #6fa4cf; color: #fff;
  border-radius: 4px; cursor: pointer;
}
.link-btn.cancel { background: #fff; color: #606266; border-color: #dcdfe6; }
</style>
