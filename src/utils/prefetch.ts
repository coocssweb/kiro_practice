import { routes, routeImportMap, RouteConfig } from '@/router/routes';

type ImportFn = () => Promise<unknown>;

// 已预加载的路由缓存
const prefetchedRoutes = new Set<string>();

/**
 * 在浏览器空闲时预加载模块
 */
export const prefetchOnIdle = (importFn: ImportFn, timeout = 2000): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
        .requestIdleCallback(async () => {
          await importFn();
          resolve();
        }, { timeout });
    } else {
      // 降级方案
      setTimeout(async () => {
        await importFn();
        resolve();
      }, 200);
    }
  });
};

/**
 * 预加载指定路由
 * @param routePath 路由路径
 * @param immediate 是否立即加载，默认 false 使用空闲时加载
 */
export const prefetchRoute = async (routePath: string, immediate = false): Promise<boolean> => {
  // 已预加载过则跳过
  if (prefetchedRoutes.has(routePath)) {
    return true;
  }

  const importFn = routeImportMap[routePath];
  if (!importFn) {
    console.warn(`[Prefetch] 未找到路由 "${routePath}" 的导入函数`);
    return false;
  }

  try {
    if (immediate) {
      await importFn();
    } else {
      await prefetchOnIdle(importFn);
    }
    prefetchedRoutes.add(routePath);
    return true;
  } catch (error) {
    console.error(`[Prefetch] 预加载路由 "${routePath}" 失败:`, error);
    return false;
  }
};

/**
 * 批量预加载路由
 * @param routePaths 路由路径数组
 * @param immediate 是否立即加载
 */
export const prefetchRoutes = async (routePaths?: string[], immediate = false): Promise<void> => {
  const paths = routePaths || Object.keys(routeImportMap);
  await Promise.all(paths.map((path) => prefetchRoute(path, immediate)));
};

/**
 * 根据当前路由配置预加载关联路由
 * @param currentPath 当前路由路径
 */
export const prefetchByRouteConfig = (currentPath: string): void => {
  const findRoute = (routes: RouteConfig[], path: string): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.path === path) return route;
      if (route.children) {
        const found = findRoute(route.children, path);
        if (found) return found;
      }
    }
    return undefined;
  };

  const currentRoute = findRoute(routes, currentPath);
  if (currentRoute?.prefetch?.length) {
    currentRoute.prefetch.forEach((path) => prefetchRoute(path));
  }
};

/**
 * 检查路由是否已预加载
 */
export const isRoutePrefetched = (routePath: string): boolean => {
  return prefetchedRoutes.has(routePath);
};

/**
 * 清除预加载缓存（主要用于测试）
 */
export const clearPrefetchCache = (): void => {
  prefetchedRoutes.clear();
};

/**
 * 创建带预加载的懒加载组件
 */
export const createPrefetchableImport = (importFn: ImportFn, shouldPrefetch = true) => {
  if (shouldPrefetch) {
    prefetchOnIdle(importFn);
  }
  return importFn;
};
