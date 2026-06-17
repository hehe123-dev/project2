<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import {
  Plus, Search, User, VideoPlay, Picture, UploadFilled,
  Delete, Folder, Document
} from '@element-plus/icons-vue'
import { courseList } from '@/mock/data'

interface Lesson {
  id: number
  title: string
  duration: string
  preview: boolean
  videoUrl?: string
  videoName?: string
  videoSize?: number
}
interface Chapter {
  id: number
  title: string
  lessons: Lesson[]
}

const list = ref<any[]>(courseList.map(c => ({
  ...c,
  published: true,
  chapters: c.chapters?.map(ch => ({
    ...ch,
    lessons: ch.lessons.map(l => ({ ...l, videoUrl: '', videoName: '', videoSize: 0 }))
  })) || []
})))

const search = ref('')
const showForm = ref(false)
const showVideoPreview = ref(false)
const previewVideo = ref({ url: '', title: '' })
const isEdit = ref(false)
const activeStep = ref(0)
const coverFileList = ref<UploadUserFile[]>([])

const emptyForm = () => ({
  id: 0,
  title: '',
  subtitle: '',
  cover: 'https://picsum.photos/seed/course-new/750/420',
  teacher: '',
  teacherTitle: '',
  teacherBio: '',
  price: 0,
  originalPrice: 0,
  memberPrice: 0,
  duration: '',
  totalMinutes: 0,
  category: '企业管理',
  intro: '',
  highlights: [] as string[],
  chapters: [] as Chapter[],
  students: 0,
  rating: 5.0,
  published: true
})

const form = reactive<any>(emptyForm())
const categoryOptions = ['企业管理', '创业', '财务', '法律', '科技', '营销']

const filtered = computed(() => {
  if (!search.value) return list.value
  const q = search.value.toLowerCase()
  return list.value.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.teacher.toLowerCase().includes(q)
  )
})

const stats = computed(() => ({
  total: list.value.length,
  online: list.value.filter(c => c.published).length,
  totalStudents: list.value.reduce((s, c) => s + (c.students || 0), 0),
  totalLessons: list.value.reduce((s, c) =>
    s + (c.chapters?.reduce((cs: number, ch: Chapter) => cs + ch.lessons.length, 0) || 0), 0
  )
}))

const lessonCount = (course: any) =>
  course.chapters?.reduce((s: number, ch: Chapter) => s + ch.lessons.length, 0) || 0

const onAdd = () => {
  isEdit.value = false
  Object.assign(form, emptyForm())
  coverFileList.value = []
  activeStep.value = 0
  showForm.value = true
}

const onEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, JSON.parse(JSON.stringify(row)))
  coverFileList.value = form.cover ? [{ name: '当前封面', url: form.cover } as UploadUserFile] : []
  activeStep.value = 0
  showForm.value = true
}

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写课程名称')
  if (!form.teacher.trim()) return ElMessage.warning('请填写讲师姓名')
  if (form.price <= 0) return ElMessage.warning('请填写课程价格')
  if (isEdit.value) {
    const idx = list.value.findIndex(c => c.id === form.id)
    if (idx > -1) list.value[idx] = JSON.parse(JSON.stringify(form))
    ElMessage.success('已保存修改')
  } else {
    list.value.unshift({ ...JSON.parse(JSON.stringify(form)), id: Date.now(), students: 0 })
    ElMessage.success('已新建课程')
  }
  showForm.value = false
}

const onToggle = (row: any) => {
  row.published = !row.published
  ElMessage.success(row.published ? '已上架' : '已下架')
}

const onDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除课程「${row.title}」？`, '删除课程', { type: 'warning' })
    .then(() => {
      list.value = list.value.filter(c => c.id !== row.id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}

// === 章节管理 ===
const addChapter = () => {
  const newId = Math.max(0, ...form.chapters.map((c: Chapter) => c.id)) + 1
  form.chapters.push({
    id: newId,
    title: `第${form.chapters.length + 1}章 新章节`,
    lessons: []
  })
}

const removeChapter = (idx: number) => {
  ElMessageBox.confirm('删除章节将一并删除其下所有课时，确定继续？', '删除章节', { type: 'warning' })
    .then(() => {
      form.chapters.splice(idx, 1)
      ElMessage.success('章节已删除')
    })
    .catch(() => {})
}

const addLesson = (chapter: Chapter) => {
  const newId = Math.max(0, ...form.chapters.flatMap((c: Chapter) => c.lessons.map(l => l.id))) + 1
  chapter.lessons.push({
    id: newId,
    title: `${form.chapters.indexOf(chapter) + 1}.${chapter.lessons.length + 1} 新课时`,
    duration: '00:00',
    preview: false,
    videoUrl: '',
    videoName: '',
    videoSize: 0
  })
}

const removeLesson = (chapter: Chapter, lessonIdx: number) => {
  chapter.lessons.splice(lessonIdx, 1)
}

// === 视频上传 ===
const formatBytes = (bytes: number) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

const beforeVideoUpload: UploadProps['beforeUpload'] = (file) => {
  const isVideo = file.type.startsWith('video/')
  if (!isVideo) {
    ElMessage.error('只能上传视频文件')
    return false
  }
  if (file.size / 1024 / 1024 > 1024) {
    ElMessage.error('视频大小不能超过 1GB')
    return false
  }
  return true
}

// 自定义上传：使用 URL.createObjectURL 模拟（演示用）
const customVideoUpload = (lesson: Lesson) => (options: any) => {
  const file = options.file as File
  const url = URL.createObjectURL(file)
  // 自动获取视频时长
  const video = document.createElement('video')
  video.preload = 'metadata'
  video.src = url
  video.onloadedmetadata = () => {
    const total = Math.floor(video.duration)
    const min = String(Math.floor(total / 60)).padStart(2, '0')
    const sec = String(total % 60).padStart(2, '0')
    lesson.duration = `${min}:${sec}`
    // 累计课程总时长
    form.totalMinutes = form.chapters.reduce((s: number, ch: Chapter) =>
      s + ch.lessons.reduce((ls, l) => {
        const [m, sec] = (l.duration || '00:00').split(':').map(Number)
        return ls + (m || 0) + (sec || 0) / 60
      }, 0), 0
    )
    form.totalMinutes = Math.round(form.totalMinutes)
    form.duration = `${form.chapters.reduce((s: number, ch: Chapter) => s + ch.lessons.length, 0)}课时`
  }
  lesson.videoUrl = url
  lesson.videoName = file.name
  lesson.videoSize = file.size
  ElMessage.success(`视频已上传：${file.name}`)
  options.onSuccess({})
}

const removeLessonVideo = (lesson: Lesson) => {
  if (lesson.videoUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(lesson.videoUrl)
  }
  lesson.videoUrl = ''
  lesson.videoName = ''
  lesson.videoSize = 0
  lesson.duration = '00:00'
}

const playLessonVideo = (lesson: Lesson) => {
  if (!lesson.videoUrl) {
    ElMessage.info('该课时尚未上传视频')
    return
  }
  previewVideo.value = { url: lesson.videoUrl, title: lesson.title }
  showVideoPreview.value = true
}

// === 封面上传 ===
const customCoverUpload = (options: any) => {
  const file = options.file as File
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('封面必须是图片文件')
    return
  }
  const url = URL.createObjectURL(file)
  form.cover = url
  ElMessage.success('封面已更新')
  options.onSuccess({})
}
</script>

<template>
  <div class="admin-courses">
    <!-- 数据统计 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="课程总数" :value="stats.total" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="已上架" :value="stats.online" value-style="color:#67c23a" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="累计学习人次" :value="stats.totalStudents" value-style="color:#e6a23c" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="课时总数" :value="stats.totalLessons" value-style="color:#8b5cf6">
            <template #suffix>
              <el-icon style="color:#8b5cf6;margin-left:4px"><VideoPlay /></el-icon>
            </template>
          </el-statistic>
        </el-card>
      </el-col>
    </el-row>

    <!-- 课程表格 -->
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="search"
          :prefix-icon="Search"
          placeholder="搜索课程名/讲师"
          clearable
          style="width: 280px"
        />
        <div class="toolbar-right">
          <span class="total-info">共 {{ filtered.length }} 门课程</span>
          <el-button type="primary" :icon="Plus" @click="onAdd">新建课程</el-button>
        </div>
      </div>

      <el-table :data="filtered" stripe style="width: 100%">
        <el-table-column label="封面" width="120">
          <template #default="{ row }">
            <el-image :src="row.cover" fit="cover" style="width:90px;height:54px;border-radius:4px" />
          </template>
        </el-table-column>
        <el-table-column label="课程信息" min-width="280">
          <template #default="{ row }">
            <div style="font-weight:600;font-size:14px">{{ row.title }}</div>
            <div style="font-size:12px;color:#909399;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px">
              {{ row.subtitle }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="讲师" width="140">
          <template #default="{ row }">
            <div style="font-weight:500">{{ row.teacher }}</div>
            <div style="font-size:12px;color:#909399">{{ row.duration }}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="180">
          <template #default="{ row }">
            <div style="color:#f56c6c;font-weight:700;font-size:16px">¥{{ row.price }}</div>
            <div style="font-size:12px;color:#909399">
              <span style="text-decoration:line-through">¥{{ row.originalPrice }}</span>
              <span style="margin-left:6px;color:#e6a23c">会员¥{{ row.memberPrice }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="章节/课时" width="120">
          <template #default="{ row }">
            <div style="font-size:12px">
              <el-icon><Folder /></el-icon> {{ row.chapters?.length || 0 }} 章
              <span style="margin-left:6px;color:#909399">·</span>
              <el-icon><VideoPlay /></el-icon> {{ lessonCount(row) }} 节
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="学习人次" width="120">
          <template #default="{ row }">
            <div style="font-size:12px">
              <el-icon><User /></el-icon>
              {{ row.students }} 人
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.published ? 'success' : 'warning'" size="small">
              {{ row.published ? '已上架' : '已下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.published ? 'warning' : 'success'" @click="onToggle(row)">
              {{ row.published ? '下架' : '上架' }}
            </el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新建/编辑对话框 -->
    <el-dialog
      v-model="showForm"
      :title="isEdit ? '编辑课程' : '新建课程'"
      width="900px"
      destroy-on-close
      top="5vh"
    >
      <el-steps :active="activeStep" finish-status="success" align-center style="margin-bottom: 24px">
        <el-step title="基础信息" />
        <el-step title="价格设置" />
        <el-step title="章节与视频" />
      </el-steps>

      <!-- Step 1: 基础信息 -->
      <div v-show="activeStep === 0">
        <el-form label-width="100px">
          <el-form-item label="课程名称" required>
            <el-input v-model="form.title" placeholder="请输入课程名称" />
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="form.subtitle" placeholder="请输入副标题" />
          </el-form-item>
          <el-form-item label="课程封面">
            <div class="cover-upload">
              <el-upload
                action=""
                :show-file-list="false"
                accept="image/*"
                :http-request="customCoverUpload"
              >
                <div v-if="form.cover" class="cover-preview">
                  <img :src="form.cover" />
                  <div class="cover-overlay">
                    <el-icon size="24"><Picture /></el-icon>
                    <span>更换封面</span>
                  </div>
                </div>
                <div v-else class="cover-placeholder">
                  <el-icon size="32"><Picture /></el-icon>
                  <span>点击上传封面图</span>
                </div>
              </el-upload>
              <div class="cover-tip">建议尺寸 750×420，支持 JPG/PNG，单张不超过 5MB</div>
            </div>
          </el-form-item>
          <el-form-item label="讲师" required>
            <el-input v-model="form.teacher" placeholder="讲师姓名" style="width: 280px" />
          </el-form-item>
          <el-form-item label="讲师职称">
            <el-input v-model="form.teacherTitle" placeholder="如：智控科技创始人 · 北理工2005级" />
          </el-form-item>
          <el-form-item label="讲师介绍">
            <el-input v-model="form.teacherBio" type="textarea" :rows="2" placeholder="讲师背景介绍" />
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.category" placeholder="选择分类" style="width: 240px">
              <el-option v-for="c in categoryOptions" :key="c" :label="c" :value="c" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程介绍">
            <el-input v-model="form.intro" type="textarea" :rows="3" placeholder="课程介绍" />
          </el-form-item>
        </el-form>
      </div>

      <!-- Step 2: 价格设置 -->
      <div v-show="activeStep === 1">
        <el-form label-width="100px">
          <el-form-item label="课程价格" required>
            <el-input-number v-model="form.price" :min="0" :precision="0" controls-position="right" />
            <span style="margin-left:8px;color:#909399;font-size:12px">元（实际售价）</span>
          </el-form-item>
          <el-form-item label="原价">
            <el-input-number v-model="form.originalPrice" :min="0" :precision="0" controls-position="right" />
            <span style="margin-left:8px;color:#909399;font-size:12px">元（划线价格，用于展示折扣）</span>
          </el-form-item>
          <el-form-item label="会员价">
            <el-input-number v-model="form.memberPrice" :min="0" :precision="0" controls-position="right" />
            <span style="margin-left:8px;color:#909399;font-size:12px">元（商务会员专享价）</span>
          </el-form-item>
          <el-form-item label="立即上架">
            <el-switch v-model="form.published" />
            <span style="margin-left:12px;color:#909399;font-size:12px">关闭则保存为草稿</span>
          </el-form-item>
        </el-form>
      </div>

      <!-- Step 3: 章节与视频 -->
      <div v-show="activeStep === 2">
        <div class="chapter-header">
          <div>
            <span style="font-weight:600;font-size:15px">课程章节</span>
            <span style="margin-left:8px;color:#909399;font-size:12px">
              共 {{ form.chapters.length }} 章 · {{ form.chapters.reduce((s: number, c: any) => s + c.lessons.length, 0) }} 课时
            </span>
          </div>
          <el-button type="primary" :icon="Plus" size="small" @click="addChapter">添加章节</el-button>
        </div>

        <el-empty v-if="!form.chapters.length" description="暂无章节，点击右上角添加" :image-size="80" />

        <el-collapse v-else accordion>
          <el-collapse-item v-for="(chapter, ci) in form.chapters" :key="chapter.id" :name="chapter.id">
            <template #title>
              <div class="chapter-title-bar">
                <el-icon style="margin-right:6px"><Folder /></el-icon>
                <el-input
                  v-model="chapter.title"
                  size="small"
                  style="width: 360px"
                  @click.stop
                />
                <span class="chapter-count">{{ chapter.lessons.length }} 课时</span>
                <el-button
                  size="small"
                  link
                  type="danger"
                  :icon="Delete"
                  style="margin-left:auto"
                  @click.stop="removeChapter(ci)"
                >删除章节</el-button>
              </div>
            </template>

            <div class="lesson-list">
              <div v-for="(lesson, li) in chapter.lessons" :key="lesson.id" class="lesson-item">
                <div class="lesson-row">
                  <el-icon class="lesson-icon"><Document /></el-icon>
                  <el-input
                    v-model="lesson.title"
                    size="small"
                    placeholder="课时标题"
                    style="flex: 1"
                  />
                  <el-input
                    v-model="lesson.duration"
                    size="small"
                    placeholder="时长 mm:ss"
                    style="width: 100px"
                  />
                  <el-checkbox v-model="lesson.preview" size="small">免费试看</el-checkbox>
                  <el-button
                    size="small"
                    link
                    type="danger"
                    :icon="Delete"
                    @click="removeLesson(chapter, li)"
                  />
                </div>

                <!-- 视频上传区 -->
                <div class="video-area">
                  <div v-if="lesson.videoUrl" class="video-uploaded">
                    <el-icon class="video-success-icon" color="#67c23a" size="20"><VideoPlay /></el-icon>
                    <div class="video-info">
                      <div class="video-name">{{ lesson.videoName }}</div>
                      <div class="video-meta">
                        {{ formatBytes(lesson.videoSize || 0) }}
                        <span v-if="lesson.duration && lesson.duration !== '00:00'"> · 时长 {{ lesson.duration }}</span>
                      </div>
                    </div>
                    <el-button size="small" :icon="VideoPlay" @click="playLessonVideo(lesson)">预览</el-button>
                    <el-popconfirm title="确定移除该视频？" @confirm="removeLessonVideo(lesson)">
                      <template #reference>
                        <el-button size="small" type="danger" plain :icon="Delete">移除</el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                  <el-upload
                    v-else
                    action=""
                    :show-file-list="false"
                    accept="video/*"
                    :before-upload="beforeVideoUpload"
                    :http-request="customVideoUpload(lesson)"
                  >
                    <div class="video-upload-zone">
                      <el-icon size="20"><UploadFilled /></el-icon>
                      <span>点击上传视频（MP4/MOV/AVI，单个不超过 1GB）</span>
                    </div>
                  </el-upload>
                </div>
              </div>

              <el-button
                size="small"
                type="primary"
                plain
                :icon="Plus"
                style="width:100%;margin-top:8px"
                @click="addLesson(chapter)"
              >
                添加课时
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <template #footer>
        <div style="display:flex;justify-content:space-between;width:100%">
          <el-button v-if="activeStep > 0" @click="activeStep--">上一步</el-button>
          <span v-else />
          <div>
            <el-button @click="showForm = false">取消</el-button>
            <el-button v-if="activeStep < 2" type="primary" @click="activeStep++">下一步</el-button>
            <el-button v-else type="primary" @click="onSave">保存课程</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 视频预览 -->
    <el-dialog v-model="showVideoPreview" :title="previewVideo.title" width="800px" destroy-on-close>
      <video
        v-if="previewVideo.url"
        :src="previewVideo.url"
        controls
        autoplay
        style="width:100%;max-height:60vh;background:#000;border-radius:4px"
      ></video>
    </el-dialog>
  </div>
</template>

<style scoped>
.admin-courses { max-width: 1400px; margin: 0 auto; }
.toolbar {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.toolbar-right { display: flex; align-items: center; gap: 12px; }
.total-info { font-size: 13px; color: #909399; }

.cover-upload { display: flex; flex-direction: column; gap: 6px; }
.cover-preview {
  position: relative; width: 280px; height: 158px;
  border-radius: 6px; overflow: hidden; cursor: pointer;
  border: 1px dashed #dcdfe6;
}
.cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.cover-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.5); color: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; opacity: 0; transition: opacity 0.2s;
  font-size: 13px;
}
.cover-preview:hover .cover-overlay { opacity: 1; }
.cover-placeholder {
  width: 280px; height: 158px;
  border: 1px dashed #dcdfe6; border-radius: 6px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; cursor: pointer; color: #909399; font-size: 13px;
  transition: border-color 0.2s;
}
.cover-placeholder:hover { border-color: #1a3a5c; color: #1a3a5c; }
.cover-tip { font-size: 12px; color: #c0c4cc; }

.chapter-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 0 12px;
}
.chapter-title-bar {
  display: flex; align-items: center; flex: 1; gap: 8px;
}
.chapter-count {
  font-size: 12px; color: #909399; margin-left: 8px;
  padding: 2px 8px; background: #f5f7fa; border-radius: 10px;
}

.lesson-list { padding: 8px 0; }
.lesson-item {
  background: #f8f9fb; border-radius: 6px; padding: 10px 12px;
  margin-bottom: 8px;
}
.lesson-row {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 8px;
}
.lesson-icon { color: #909399; }

.video-area { padding-left: 24px; }
.video-upload-zone {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px;
  border: 1px dashed #dcdfe6; border-radius: 4px;
  color: #909399; font-size: 12px;
  cursor: pointer; transition: all 0.2s;
}
.video-upload-zone:hover {
  border-color: #1a3a5c; color: #1a3a5c; background: #f5fafe;
}
.video-uploaded {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px;
  background: #f0f9ff; border: 1px solid #c7e2ff; border-radius: 4px;
}
.video-success-icon { flex-shrink: 0; }
.video-info { flex: 1; min-width: 0; }
.video-name {
  font-size: 13px; font-weight: 500; color: #303133;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.video-meta { font-size: 11px; color: #909399; margin-top: 2px; }
</style>
