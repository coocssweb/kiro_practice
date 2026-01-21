import { Suspense, memo, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes';
import AuthGuard from './AuthGuard';
import { prefetchByRouteConfig } from '@/utils/prefetch';

// 加载中组件
const Loading = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-text-primary">加载中...</div>
  </div>
));

Loading.displayName = 'Loading';

const AppRouter = memo(() => {
  const location = useLocation();

  // 路由变化时，根据配置预加载关联路由
  useEffect(() => {
    prefetchByRouteConfig(location.pathname);
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthGuard requiresAuth={route.meta?.requiresAuth}>
                <route.element />
              </AuthGuard>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
