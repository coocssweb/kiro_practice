import { lazy, ComponentType, LazyExoticComponent } from 'react';

export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
}

export interface RouteConfig {
  path: string;
  element: LazyExoticComponent<ComponentType>;
  meta?: RouteMeta;
  children?: RouteConfig[];
  /** 进入该路由后需要预加载的路由路径列表 */
  prefetch?: string[];
}

// 路由导入函数映射表，用于手动预加载
export const routeImportMap: Record<string, () => Promise<unknown>> = {
  '/login': () => import('@/pages/Login'),
  '/': () => import('@/pages/Home'),
};

// 懒加载页面组件
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));

export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
    },
    // 登录页预加载首页
    prefetch: ['/'],
  },
  {
    path: '/',
    element: Home,
    meta: {
      title: '首页',
      requiresAuth: true,
    },
    // 首页可以预加载其他常用页面
    prefetch: [],
  },
];

export default routes;
