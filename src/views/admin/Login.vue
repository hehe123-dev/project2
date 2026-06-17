<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { adminLogin } from '@/composables/useAdmin'
import logoImg from '@/assets/logo.jpeg'

const router = useRouter()
const username = ref('admin')
const password = ref('admin')
const loading = ref(false)

const onLogin = () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if (adminLogin(username.value, password.value)) {
      ElMessage.success('登录成功')
      router.replace('/admin')
    } else {
      ElMessage.error('账号或密码错误')
    }
  }, 300)
}
</script>

<template>
  <div class="admin-login">
    <div class="login-bg-decoration"></div>
    <div class="login-box">
      <div class="login-left">
        <div class="left-content">
          <img :src="logoImg" class="brand-mark" />
          <h1>白石桥七号</h1>
          <h2>运营管理后台</h2>
          <p>北理工校友商务平台 · 内容运营 · 用户审核 · 财务管理</p>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form">
          <div class="form-title">欢迎登录</div>
          <div class="form-subtitle">仅限运营管理员使用</div>

          <el-form @submit.prevent="onLogin">
            <el-form-item>
              <el-input
                v-model="username"
                size="large"
                placeholder="请输入管理员账号"
                :prefix-icon="User"
                @keyup.enter="onLogin"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="password"
                size="large"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="onLogin"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                style="width:100%"
                :loading="loading"
                @click="onLogin"
              >
                登 录
              </el-button>
            </el-form-item>
          </el-form>

          <div class="tip">演示账号：admin / admin</div>
          <div class="back" @click="router.replace('/login')">← 返回前台登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-login {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f2540 0%, #1a3a5c 50%, #2a5a8c 100%);
  display: flex; align-items: center; justify-content: center;
  position: fixed; top: 0; left: 0;
  overflow: hidden;
}
.login-bg-decoration {
  position: absolute;
  top: -50%; right: -20%;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(74,144,217,0.25) 0%, transparent 70%);
  border-radius: 50%;
}

.login-box {
  display: flex;
  width: 880px;
  height: 520px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.login-left::before {
  content: '';
  position: absolute;
  top: -30%; left: -30%;
  width: 160%; height: 160%;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 50%);
}
.left-content { padding: 0 40px; text-align: center; position: relative; z-index: 1; }
.brand-mark {
  width: 64px; height: 64px; border-radius: 16px;
  background: rgba(255,255,255,0.18);
  border: 2px solid rgba(255,255,255,0.3);
  margin: 0 auto 24px;
  object-fit: cover;
  display: block;
}
.left-content h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.left-content h2 { font-size: 18px; font-weight: 400; opacity: 0.9; margin-bottom: 20px; }
.left-content p { font-size: 13px; opacity: 0.7; line-height: 1.8; }

.login-right {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
}
.login-form { width: 100%; max-width: 320px; }
.form-title { font-size: 24px; font-weight: 700; color: #1a3a5c; margin-bottom: 8px; }
.form-subtitle { font-size: 13px; color: #909399; margin-bottom: 32px; }

.tip {
  font-size: 12px; color: #c0c4cc; text-align: center;
  padding: 8px; background: #f5f7fa; border-radius: 4px;
  margin-top: 8px;
}
.back {
  font-size: 13px; color: #4a90d9; text-align: center;
  margin-top: 20px; cursor: pointer;
}
.back:hover { color: #1a3a5c; }
</style>
