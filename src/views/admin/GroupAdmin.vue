<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { groupList, groupJoinRequests } from '@/mock/data'
import CoverUploader from '@/components/CoverUploader.vue'

const activeTab = ref('list')
const showForm = ref(false)
const isEdit = ref(false)
const searchName = ref('')
const auditFilter = ref<'pending' | 'all'>('pending')

/* ---- 活动管理 ---- */
const showActDialog = ref(false)
const showActForm = ref(false)
const isActEdit = ref(false)
const curGroupId = ref(0)
const curGroupName = ref('')

interface ActItem { id: number; title: string; date: string; location: string; description: string }
const actEmpty = (): ActItem => ({ id: 0, title: '', date: '', location: '', description: '' })
const actForm = reactive<ActItem>(actEmpty())

/* ---- 成员管理 ---- */
const showMemDialog = ref(false)

/* ---- 社团 ---- */
interface GroupItem { id: number; name: string; logo: string; category: string; leader: string; phone: string; intro: string; memberCount: number; news: any[]; activities: any[]; members: any[] }

const emptyForm = (): GroupItem => ({
  id: 0, name: '', logo: 'https://picsum.photos/seed/newgroup/200/200', category: '行业社团', leader: '', phone: '', intro: '', memberCount: 0, news: [], activities: [], members: []
})

const form = reactive<GroupItem>(emptyForm())
const groups = ref<GroupItem[]>(groupList.map(g => ({
  ...g,
  activities: (g as any).activities?.map((a: any) => ({ ...a, date: a.date || '', location: a.location || '', description: a.description || '' })) || [],
  members: (g as any).members?.map((m: any) => ({ ...m, school: m.school || '', year: m.year || '', joinDate: m.joinDate || '' })) || []
})))
const requests = ref(groupJoinRequests.map(r => ({ ...r })))

const filteredGroups = computed(() => {
  if (!searchName.value) return groups.value
  const q = searchName.value.toLowerCase()
  return groups.value.filter(g => g.name.toLowerCase().includes(q))
})

const filteredRequests = computed(() => {
  if (auditFilter.value === 'pending') return requests.value.filter(r => r.status === 'pending')
  return requests.value
})

const curGroup = computed(() => groups.value.find(g => g.id === curGroupId.value))

