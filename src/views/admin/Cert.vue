<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const search = ref('')
const activeTab = ref('pending')
const showDetail = ref(false)
const detail = ref<any>(null)

const requests = ref([
  {
    id: 1, name: '张志强', avatar: 'https://picsum.photos/seed/c1/100/100',
    school: '自动化学院', major: '控制科学与工程', year: '2010级', degree: '硕士',
    date: '2026-06-10 14:32', status: 'pending',
    phone: '138****5678', email: 'zhangzq@example.com', idCard: '1101**********1234',
    studentId: '20100123', graduationYear: '2013',
    hometown: '河北石家庄', city: '北京',
    company: '某AI科技有限公司', position: '技术总监',
    intro: '本科毕业后保研至本院，研究方向为智能控制与机器人。毕业后在AI领域创业，希望与校友建立联系。',
    proofImages: ['https://picsum.photos/seed/p1/600/400', 'https://picsum.photos/seed/p2/600/400']
  },
  {
    id: 2, name: '王晓梅', avatar: 'https://picsum.photos/seed/c2/100/100',
    school: '计算机学院', major: '软件工程', year: '2009级', degree: '本科',
    date: '2026-06-10 11:08', status: 'pending',
    phone: '139****1234', email: 'wangxm@example.com', idCard: '1101**********5678',
    studentId: '20090345', graduationYear: '2013',
    hometown: '山东济南', city: '上海',
    company: '某互联网公司', position: '产品经理',
    intro: '在校期间担任学生会副主席，毕业后从事互联网产品设计工作。',
    proofImages: ['https://picsum.photos/seed/p3/600/400']
  },
  {
    id: 3, name: '陈一鸣', avatar: 'https://picsum.photos/seed/c3/100/100',
    school: '机械工程学院', major: '机械设计', year: '2011级', degree: '本科',
    date: '2026-06-09 16:45', status: 'pending',
    phone: '136****8899', email: 'chenym@example.com', idCard: '1101**********9012',
    studentId: '20110567', graduationYear: '2015',
    hometown: '江苏苏州', city: '深圳',
    company: '某制造业上市公司', position: '研发经理',
    intro: '毕业后从事高端装备研发工作，目前负责公司新产品研发。',
    proofImages: ['https://picsum.photos/seed/p4/600/400']
  },
  {
    id: 4, name: '刘建国', avatar: 'https://picsum.photos/seed/c4/100/100',
    school: '电子学院', major: '通信工程', year: '2007级', degree: '博士',
    date: '2026-06-08 10:20', status: 'approved',
    phone: '135****6677', email: 'liujg@example.com', idCard: '1101**********3456',
    studentId: '20070789', graduationYear: '2014',
    hometown: '湖南长沙', city: '北京',
    company: '某通信研究院', position: '高级研究员',
    intro: '专注于5G/6G通信技术研究，发表SCI论文20余篇。',
    proofImages: []
  },
  {
    id: 5, name: '李梦琪', avatar: 'https://picsum.photos/seed/c5/100/100',
    school: '管理学院', major: '工商管理', year: '2012级', degree: '本科',
    date: '2026-06-07 09:15', status: 'rejected',
    phone: '137****2233', email: 'limq@example.com', idCard: '1101**********7890',
    studentId: '20120234', graduationYear: '2016',
    hometown: '四川成都', city: '成都',
    company: '', position: '',
    intro: '材料缺失，无法核实学籍信息',
    proofImages: []
  }
])

const counts = computed(() => ({
  pending: requests.value.filter(r => r.status === 'pending').length,
  approved: requests.value.filter(r => r.status === 'approved').length,
  rejected: requests.value.filter(r => r.status === 'rejected').length
}))

const filtered = computed(() => {
  let result = requests.value.filter(r => r.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.school.includes(search.value) ||
      r.company.includes(search.value)
    )
  }
  return result
})

const onView = (item: any) => {
  detail.value = item
  showDetail.value = true
}

const onApprove = (item: any) => {
  item.status = 'approved'
  showDetail.value = false
  ElMessage.success(`已通过 ${item.name} 的认证申请`)
}

const onReject = (item: any) => {
  item.status = 'rejected'
  showDetail.value = false
  ElMessage.warning(`已拒绝 ${item.name} 的认证申请`)
}

const statusTag = (status: string) => {
  if (status === 'pending') return { type: 'warning', text: '待审核' }
  if (status === 'approved') return { type: 'success', text: '已通过' }
  return { type: 'danger', text: '已拒绝' }
}
</script>

