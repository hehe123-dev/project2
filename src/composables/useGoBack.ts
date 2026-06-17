import { useRouter } from 'vue-router'

export function useGoBack(fallback = '/home') {
  const router = useRouter()
  return () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.replace(fallback)
    }
  }
}
