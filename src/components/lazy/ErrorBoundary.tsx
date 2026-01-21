import * as React from 'react';

/**
 * 错误边界组件属性接口
 */
interface ErrorBoundaryProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 自定义错误回退组件 */
  fallback?: React.ReactNode;
}

/**
 * 错误边界组件状态接口
 */
interface ErrorBoundaryState {
  /** 是否发生错误 */
  hasError: boolean;
  /** 错误对象 */
  error?: Error;
}

/**
 * 错误边界组件
 * 捕获子组件树中的 JavaScript 错误，显示友好的错误提示
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 可以在这里记录错误日志
    console.error('组件加载错误:', error, errorInfo);
  }

  /**
   * 重置错误状态
   */
  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // 如果提供了自定义回退组件，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误提示
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 text-destructive">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text-primary">
            组件加载失败
          </h3>
          <p className="mb-4 text-sm text-text-secondary">
            {this.state.error?.message || '发生未知错误，请刷新页面重试'}
          </p>
          <button
            onClick={this.handleRetry}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export type { ErrorBoundaryProps, ErrorBoundaryState };
