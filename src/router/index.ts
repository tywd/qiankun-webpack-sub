import { baseUrl } from '@/utils';
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'SubHome',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  }
];

// 创建路由
const router: Router = createRouter({
  history: createWebHistory(baseUrl),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('用户管理子应用路由变化:', {
    to: to.path,
    from: from.path,
    fullPath: to.fullPath,
    matched: to.matched.length,
    qiankunEnv: window.__POWERED_BY_QIANKUN__
  })
  
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `用户管理 - ${to.meta.title}`
  }
  next()
})

router.afterEach((to) => {
  console.log('用户管理子应用路由切换完成:', to.path)
})

export default router;