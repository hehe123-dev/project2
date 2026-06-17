import { ref, computed } from 'vue'

// 别人向我发起的交换请求
const incomingRequests = ref([
  {
    id: 1,
    from: { name: '李明远', avatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', major: '计算机科学与技术', year: '2008级' },
    date: '2026-06-10 09:30',
    status: 'pending' // pending | accepted | rejected
  },
  {
    id: 2,
    from: { name: '陈晓华', avatar: 'https://picsum.photos/seed/u2/100/100', school: '信息与电子学院', major: '信息工程', year: '2006级' },
    date: '2026-06-09 16:00',
    status: 'pending'
  }
])

// 我向别人发起的请求ID列表
const outgoingIds = ref<number[]>([])

// 双向好友（互换了名片的校友ID）
const friendIds = ref<number[]>([2])

export function useExchange() {
  const pendingCount = computed(() => incomingRequests.value.filter(r => r.status === 'pending').length)
  const friendCount = computed(() => friendIds.value.length)

  const acceptRequest = (id: number) => {
    const req = incomingRequests.value.find(r => r.id === id)
    if (req) {
      req.status = 'accepted'
      friendIds.value.push(id)
    }
  }

  const rejectRequest = (id: number) => {
    const req = incomingRequests.value.find(r => r.id === id)
    if (req) req.status = 'rejected'
  }

  const sendRequest = (alumniId: number) => {
    if (!outgoingIds.value.includes(alumniId)) {
      outgoingIds.value.push(alumniId)
    }
  }

  const hasSentRequest = (alumniId: number) => outgoingIds.value.includes(alumniId)

  const isFriend = (alumniId: number) => friendIds.value.includes(alumniId)

  return {
    incomingRequests,
    pendingCount,
    friendCount,
    friendIds,
    acceptRequest,
    rejectRequest,
    sendRequest,
    hasSentRequest,
    isFriend
  }
}
