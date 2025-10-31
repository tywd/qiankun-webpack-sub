import { baseUrl } from '@/utils';
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';
import { useTabsStore } from '../stores/tabs';
import { useMenuStore } from '../stores/menu';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'SubHome',
    component: () => import('@/views/Home.vue'),
    meta: { title: '数据看板' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '个人中心' }
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
  const tabsStore = useTabsStore();
  const menuStore = useMenuStore();

  if (to.meta?.title) {
    document.title = `子应用 - ${to.meta.title}`
    // 添加标签页
    tabsStore.addTab({
      name: to.meta.title as string,
      path: to.path,
      closable: to.path !== '/dashboard', // 首页不可关闭
      component: to.name as string
    });
    // 设置激活的菜单
    const menuItem = menuStore.findMenuByPath(to.path);
    if (menuItem) {
      menuStore.setActiveMenu(menuItem.id);
    }
  }
  next()
})

router.afterEach((to) => {
  console.log('用户管理子应用路由切换完成:', to.path)
})

export default router;