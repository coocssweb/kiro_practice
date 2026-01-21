# 实现计划：React 组件库集成

## 概述

将 shadcn/ui 组件库集成到项目中，包括安装依赖、配置工具函数、实现核心组件、封装动态导入机制，并与现有主题系统集成。

## 任务

- [x] 1. 安装依赖并配置基础设施
  - [x] 1.1 安装 shadcn/ui 核心依赖
    - 安装 clsx、tailwind-merge、class-variance-authority
    - 安装 @radix-ui/react-slot 用于组件组合
    - _需求: 1.1, 1.2, 1.3_
  - [x] 1.2 创建 cn() 工具函数
    - 在 `src/lib/utils.ts` 创建类名合并工具
    - _需求: 1.1_
  - [x] 1.3 扩展 Tailwind 配置
    - 添加 shadcn/ui 需要的颜色和圆角配置
    - 确保与现有主题变量兼容
    - _需求: 6.1, 6.3_

- [x] 2. 实现 Button 组件
  - [x] 2.1 创建 Button 组件
    - 在 `src/components/ui/button.tsx` 实现
    - 支持 variant: primary、secondary、outline、ghost、destructive
    - 支持 size: sm、md、lg
    - 支持 disabled 和 loading 状态
    - _需求: 2.2, 2.3, 2.4, 2.5_
  - [ ]* 2.2 编写 Button 组件属性测试
    - **Property 1: Button 变体渲染正确性**
    - **Property 2: Button 状态行为正确性**
    - **验证: 需求 2.2, 2.3, 2.4**

- [x] 3. 实现 Form 相关组件
  - [x] 3.1 安装表单相关依赖
    - 安装 react-hook-form、@hookform/resolvers、zod
    - 安装 @radix-ui/react-label
    - _需求: 3.4_
  - [x] 3.2 创建 Label 组件
    - 在 `src/components/ui/label.tsx` 实现
    - _需求: 3.2_
  - [x] 3.3 创建 Input 组件
    - 在 `src/components/ui/input.tsx` 实现
    - 支持各种 input 类型
    - _需求: 3.2, 3.5_
  - [x] 3.4 创建 Textarea 组件
    - 在 `src/components/ui/textarea.tsx` 实现
    - _需求: 3.2_
  - [x] 3.5 创建 Checkbox 组件
    - 安装 @radix-ui/react-checkbox
    - 在 `src/components/ui/checkbox.tsx` 实现
    - _需求: 3.2, 3.5_
  - [x] 3.6 创建 Form 组件
    - 在 `src/components/ui/form.tsx` 实现
    - 集成 react-hook-form
    - 包含 FormField、FormItem、FormLabel、FormMessage 等子组件
    - _需求: 3.3, 3.4, 3.5_
  - [ ]* 3.7 编写 Form 组件属性测试
    - **Property 5: Form 验证正确性**
    - **Property 7: 无障碍属性正确性**
    - **验证: 需求 3.3, 3.5**

- [x] 4. 实现 Select 组件
  - [x] 4.1 安装 Select 依赖
    - 安装 @radix-ui/react-select
    - _需求: 4.1_
  - [x] 4.2 创建 Select 组件
    - 在 `src/components/ui/select.tsx` 实现
    - 支持单选模式
    - 支持键盘导航和无障碍访问
    - _需求: 4.2, 4.4, 4.5_
  - [ ]* 4.3 编写 Select 组件属性测试
    - **Property 3: Select 选择功能正确性**
    - **验证: 需求 4.2**

- [x] 5. 检查点 - 确保所有组件正常工作
  - 确保所有测试通过，如有问题请询问用户

- [x] 6. 实现动态导入机制
  - [x] 6.1 创建错误边界组件
    - 在 `src/components/lazy/ErrorBoundary.tsx` 实现
    - 提供友好的错误提示
    - _需求: 5.3, 5.4_
  - [x] 6.2 创建懒加载包装器
    - 在 `src/components/lazy/LazyWrapper.tsx` 实现
    - 提供统一的 Loading 占位组件
    - _需求: 5.1, 5.2_
  - [x] 6.3 创建懒加载组件导出
    - 在 `src/components/lazy/index.tsx` 实现
    - 使用 React.lazy 封装各组件
    - 提供预加载函数
    - _需求: 2.1, 3.1, 4.1, 5.5_

- [x] 7. 主题集成验证
  - [x] 7.1 更新 CSS 变量
    - 在 `src/styles/index.css` 添加 shadcn/ui 需要的变量
    - _需求: 6.1_
  - [ ]* 7.2 编写主题切换属性测试
    - **Property 6: 主题切换响应正确性**
    - **验证: 需求 6.2**

- [x] 8. 创建组件统一导出
  - [x] 8.1 创建 UI 组件索引文件
    - 在 `src/components/ui/index.ts` 统一导出所有组件
    - _需求: 1.2_

- [x] 9. 最终检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请询问用户

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加快 MVP 开发
- 每个任务都引用了具体的需求以便追溯
- 检查点用于确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边界情况
