import { memo, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface AuthGuardProps {
  children: ReactNode;
  requiresAuth?: boolean;
}

const AuthGuard = memo(({ children, requiresAuth = true }: AuthGuardProps) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  // 不需要认证的路由直接放行
  if (!requiresAuth) {
    return <>{children}</>;
  }

  // 需要认证但未登录，重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
});

AuthGuard.displayName = 'AuthGuard';

export default AuthGuard;
