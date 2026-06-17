<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { isLoggedIn } from '@/router'
import logoImg from '@/assets/logo.jpeg'

const router = useRouter()
const showPhoneLogin = ref(false)
const phone = ref('')
const code = ref('')
const codeSent = ref(false)

// 微信授权登录
const wechatLogin = () => {
  showToast('模拟微信授权中...')
  setTimeout(() => {
    isLoggedIn.value = true
    showToast('登录成功')
    router.replace('/home')
  }, 1000)
}

// 手机号登录
const sendCode = () => {
  if (!phone.value || phone.value.length < 11) {
    showToast('请输入正确的手机号')
    return
  }
  codeSent.value = true
  showToast('验证码已发送')
}

const phoneLogin = () => {
  if (!code.value) {
    showToast('请输入验证码')
    return
  }
  isLoggedIn.value = true
  showToast('登录成功')
  setTimeout(() => router.replace('/home'), 500)
}
</script>

<template>
  <div class="login-page">
    <!-- Logo 区域 -->
    <div class="logo-section">
      <img :src="logoImg" class="app-logo" />
      <div class="app-name">白石桥七号</div>
      <div class="app-slogan">同心共建，聚力赋能</div>
      <div class="app-desc">北理工校友商务平台</div>
    </div>

    <!-- 微信一键登录 -->
    <div class="login-actions">
      <div class="wechat-btn" @click="wechatLogin">
        <div class="wechat-icon">微</div>
        <span>微信一键登录</span>
      </div>

      <!-- 切换手机号登录 -->
      <div class="phone-toggle" @click="showPhoneLogin = !showPhoneLogin">
        {{ showPhoneLogin ? '收起' : '手机号登录' }}
        <van-icon :name="showPhoneLogin ? 'arrow-up' : 'arrow-down'" size="12" />
      </div>

      <!-- 手机号登录表单 -->
      <div v-if="showPhoneLogin" class="phone-form">
        <van-field
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
          :border="false"
          class="phone-input"
        >
          <template #left-icon>
            <van-icon name="phone-o" size="18" color="#999" />
          </template>
        </van-field>
        <van-field
          v-model="code"
          maxlength="6"
          placeholder="请输入验证码"
          type="digit"
          :border="false"
          class="code-input"
        >
          <template #left-icon>
            <van-icon name="shield-o" size="18" color="#999" />
          </template>
          <template #button>
            <van-button size="small" type="primary" @click="sendCode" :disabled="codeSent">
              {{ codeSent ? '60s后重发' : '获取验证码' }}
            </van-button>
          </template>
        </van-field>
        <van-button type="primary" block round @click="phoneLogin" class="login-btn" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">
          登录
        </van-button>
      </div>
    </div>

    <!-- 协议 -->
    <div class="agreement">
      登录即表示同意
      <span class="link">《用户协议》</span>和<span class="link">《隐私政策》</span>
      <div style="margin-top: 12px">
        <span class="admin-link" @click="$router.push('/admin/login')">运营管理员入口 →</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f5f5 0%, #e8ecf0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 28px;
}

.logo-section {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 50px;
}
.app-logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(111,164,207,0.2);
  margin-bottom: 16px;
}
.app-name {
  font-size: 28px;
  font-weight: 700;
  color: #6fa4cf;
  margin-bottom: 8px;
}
.app-slogan {
  font-size: 14px;
  color: #6fa4cf;
  letter-spacing: 4px;
  margin-bottom: 4px;
}
.app-desc {
  font-size: 12px;
  color: #999;
}

.login-actions {
  width: 100%;
  max-width: 320px;
}

.wechat-btn {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #07c160;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(7,193,96,0.3);
}
.wechat-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.phone-toggle {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.phone-form {
  margin-top: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  padding: 4px 0;
}
.phone-input, .code-input {
  border-bottom: 1px solid #f0f0f0;
}

.login-btn {
  margin: 16px;
  width: calc(100% - 32px);
}

.agreement {
  margin-top: auto;
  padding: 30px 0;
  font-size: 11px;
  color: #bbb;
  text-align: center;
}
.link { color: #6fa4cf; }
.admin-link { color: #999; font-size: 12px; cursor: pointer; text-decoration: underline; }
</style>