<template>
  <div class="admin-cert">
    <el-card>
      <!-- Tabs + 搜索 -->
      <div class="head">
        <el-tabs v-model="activeTab">
          <el-tab-pane :label="`待审核 (${counts.pending})`" name="pending" />
          <el-tab-pane :label="`已通过 (${counts.approved})`" name="approved" />
          <el-tab-pane :label="`已拒绝 (${counts.rejected})`" name="rejected" />
        </el-tabs>
        <el-input
          v-model="search"
          :prefix-icon="Search"
          placeholder="搜索姓名/学院/公司"
          clearable
          style="width: 280px"
        />
      </div>

      <!-- 表格 -->
      <el-table :data="filtered" stripe style="width: 100%" empty-text="暂无数据">
        <el-table-column label="申请人" width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.avatar" :size="36" />
              <div>
                <div style="font-weight:600">{{ row.name }}</div>
                <div style="font-size:12px;color:#909399">{{ row.year }} · {{ row.degree }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学院专业" min-width="220">
          <template #default="{ row }">
            <div>{{ row.school }}</div>
            <div style="font-size:12px;color:#909399">{{ row.major }}</div>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" min-width="220">
          <template #default="{ row }">
            <div v-if="row.company">{{ row.company }}</div>
            <div v-else style="color:#c0c4cc">—</div>
            <div style="font-size:12px;color:#909399">{{ row.position }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="所在地" width="100" />
        <el-table-column prop="date" label="申请时间" width="160" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusTag(row.status).type as any" size="small">
              {{ statusTag(row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onView(row)">查看详情</el-button>
            <template v-if="row.status === 'pending'">
              <el-button size="small" type="success" @click="onApprove(row)">通过</el-button>
              <el-button size="small" type="danger" @click="onReject(row)">拒绝</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情抽屉 -->
    <el-drawer v-model="showDetail" title="校友认证详情" size="520px" destroy-on-close>
      <div v-if="detail" class="detail">
        <div class="user-top">
          <el-avatar :src="detail.avatar" :size="64" />
          <div style="margin-left:14px;flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:18px;font-weight:700">{{ detail.name }}</span>
              <el-tag :type="statusTag(detail.status).type as any" size="small">
                {{ statusTag(detail.status).text }}
              </el-tag>
            </div>
            <div style="font-size:13px;color:#606266;margin-top:4px">{{ detail.school }} · {{ detail.major }}</div>
            <div style="font-size:13px;color:#909399">{{ detail.year }} · {{ detail.degree }}</div>
          </div>
        </div>

        <el-descriptions title="学籍信息" :column="2" border style="margin-top:20px">
          <el-descriptions-item label="学号">{{ detail.studentId }}</el-descriptions-item>
          <el-descriptions-item label="入学年份">{{ detail.year }}</el-descriptions-item>
          <el-descriptions-item label="毕业年份">{{ detail.graduationYear }}</el-descriptions-item>
          <el-descriptions-item label="学历">{{ detail.degree }}</el-descriptions-item>
          <el-descriptions-item label="所属学院" :span="2">{{ detail.school }}</el-descriptions-item>
          <el-descriptions-item label="专业" :span="2">{{ detail.major }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="联系方式" :column="1" border style="margin-top:20px">
          <el-descriptions-item label="手机号">{{ detail.phone }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ detail.email }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ detail.idCard }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="个人信息" :column="2" border style="margin-top:20px">
          <el-descriptions-item label="家乡">{{ detail.hometown }}</el-descriptions-item>
          <el-descriptions-item label="现居城市">{{ detail.city }}</el-descriptions-item>
          <el-descriptions-item v-if="detail.company" label="工作单位" :span="2">{{ detail.company }}</el-descriptions-item>
          <el-descriptions-item v-if="detail.position" label="职务" :span="2">{{ detail.position }}</el-descriptions-item>
          <el-descriptions-item label="个人简介" :span="2">{{ detail.intro }}</el-descriptions-item>
        </el-descriptions>

        <div v-if="detail.proofImages?.length" style="margin-top:20px">
          <div class="block-title">认证材料（学位证、学生证等）</div>
          <div class="proof-grid">
            <el-image
              v-for="(img, i) in detail.proofImages"
              :key="i"
              :src="img"
              fit="cover"
              style="width:100%;aspect-ratio:4/3;border-radius:6px"
              :preview-src-list="detail.proofImages"
              :initial-index="i"
              preview-teleported
            />
          </div>
        </div>

        <div v-if="detail.status === 'pending'" class="footer-actions">
          <el-button type="danger" plain size="large" @click="onReject(detail)">拒绝</el-button>
          <el-button type="primary" size="large" @click="onApprove(detail)">通过认证</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
.admin-cert { max-width: 1400px; margin: 0 auto; }
.head {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 4px;
}
.head :deep(.el-tabs) { flex: 1; }
.head :deep(.el-tabs__header) { margin-bottom: 0; }

.user-cell { display: flex; align-items: center; gap: 10px; }

.detail { padding: 0 4px 80px; }
.user-top {
  display: flex;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f5fafe 0%, #ebf3fc 100%);
  border-radius: 8px;
}
.block-title { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 12px; }
.proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.footer-actions {
  position: absolute; bottom: 0; left: 0; right: 0;
  display: flex; gap: 12px; justify-content: flex-end;
  padding: 16px 20px;
  background: #fff; border-top: 1px solid #ebeef5;
}
</style>