/* ---- 社团 CRUD ---- */
const onAdd = () => { isEdit.value = false; Object.assign(form, emptyForm()); showForm.value = true }
const onEdit = (row: GroupItem) => { isEdit.value = true; Object.assign(form, row); showForm.value = true }
const onSave = () => {
  if (!form.name.trim()) return ElMessage.warning('请填写社团名称')
  if (isEdit.value) {
    const idx = groups.value.findIndex(g => g.id === form.id)
    if (idx > -1) groups.value[idx] = { ...groups.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    groups.value.unshift({ ...form, id: Date.now() })
    ElMessage.success('已新建')
  }
  showForm.value = false
}
const onDelete = (row: GroupItem) => {
  ElMessageBox.confirm(`确定删除「${row.name}」？`, '删除确认', { type: 'warning' })
    .then(() => { groups.value = groups.value.filter(g => g.id !== row.id); ElMessage.success('已删除') })
    .catch(() => {})
}

/* ---- 活动管理 ---- */
const openActDialog = (row: GroupItem) => {
  curGroupId.value = row.id
  curGroupName.value = row.name
  showActForm.value = false
  showActDialog.value = true
}

const onActAdd = () => {
  isActEdit.value = false
  Object.assign(actForm, actEmpty())
  showActForm.value = true
}

const onActEdit = (act: ActItem) => {
  isActEdit.value = true
  Object.assign(actForm, act)
  showActForm.value = true
}

const onActSave = () => {
  if (!actForm.title.trim()) return ElMessage.warning('请填写活动标题')
  const g = curGroup.value
  if (!g) return
  if (isActEdit.value) {
    const idx = g.activities.findIndex(a => a.id === actForm.id)
    if (idx > -1) g.activities[idx] = { ...actForm }
    ElMessage.success('已保存')
  } else {
    g.activities.unshift({ ...actForm, id: Date.now() })
    ElMessage.success('已发布')
  }
  showActForm.value = false
}

const onActDelete = (act: ActItem) => {
  ElMessageBox.confirm(`确定删除活动「${act.title}」？`, '删除确认', { type: 'warning' })
    .then(() => {
      const g = curGroup.value
      if (!g) return
      g.activities = g.activities.filter(a => a.id !== act.id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}

/* ---- 成员管理 ---- */
const openMemDialog = (row: GroupItem) => {
  curGroupId.value = row.id
  curGroupName.value = row.name
  showMemDialog.value = true
}

const onRemoveMember = (member: any) => {
  ElMessageBox.confirm(`确定将「${member.name}」移出社团？`, '移除成员', { type: 'warning' })
    .then(() => {
      const g = curGroup.value
      if (!g) return
      g.members = g.members.filter((m: any) => m.name !== member.name)
      g.memberCount = g.members.length
      ElMessage.success('已移除')
    })
    .catch(() => {})
}

/* ---- 入团审核 ---- */
const onApprove = (row: typeof requests.value[0]) => {
  row.status = 'approved'
  const g = groups.value.find(g => g.name === row.groupName)
  if (g) {
    if (!g.members.find((m: any) => m.name === row.userName)) {
      g.members.push({ name: row.userName, avatar: row.userAvatar, school: row.school, year: row.year, joinDate: new Date().toISOString().slice(0, 10) })
    }
    g.memberCount = g.members.length
  }
  ElMessage.success(`已通过 ${row.userName} 加入「${row.groupName}」的申请，已自动添加为成员`)
}
const onReject = (row: typeof requests.value[0]) => { row.status = 'rejected'; ElMessage.success('已拒绝该申请') }
const auditCount = computed(() => requests.value.filter(r => r.status === 'pending').length)
</script>

<template>
  <div class="group-admin">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="社团列表" name="list">
        <el-card>
          <div class="toolbar">
            <el-input v-model="searchName" placeholder="搜索社团名称" clearable style="width: 280px" />
            <span class="total-info">共 {{ filteredGroups.length }} 个社团</span>
            <el-button type="primary" :icon="Plus" @click="onAdd">新建社团</el-button>
          </div>

          <el-table :data="filteredGroups" stripe style="width:100%" empty-text="暂无社团">
            <el-table-column label="Logo" width="80">
              <template #default="{ row }">
                <img :src="row.logo" style="width:44px;height:44px;border-radius:8px;object-fit:cover" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="社团名称" min-width="200" show-overflow-tooltip />
            <el-table-column prop="category" label="类别" width="100">
              <template #default="{ row }">
                <el-tag size="small">{{ row.category }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="leader" label="负责人" width="100" />
            <el-table-column prop="memberCount" label="成员数" width="90" sortable />
            <el-table-column label="操作" width="320" fixed="right">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="openActDialog(row)">活动</el-button>
                <el-button size="small" @click="openMemDialog(row)">成员</el-button>
                <el-button size="small" @click="onEdit(row)">编辑</el-button>
                <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane name="audit">
        <template #label>
          <span>入团审核</span>
          <el-badge v-if="auditCount > 0" :value="auditCount" class="audit-badge" />
        </template>
        <el-card>
          <div class="toolbar">
            <el-radio-group v-model="auditFilter" size="small">
              <el-radio-button value="pending">待审核 ({{ auditCount }})</el-radio-button>
              <el-radio-button value="all">全部记录</el-radio-button>
            </el-radio-group>
          </div>
          <el-table :data="filteredRequests" stripe style="width:100%" empty-text="暂无申请记录">
            <el-table-column label="申请人" width="160">
              <template #default="{ row }">
                <div class="user-cell">
                  <img :src="row.userAvatar" class="user-avatar" />
                  <div>
                    <div class="user-name">{{ row.userName }}</div>
                    <div class="user-school">{{ row.school }} · {{ row.year }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请社团" width="180">
              <template #default="{ row }"><span>{{ row.groupName }}</span></template>
            </el-table-column>
            <el-table-column prop="applyReason" label="申请理由" min-width="200" show-overflow-tooltip />
            <el-table-column prop="applyDate" label="申请日期" width="120" sortable />
            <el-table-column label="状态" width="90">
              <template #default="{ row }">
                <el-tag :type="row.status === 'pending' ? 'warning' : row.status === 'approved' ? 'success' : 'danger'" size="small">
                  {{ row.status === 'pending' ? '待审核' : row.status === 'approved' ? '已通过' : '已拒绝' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right" v-if="auditFilter === 'pending'">
              <template #default="{ row }">
                <template v-if="row.status === 'pending'">
                  <el-button size="small" type="success" @click="onApprove(row)">通过</el-button>
                  <el-button size="small" type="danger" @click="onReject(row)">拒绝</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 新建/编辑社团对话框 -->
    <el-dialog v-model="showForm" :title="isEdit ? '编辑社团' : '新建社团'" width="640px" destroy-on-close>
      <el-form label-width="90px">
        <el-form-item label="社团名称" required>
          <el-input v-model="form.name" placeholder="请输入社团名称" />
        </el-form-item>
        <el-form-item label="Logo">
          <CoverUploader v-model="form.logo" :size="200" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.category" placeholder="选择类别">
            <el-option label="行业社团" value="行业社团" />
            <el-option label="兴趣社团" value="兴趣社团" />
            <el-option label="地方社团" value="地方社团" />
            <el-option label="海外社团" value="海外社团" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.leader" placeholder="请输入负责人姓名" style="width: 240px" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="负责人手机号" style="width: 240px" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" type="textarea" :rows="3" placeholder="社团简介" />
        </el-form-item>
        <el-form-item label="成员数">
          <el-input-number v-model="form.memberCount" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 活动管理对话框 -->
    <el-dialog v-model="showActDialog" :title="curGroupName + ' — 活动管理'" width="760px" destroy-on-close>
      <div v-if="!showActForm">
        <div class="toolbar">
          <span class="total-info">共 {{ curGroup?.activities.length || 0 }} 个活动</span>
          <el-button type="primary" size="small" :icon="Plus" @click="onActAdd">发布活动</el-button>
        </div>
        <el-table :data="curGroup?.activities || []" stripe style="width:100%" empty-text="暂无活动">
          <el-table-column prop="title" label="活动标题" min-width="200" show-overflow-tooltip />
          <el-table-column prop="date" label="日期" width="120" />
          <el-table-column prop="location" label="地点" width="140" show-overflow-tooltip />
          <el-table-column label="操作" width="160">
            <template #default="{ row: act }">
              <el-button size="small" @click="onActEdit(act)">编辑</el-button>
              <el-popconfirm title="确定删除？" @confirm="onActDelete(act)">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div class="back-row">
          <el-button size="small" link type="primary" @click="showActForm = false">← 返回活动列表</el-button>
        </div>
        <el-form label-width="90px">
          <el-form-item label="活动标题" required>
            <el-input v-model="actForm.title" placeholder="请输入活动标题" />
          </el-form-item>
          <el-form-item label="活动日期">
            <el-date-picker v-model="actForm.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" style="width:240px" />
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="actForm.location" placeholder="活动地点" style="width:320px" />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="actForm.description" type="textarea" :rows="4" placeholder="活动详细描述" />
          </el-form-item>
        </el-form>
        <div class="form-footer">
          <el-button @click="showActForm = false">取消</el-button>
          <el-button type="primary" @click="onActSave">{{ isActEdit ? '保存' : '发布' }}</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 成员管理对话框 -->
    <el-dialog v-model="showMemDialog" :title="curGroupName + ' — 成员管理'" width="700px" destroy-on-close>
      <div class="toolbar">
        <span class="total-info">共 {{ curGroup?.members.length || 0 }} 名成员</span>
      </div>
      <el-table :data="curGroup?.members || []" stripe style="width:100%" empty-text="暂无成员">
        <el-table-column label="" width="60">
          <template #default="{ row: mem }">
            <img :src="mem.avatar" style="width:36px;height:36px;border-radius:50%;display:block" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="院系" width="140">
          <template #default="{ row: mem }">
            <span>{{ mem.school || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" width="80">
          <template #default="{ row: mem }">
            <span>{{ mem.year || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="加入日期" width="120">
          <template #default="{ row: mem }">
            <span>{{ mem.joinDate || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row: mem }">
            <el-popconfirm title="确定移除此成员？" @confirm="onRemoveMember(mem)">
              <template #reference>
                <el-button size="small" type="danger">移除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped>
.group-admin { max-width: 1400px; margin: 0 auto; }
.group-admin :deep(.el-tabs__header) { margin-bottom: 12px; background: #fff; border-radius: 8px; padding: 0 16px; }
.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.toolbar .total-info { font-size: 13px; color: #909399; flex: 1; }
.toolbar .el-button--primary { margin-left: auto; }
.user-cell { display: flex; align-items: center; gap: 8px; }
.user-avatar { width: 36px; height: 36px; border-radius: 50%; }
.user-name { font-size: 13px; font-weight: 500; }
.user-school { font-size: 11px; color: #909399; }
.audit-badge { margin-left: 6px; vertical-align: top; }
.back-row { margin-bottom: 16px; }
.form-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px; }
</style>
