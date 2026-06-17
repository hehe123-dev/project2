<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { groupList } from '@/mock/data'

const list = ref<any[]>(groupList.map(g => ({ ...g, published: true })))
const search = ref('')
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = () => ({
  id: 0, name: '', logo: 'https://picsum.photos/seed/g-new/200/200', category: '行业社团',
  leader: '', phone: '', intro: '', memberCount: 0, published: true
})

const form = reactive<any>(emptyForm())
const categoryOptions = ['行业社团', '兴趣社团', '地方社团']

const filtered = computed(() => {
  if (!search.value) return list.value
  const q = search.value.toLowerCase()
  return list.value.filter(g => g.name.toLowerCase().includes(q) || g.leader.includes(q) || g.category?.includes(search.value))
})

const stats = computed(() => ({
  total: list.value.length,
  totalMembers: list.value.reduce((s, g) => s + (g.memberCount || 0), 0)
}))

const onAdd = () => { isEdit.value = false; Object.assign(form, emptyForm()); showForm.value = true }
const onEdit = (row: any) => { isEdit.value = true; Object.assign(form, JSON.parse(JSON.stringify(row))); showForm.value = true }

const onSave = () => {
  if (!form.name.trim()) return ElMessage.warning('请填写社团名称')
  if (!form.leader.trim()) return ElMessage.warning('请填写负责人')
  if (isEdit.value) {
    const idx = list.value.findIndex(g => g.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    list.value.unshift({ ...form, id: Date.now(), memberCount: 0, news: [], activities: [], members: [] })
    ElMessage.success('已新建社团')
  }
  showForm.value = false
}

const onDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除社团「${row.name}」？`, '删除社团', { type: 'warning' })
    .then(() => { list.value = list.value.filter(g => g.id !== row.id); ElMessage.success('已删除') })
    .catch(() => {})
}
</script>

<template>
  <div class="admin-module">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="社团总数" :value="stats.total" /></el-card></el-col>
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="成员总数" :value="stats.totalMembers" value-style="color:#67c23a" /></el-card></el-col>
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="行业社团" :value="list.filter(g => g.category === '行业社团').length" value-style="color:#e6a23c" /></el-card></el-col>
    </el-row>

    <el-card>
      <div class="toolbar">
        <el-input v-model="search" :prefix-icon="Search" placeholder="搜索社团名/负责人" clearable style="width: 280px" />
        <div class="toolbar-right">
          <span class="total-info">共 {{ filtered.length }} 个</span>
          <el-button type="primary" :icon="Plus" @click="onAdd">新建社团</el-button>
        </div>
      </div>

      <el-table :data="filtered" stripe empty-text="暂无社团数据">
        <el-table-column label="LOGO" width="80">
          <template #default="{ row }"><el-image :src="row.logo" fit="cover" style="width:48px;height:48px;border-radius:6px" /></template>
        </el-table-column>
        <el-table-column label="社团名称" min-width="240">
          <template #default="{ row }">
            <div style="font-weight:600">{{ row.name }}</div>
            <div style="font-size:12px;color:#909399;margin-top:2px">{{ row.intro?.slice(0, 40) }}...</div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120">
          <template #default="{ row }"><el-tag size="small" effect="plain">{{ row.category }}</el-tag></template>
        </el-table-column>
        <el-table-column label="负责人" width="100">
          <template #default="{ row }">
            <div style="font-weight:500">{{ row.leader }}</div>
            <div style="font-size:12px;color:#909399">{{ row.phone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="memberCount" label="成员数" width="90" />
        <el-table-column label="数据" width="120">
          <template #default="{ row }">
            <span style="font-size:12px">活动 {{ row.activities?.length || 0 }}</span>
            <span style="font-size:12px;color:#c0c4cc;margin:0 4px">|</span>
            <span style="font-size:12px">资讯 {{ row.news?.length || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference><el-button size="small" type="danger">删除</el-button></template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showForm" :title="isEdit ? '编辑社团' : '新建社团'" width="560px" destroy-on-close>
      <el-form label-width="90px">
        <el-form-item label="社团名称" required><el-input v-model="form.name" placeholder="请输入社团名称" /></el-form-item>
        <el-form-item label="LOGO URL"><el-input v-model="form.logo" placeholder="LOGO 图片链接" /></el-form-item>
        <el-form-item label="分类"><el-select v-model="form.category" style="width:100%"><el-option v-for="c in categoryOptions" :key="c" :label="c" :value="c" /></el-select></el-form-item>
        <el-form-item label="负责人" required><el-input v-model="form.leader" placeholder="负责人姓名" style="width:200px" /></el-form-item>
        <el-form-item label="联系电话"><el-input v-model="form.phone" placeholder="138xxxx" style="width:200px" /></el-form-item>
        <el-form-item label="社团简介"><el-input v-model="form.intro" type="textarea" :rows="3" placeholder="社团介绍" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="showForm = false">取消</el-button><el-button type="primary" @click="onSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped>
.admin-module { max-width: 1400px; margin: 0 auto; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.toolbar-right { display: flex; align-items: center; gap: 12px; }
.total-info { font-size: 13px; color: #909399; }
</style>
