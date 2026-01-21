# 设计文档

## 概述

本设计文档描述如何将 shadcn/ui 组件库集成到项目中。shadcn/ui 是基于 Radix UI 原语和 Tailwind CSS 构建的开源组件模板集合，它不是传统的 npm 包，而是将组件代码直接复制到项目中，提供完全的定制能力。

### 技术选型理由

选择 shadcn/ui 的原因：
1. **基于 Tailwind CSS** - 与项目现有样式系统完美兼容
2. **基于 Radix UI** - 提供完整的无障碍支持和键盘导航
3. **代码所有权** - 组件代码在项目中，可完全定制
4. **Tree Shaking** - 只引入需要的组件，无额外依赖
5. **TypeScript 支持** - 完整的类型定义
6. **React 19 兼容** - 支持最新 React 版本

## 架构

```
src/
├── components/
│   └── ui/                    # shadcn/ui 组件目录
│       ├── button.tsx         # Button 组件
│       ├── input.tsx          # Input 组件
│       ├── select.tsx         # Select 组件
│       ├── form.tsx           # Form 组件
│       ├── label.tsx          # Label 组件
│       ├── checkbox.tsx       # Checkbox 组件
│       └── ...
├── lib/
│   └── utils.ts               # cn() 工具函数
└── components/
    └── lazy/                  # 动态导入封装
        ├── index.tsx          # 懒加载组件导出
        ├── LazyWrapper.tsx    # 懒加载包装器
        └── ErrorBoundary.tsx  # 错误边界组件
```

## 组件与接口

### 1. 工具函数 (lib/utils.ts)

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 Tailwind CSS 类名的工具函数
 * 使用 clsx 处理条件类名，twMerge 处理类名冲突
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### 2. Button 组件接口

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

// Button 变体定义
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-surface text-text-primary border border-border hover:bg-surface/80',
        outline: 'border border-border bg-transparent hover:bg-surface',
        ghost: 'hover:bg-surface hover:text-text-primary',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}
```

### 3. Select 组件接口

```typescript
interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}
```

### 4. Form 组件接口

```typescript
// 基于 react-hook-form 的表单组件
interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  render: (props: { field: ControllerRenderProps<T> }) => React.ReactNode;
}

interface FormItemProps {
  children: React.ReactNode;
}

interface FormLabelProps {
  children: React.ReactNode;
}

interface FormMessageProps {
  children?: React.ReactNode;
}
```

### 5. 动态导入封装

```typescript
// 懒加载包装器接口
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// 错误边界接口
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// 预加载函数类型
type PreloadFunction = () => Promise<void>;
```

## 数据模型

### 主题配置扩展

```typescript
// tailwind.config.js 扩展
const config = {
  theme: {
    extend: {
      colors: {
        // 现有主题变量
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        // shadcn/ui 需要的额外变量
        ring: 'var(--color-primary)',
        input: 'var(--color-border)',
        foreground: 'var(--color-text-primary)',
        muted: {
          DEFAULT: 'var(--color-surface)',
          foreground: 'var(--color-text-secondary)',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
};
```

### CSS 变量扩展

```css
:root {
  /* 现有变量保持不变 */
  --color-primary: #6366f1;
  /* ... */
  
  /* shadcn/ui 需要的额外变量 */
  --radius: 0.5rem;
}
```

## 正确性属性

*正确性属性是指在系统所有有效执行中都应该保持为真的特征或行为——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### Property 1: Button 变体渲染正确性

*对于任意* Button 组件的 variant 和 size 参数组合，渲染输出应该包含对应的 CSS 类名。

**验证: 需求 2.2, 2.3**

### Property 2: Button 状态行为正确性

*对于任意* Button 组件，当 disabled 为 true 时，按钮应该不可点击且显示禁用样式；当 loading 为 true 时，应该显示加载指示器。

**验证: 需求 2.4**

### Property 3: Select 选择功能正确性

*对于任意* Select 组件和选项列表，选择某个选项后，onValueChange 回调应该被调用并传入正确的值。

**验证: 需求 4.2**

### Property 4: Select 搜索过滤正确性

*对于任意* 搜索关键词和选项列表，过滤结果应该只包含匹配关键词的选项。

**验证: 需求 4.3**

### Property 5: Form 验证正确性

*对于任意* 表单字段和验证规则，当输入不满足规则时，应该显示对应的错误消息。

**验证: 需求 3.3**

### Property 6: 主题切换响应正确性

*对于任意* 主题切换操作，所有使用 CSS 变量的组件样式应该自动更新。

**验证: 需求 6.2**

### Property 7: 无障碍属性正确性

*对于任意* 表单组件，渲染输出应该包含正确的 ARIA 属性（aria-label、aria-describedby 等）。

**验证: 需求 3.5, 4.5**

## 错误处理

### 动态导入错误处理

```typescript
// 错误边界组件处理组件加载失败
class ComponentErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-red-500">
          组件加载失败，请刷新页面重试
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 表单验证错误处理

```typescript
// 表单验证错误通过 FormMessage 组件显示
const FormMessage = ({ children }: FormMessageProps) => {
  const { error } = useFormField();
  const message = error?.message || children;

  if (!message) return null;

  return (
    <p className="text-sm text-red-500" role="alert">
      {message}
    </p>
  );
};
```

## 测试策略

### 单元测试

使用 Vitest 和 React Testing Library 进行单元测试：

1. **Button 组件测试**
   - 测试各种 variant 渲染正确的类名
   - 测试各种 size 渲染正确的类名
   - 测试 disabled 状态
   - 测试 loading 状态

2. **Select 组件测试**
   - 测试选项选择功能
   - 测试搜索过滤功能
   - 测试键盘导航

3. **Form 组件测试**
   - 测试表单提交
   - 测试验证错误显示
   - 测试 ARIA 属性

### 属性测试

使用 fast-check 进行属性测试，每个属性测试运行至少 100 次迭代：

1. **Property 1 测试**: 生成随机 variant 和 size 组合，验证类名正确性
2. **Property 3 测试**: 生成随机选项列表和选择操作，验证回调正确性
3. **Property 4 测试**: 生成随机搜索词和选项列表，验证过滤结果
4. **Property 5 测试**: 生成随机表单数据和验证规则，验证错误显示

### 测试配置

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```
