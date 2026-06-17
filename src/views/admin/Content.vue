<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, reactive, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { newsList, topicList, interviewList } from '@/mock/data'
import RichEditor from '@/components/RichEditor.vue'
import CoverUploader from '@/components/CoverUploader.vue'

const route = useRoute()

interface ItemType { id: number; title: string; cover?: string; author?: string; date?: string; summary?: string; published?: boolean; views?: number; likes?: number; comments?: number; [key: string]: any }

const config: Record<string, { title: string; source: ItemType[]; addLabel: string }> = {
  news: { title: '资讯管理', source: newsList as ItemType[], addLabel: '新建资讯' },
  topics: { title: '主题分享管理', source: topicList as ItemType[], addLabel: '新建主题' },
  interviews: { title: '会员专访管理', source: interviewList as ItemType[], addLabel: '新建专访' }
}

const type = computed(() => (route.params.type as string) || 'news')
const cur = computed(() => config[type.value] || config.news)
const list = ref<ItemType[]>([])
const search = ref('')
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = (): ItemType => ({
  id: 0,
  title: '',
  cover: 'https://picsum.photos/seed/new-content/400/240',
  author: '管理员',
  date: '2026-06-16',
  summary: '',
  content: '',
  published: true,
  views: 0,
  likes: 0,
  comments: 0
})

const form = reactive<ItemType>(emptyForm())

const initList = () => {
  list.value = cur.value.source.map(i => ({
    ...i,
    published: i.published === false ? false : true
  }))
}

watch(type, initList, { immediate: true })

const filtered = computed(() => {
  if (!search.value) return list.value
  const q = search.value.toLowerCase()
  return list.value.filter(i =>
    i.title.toLowerCase().includes(q) ||
    (i.author && i.author.toLowerCase().includes(q))
  )
})

const onAdd = () => {
  isEdit.value = false
  Object.assign(form, emptyForm())
  showForm.value = true
}

const onEdit = (row: ItemType) => {
  isEdit.value = true
  Object.assign(form, row)
  showForm.value = true
}

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写标题')
  if (isEdit.value) {
    const idx = list.value.findIndex(i => i.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    list.value.unshift({ ...form, id: Date.now() })
    ElMessage.success('已新建')
  }
  showForm.value = false
}

const onToggle = (row: ItemType) => {
  row.published = !row.published
  ElMessage.success(row.published ? '已上架' : '已下架')
}

const onDelete = (row: ItemType) => {
  ElMessageBox.confirm(`确定删除「${row.title}」？`, '删除确认', { type: 'warning' })
    .then(() => {
      list.value = list.value.filter(i => i.id !== row.id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="admin-content">
    <el-card>
      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="search"
            :prefix-icon="Search"
            :placeholder="'搜索 ' + cur.title"
            clearable
            style="width: 280px"
          />
        </div>
        <div class="toolbar-right">
          <span class="total-info">共 {{ filtered.length }} 条</span>
          <el-button type="primary" :icon="Plus" @click="onAdd">{{ cur.addLabel }}</el-button>
        </div>
      </div>

      <!-- 列表表格 -->
      <el-table :data="filtered" stripe style="width: 100%" empty-text="暂无数据">
        <el-table-column label="封面" width="90">
          <template #default="{ row }">
            <el-image
              v-if="row.cover"
              :src="row.cover"
              fit="cover"
              style="width:60px;height:60px;border-radius:4px;display:block"
              :preview-src-list="[row.cover]"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="280" show-overflow-tooltip>
          <template #default="{ row }">
            <span style="font-weight:500">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="date" label="发布日期" width="120" />
        <el-table-column label="数据" width="200">
          <template #default="{ row }">
            <span class="data-stat">浏览 {{ row.views || 0 }}</span>
            <el-divider direction="vertical" />
            <span class="data-stat">点赞 {{ row.likes || 0 }}</span>
            <el-divider direction="vertical" />
            <span class="data-stat">评论 {{ row.comments || 0 }}</span>
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
      :title="isEdit ? '编辑' + cur.title.replace('管理','') : cur.addLabel"
      width="640px"
      destroy-on-close
    >
      <el-form label-width="90px">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="封面图">
          <CoverUploader v-model="form.cover" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" placeholder="请输入作者" style="width: 240px" />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="简短摘要" />
        </el-form-item>
        <el-form-item label="正文">
          <RichEditor v-model="form.content" placeholder="请输入正文，可调节格式、插入图片…" :min-height="260" />
        </el-form-item>
        <el-form-item label="立即上架">
          <el-switch v-model="form.published" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.admin-content { max-width: 1400px; margin: 0 auto; }
.toolbar {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.toolbar-right { display: flex; align-items: center; gap: 12px; }
.total-info { font-size: 13px; color: #909399; }
.data-stat { font-size: 12px; color: #606266; }
</style>
