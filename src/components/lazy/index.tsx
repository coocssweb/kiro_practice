import * as React from 'react';

// 导出错误边界和懒加载包装器
export { ErrorBoundary } from './ErrorBoundary';
export type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary';
export { LazyWrapper, DefaultLoadingFallback } from './LazyWrapper';
export type { LazyWrapperProps } from './LazyWrapper';

/**
 * 懒加载 Button 组件
 */
export const LazyButton = React.lazy(() =>
  import('@/components/ui/button').then((module) => ({
    default: module.Button,
  }))
);

/**
 * 懒加载 Input 组件
 */
export const LazyInput = React.lazy(() =>
  import('@/components/ui/input').then((module) => ({
    default: module.Input,
  }))
);

/**
 * 懒加载 Textarea 组件
 */
export const LazyTextarea = React.lazy(() =>
  import('@/components/ui/textarea').then((module) => ({
    default: module.Textarea,
  }))
);

/**
 * 懒加载 Label 组件
 */
export const LazyLabel = React.lazy(() =>
  import('@/components/ui/label').then((module) => ({
    default: module.Label,
  }))
);

/**
 * 懒加载 Checkbox 组件
 */
export const LazyCheckbox = React.lazy(() =>
  import('@/components/ui/checkbox').then((module) => ({
    default: module.Checkbox,
  }))
);

/**
 * 懒加载 Select 组件
 */
export const LazySelect = React.lazy(() =>
  import('@/components/ui/select').then((module) => ({
    default: module.Select,
  }))
);

/**
 * 预加载函数类型
 */
type PreloadFunction = () => Promise<void>;

/**
 * 预加载 Button 组件
 */
export const preloadButton: PreloadFunction = () =>
  import('@/components/ui/button').then(() => undefined);

/**
 * 预加载 Input 组件
 */
export const preloadInput: PreloadFunction = () =>
  import('@/components/ui/input').then(() => undefined);

/**
 * 预加载 Textarea 组件
 */
export const preloadTextarea: PreloadFunction = () =>
  import('@/components/ui/textarea').then(() => undefined);

/**
 * 预加载 Label 组件
 */
export const preloadLabel: PreloadFunction = () =>
  import('@/components/ui/label').then(() => undefined);

/**
 * 预加载 Checkbox 组件
 */
export const preloadCheckbox: PreloadFunction = () =>
  import('@/components/ui/checkbox').then(() => undefined);

/**
 * 预加载 Select 组件
 */
export const preloadSelect: PreloadFunction = () =>
  import('@/components/ui/select').then(() => undefined);

/**
 * 预加载 Form 相关组件
 */
export const preloadForm: PreloadFunction = () =>
  import('@/components/ui/form').then(() => undefined);

/**
 * 预加载所有 UI 组件
 */
export const preloadAllComponents: PreloadFunction = async () => {
  await Promise.all([
    preloadButton(),
    preloadInput(),
    preloadTextarea(),
    preloadLabel(),
    preloadCheckbox(),
    preloadSelect(),
    preloadForm(),
  ]);
};
