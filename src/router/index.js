import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // 路由级代码拆分
      // 生成一个单独的数据块 （About.[hash].js）
      // 在访问路由时延迟加载.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router