import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * 懒加载包装器属性接口
 */
interface LazyWrapperProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 自定义加载占位组件 */
  fallback?: React.ReactNode;
  /** 自定义错误回退组件 */
  errorFallback?: React.ReactNode;
}

/**
 * 默认加载占位组件
 */
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="flex items-center gap-2 text-text-secondary">
      {/* 加载动画 */}
      <svg
        className="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="text-sm">加载中...</span>
    </div>
  </div>
);

/**
 * 懒加载包装器组件
 * 提供统一的 Loading 占位和错误边界处理
 */
const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  errorFallback,
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={fallback || <DefaultLoadingFallback />}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { LazyWrapper, DefaultLoadingFallback };
export type { LazyWrapperProps };
