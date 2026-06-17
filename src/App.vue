<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRole } from '@/composables/useRole'

const router = useRouter()
const route = useRoute()
const { canPublish, publishActions } = useRole()

const showTabbar = computed(() => {
  if (route.path.startsWith('/admin')) return false
  const noTabRoutes = ['Login', 'NewsDetail', 'AlumniCardDetail', 'AlumniGroupDetail', 'ActivityDetail', 'HelpDetail', 'MemberCardDetail', 'MemberCompanyDetail', 'MemberProductDetail', 'MemberServiceDetail', 'TopicShareDetail', 'InterviewDetail', 'AlumniFeedDetail', 'CourseDetail', 'GroupBuyDetail', 'PublishFeed', 'PublishHelp', 'PublishActivity', 'PublishDemand', 'HelpPublish', 'ProfileSubscribe', 'ProfileGroupBuy', 'ProfileFavorites', 'ProfileActivities', 'ProfileEdit', 'ProfileMemberEdit', 'ProfileMyFeed', 'ProfileMyHelp', 'ProfileMyBusiness', 'ProfileMyBizTrack', 'ProfileMyTopics', 'ProfileMyService', 'ProfilePoints', 'ServiceProvider', 'ServiceDetail']
  return !noTabRoutes.includes(String(route.name))
})

const active = ref(0)
const showPublish = ref(false)

const onChange = (i: number | string) => {
  if (i === 'publish') {
    showPublish.value = true
    return
  }
  active.value = i as number
  const tabs = ['/home', '/courses', '', '/group-buy', '/profile']
  router.push(tabs[i as number])
}

const onPublishSelect = (action: string) => {
  showPublish.value = false
  if (action === 'feed') router.push('/publish-feed')
  else if (action === 'help') router.push('/publish-help')
  else if (action === 'activity') router.push('/publish-activity')
  else if (action === 'demand') router.push('/publish-help')
}
</script>

<template>
  <router-view />
  <van-tabbar v-if="showTabbar" v-model="active" @change="onChange" :safe-area-inset-bottom="true">
    <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="bookmark-o">课程</van-tabbar-item>
    <van-tabbar-item v-if="canPublish" icon="add-o" name="publish" class="publish-tab">
      <template #icon>
        <div class="publish-btn-circle">
          <van-icon name="plus" size="24" color="#fff" />
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item v-else icon="add-o" name="publish" class="publish-tab" @click="() => { showToast('请先完成校友认证') }">
      <template #icon>
        <div class="publish-btn-circle-disabled">
          <van-icon name="plus" size="24" color="#bbb" />
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">团购</van-tabbar-item>
    <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>

  <van-action-sheet v-model:show="showPublish" :actions="publishActions" @select="(action: any) => onPublishSelect(action.value)" cancel-text="取消" />
</template>

<style scoped>
.publish-btn-circle {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #6fa4cf, #9bc1de);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
  box-shadow: 0 2px 8px rgba(111,164,207,0.4);
}
.publish-tab { --van-tabbar-item-icon-size: 0px; }
.publish-btn-circle-disabled {
  width: 44px; height: 44px; border-radius: 50%;
  background: #e5e5e5;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
</style>
