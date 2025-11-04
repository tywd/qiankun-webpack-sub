import { baseUrl } from '@/utils';
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';
import { useTabsStore } from '../stores/tabs';
import { useMenuStore } from '../stores/menu';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard.vue'),
    meta: { title: '子应用看板' }
  },
  {
    path: '/project',
    name: 'project',
    children: [
      {
        path: '/project/virtual-list',
        name: 'virtualList',
        component: () => import('@/views/project/virtual-list.vue'),
        meta: { title: '虚拟列表' }
      }
    ]
  }
];

// 创建路由
const router: Router = createRouter({
  history: createWebHistory(baseUrl),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('sub-路由守卫:', to, {
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
    // 设置激活的菜单
    const menuItem = menuStore.findMenuByPath(to.path);
    if (menuItem) {
      menuStore.setActiveMenu(menuItem.id);
      // 添加标签页
      tabsStore.addTab({
        id: menuItem?.id,
        name: to.meta.title as string,
        path: to.path,
        closable: to.path !== '/dashboard', // 首页不可关闭
      });
    }
  }
  next()
})

router.afterEach((to) => {
  console.log('用户管理子应用路由切换完成:', to.path)
})

export default router;