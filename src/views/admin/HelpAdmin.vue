<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { helpList } from '@/mock/data'

const activeRole = ref('全部')
const searchText = ref('')

const roles = ['全部', '普通用户', '认证校友', '商务会员', '服务机构']

const roleColor: Record<string, string> = {
  '普通用户': 'info',
  '认证校友': 'success',
  '商务会员': 'warning',
  '服务机构': 'primary'
}

interface HelpItem { id: number; title: string; publisher: { name: string; avatar: string; role: string }; date: string; description: string; status: string; responseCount: number; responses: { name: string; avatar: string; text: string; time: string }[] }

const list = ref<HelpItem[]>(helpList as HelpItem[])

const filtered = computed(() => {
  let items = list.value
  if (activeRole.value !== '全部') {
    items = items.filter(h => h.publisher.role === activeRole.value)
  }
  if (searchText.value) {
    const q = searchText.value.toLowerCase()
    items = items.filter(h => h.title.toLowerCase().includes(q) || h.publisher.name.toLowerCase().includes(q))
  }
  return items
})

const onToggleStatus = (row: HelpItem) => {
  row.status = row.status === '未解决' ? '已解决' : '未解决'
  ElMessage.success(`已标记为「${row.status}」`)
}

const onDelete = (row: HelpItem) => {
  ElMessageBox.confirm(`确定删除「${row.title}」？`, '删除确认', { type: 'warning' })
    .then(() => {
      list.value = list.value.filter(h => h.id !== row.id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}

const countByRole = (role: string) => {
  if (role === '全部') return list.value.length
  return list.value.filter(h => h.publisher.role === role).length
}

/* ---- 回应管理 ---- */
const showRespDialog = ref(false)
const curItem = ref<HelpItem | null>(null)
const respText = ref('')

const onResp = (row: HelpItem) => {
  curItem.value = row
  respText.value = ''
  showRespDialog.value = true
}

const submitResp = () => {
  if (!respText.value.trim() || !curItem.value) return
  if (!curItem.value.responses) curItem.value.responses = []
  curItem.value.responses.push({
    name: '平台运营',
    avatar: 'https://picsum.photos/seed/admin/100/100',
    text: respText.value,
    time: new Date().toISOString().slice(0, 10)
  })
  curItem.value.responseCount = curItem.value.responses.length
  ElMessage.success('回应已发送')
  respText.value = ''
}

const onDeleteResp = (item: HelpItem, idx: number) => {
  item.responses.splice(idx, 1)
  item.responseCount = item.responses.length
  ElMessage.success('已删除')
}
</script>

<template>
  <div class="help-admin">
    <el-card>
      <div class="toolbar">
        <el-input v-model="searchText" placeholder="搜索标题或发布者" clearable style="width: 280px" />
        <span class="total-info">共 {{ filtered.length }} 条</span>
      </div>

      <el-tabs v-model="activeRole">
        <el-tab-pane v-for="r in roles" :key="r" :name="r">
          <template #label>
            <span>{{ r }}</span>
            <el-badge :value="countByRole(r)" class="role-badge" :type="r === '全部' ? 'primary' : roleColor[r] as any" />
          </template>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="filtered" stripe style="width:100%" empty-text="暂无求助">
        <el-table-column label="发布者" width="180">
          <template #default="{ row }">
            <div class="user-cell">
              <img :src="row.publisher.avatar" class="user-avatar" />
              <div>
                <div class="user-name">{{ row.publisher.name }}</div>
                <el-tag :type="roleColor[row.publisher.role] as any" size="small">{{ row.publisher.role }}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="260" show-overflow-tooltip>
          <template #default="{ row }">
            <span style="font-weight:500">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发布日期" width="120" sortable />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.status === '未解决' ? 'warning' : 'success'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="responseCount" label="回应数" width="80" sortable />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onResp(row)">回应</el-button>
            <el-button size="small" :type="row.status === '未解决' ? 'success' : 'warning'" @click="onToggleStatus(row)">
              {{ row.status === '未解决' ? '标记已解决' : '标记未解决' }}
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

    <!-- 回应对话框 -->
    <el-dialog v-model="showRespDialog" :title="'回应 — ' + (curItem?.title || '')" width="640px" destroy-on-close>
      <div class="resp-section">
        <div class="resp-title">历史回应</div>
        <div v-if="!curItem?.responses?.length" class="empty-state">暂无回应</div>
        <div v-for="(r, i) in curItem?.responses || []" :key="i" class="resp-item">
          <img :src="r.avatar" class="resp-avatar" />
          <div class="resp-body">
            <div class="resp-meta">
              <span class="resp-name">{{ r.name }}</span>
              <span class="resp-time">{{ r.time }}</span>
            </div>
            <div class="resp-text">{{ r.text }}</div>
          </div>
          <el-button size="small" type="danger" link @click="onDeleteResp(curItem!, i)">删除</el-button>
        </div>
      </div>
      <div class="resp-input-section">
        <div class="resp-title">发布回应</div>
        <el-input v-model="respText" type="textarea" :rows="3" placeholder="以平台运营身份发布回应…" />
        <el-button type="primary" @click="submitResp" style="margin-top:12px;width:100%">发送回应</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.help-admin { max-width: 1400px; margin: 0 auto; }
.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.toolbar .total-info { font-size: 13px; color: #909399; }
.user-cell { display: flex; align-items: center; gap: 8px; }
.user-avatar { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; }
.user-name { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
.role-badge { margin-left: 8px; vertical-align: top; }
.resp-section { margin-bottom: 20px; }
.resp-title { font-size: 14px; font-weight: 600; margin-bottom: 10px; color: #303133; }
.resp-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #ebeef5; }
.resp-avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; }
.resp-body { flex: 1; min-width: 0; }
.resp-meta { display: flex; gap: 10px; margin-bottom: 4px; }
.resp-name { font-size: 13px; font-weight: 600; color: #303133; }
.resp-time { font-size: 11px; color: #909399; }
.resp-text { font-size: 13px; line-height: 1.6; color: #606266; word-break: break-word; }
.resp-input-section { border-top: 1px solid #ebeef5; padding-top: 16px; }
.empty-state { text-align: center; padding: 20px; color: #c0c4cc; font-size: 13px; }
</style>
