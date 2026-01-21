---
inclusion: fileMatch
fileMatchPattern: "*.tsx|*.jsx"
---

# 前端开发规范

## 一、组件架构

- 使用函数式组件配合 Hooks（React）
- 保持组件小而专注，职责单一
- 实现完善的 props 校验
- 使用 TypeScript 进行类型约束
- 遵循组件组合模式

## 二、状态管理

- 组件内部状态使用 local state
- 跨组件共享数据使用全局状态
- 选用合适的状态管理库（Redux、Zustand、Pinia）
- 通过 Context 或状态管理避免 props 层层传递

## 三、样式规范

- 使用 CSS Modules 或 styled-components 实现组件样式隔离
- CSS 类名遵循 BEM 命名规范
- 采用移动优先的响应式设计
- 使用 CSS 自定义属性实现主题切换
- 保持间距和字体比例的一致性

## 四、性能优化

- 实现代码分割和懒加载
- 对性能开销大的组件使用 React.memo 等优化手段
- 优化图片和静态资源
- 实现合理的缓存策略
- 监控打包体积和性能指标

## 五、无障碍标准

- 使用语义化 HTML 标签
- 正确使用 ARIA 属性
- 确保键盘导航可用
- 保持足够的颜色对比度
- 使用屏幕阅读器进行测试

## 六、测试策略

- 为工具函数编写单元测试
- 使用 React Testing Library 进行组件测试
- 实现视觉回归测试
- 测试用户交互和业务流程
- 正确 mock 外部依赖
