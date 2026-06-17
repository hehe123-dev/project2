import { ref } from 'vue'

const joinedGroups = ref<number[]>([1]) // 模拟已加入社团ID=1

export function useGroupJoin() {
  const isJoined = (groupId: number) => joinedGroups.value.includes(groupId)

  const joinGroup = (groupId: number) => {
    if (!joinedGroups.value.includes(groupId)) {
      joinedGroups.value.push(groupId)
    }
  }

  const leaveGroup = (groupId: number) => {
    joinedGroups.value = joinedGroups.value.filter(id => id !== groupId)
  }

  return { joinedGroups, isJoined, joinGroup, leaveGroup }
}
