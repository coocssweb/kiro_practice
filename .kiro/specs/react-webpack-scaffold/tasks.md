# 实现计划: React + Webpack 企业级脚手架

## 概述

按照模块化方式逐步构建项目，从基础配置开始，逐步添加核心功能模块，最后完成登录和首页功能验收。

## 任务列表

- [x] 1. 项目初始化与基础配置
  - [x] 1.1 初始化项目结构和 package.json
    - 创建项目目录结构 (src/components, src/pages, src/hooks, src/store, src/services, src/utils, src/router, src/i18n, src/styles)
    - 初始化 package.json，配置基础依赖
    - _需求: 10.1-10.6_
  - [x] 1.2 配置 TypeScript
    - 创建 tsconfig.json，配置路径别名 @/
    - 配置严格模式和 React JSX 支持
    - _需求: 1.1_
  - [x] 1.3 配置 Webpack 基础构建
    - 创建 config/paths.js 路径配置
    - 创建 config/webpack.common.js 公共配置
    - 创建 config/webpack.dev.js 开发环境配置 (HMR, Fast Refresh)
    - _需求: 1.1, 1.2, 1.4_
  - [x] 1.4 配置 Webpack 多环境构建
    - 创建 config/webpack.test.js 测试环境配置
    - 创建 config/webpack.pre.js 预发布环境配置
    - 创建 config/webpack.prod.js 生产环境配置 (压缩, tree shaking, source map)
    - 创建 .env.development, .env.test, .env.pre, .env.production 环境变量文件
    - _需求: 1.1, 1.3, 1.5_
  - [x] 1.5 配置代码分割
    - 配置 splitChunks (react-vendor, redux-vendor, vendors, common)
    - 配置动态导入支持
    - _需求: 1.6_

- [x] 2. 配置 TailwindCSS 与主题系统
  - [x] 2.1 安装配置 TailwindCSS
    - 创建 tailwind.config.js
    - 创建 postcss.config.js
    - 创建 src/styles/index.css 入口文件
    - _需求: 3.2_
  - [x] 2.2 实现双主题系统
    - 定义 dark 和 gray 主题 CSS 变量
    - 配置 TailwindCSS 使用 CSS 变量
    - _需求: 3.1_

- [x] 3. 配置 Redux Toolkit 状态管理
  - [x] 3.1 创建 Store 配置
    - 创建 src/store/index.ts，配置 Redux Toolkit store
    - 集成 Redux DevTools
    - _需求: 2.1, 2.2_
  - [x] 3.2 实现 User Slice
    - 创建 src/store/slices/userSlice.ts
    - 实现 setUser, clearUser actions
    - 定义 UserState 类型
    - _需求: 2.3, 2.5_
  - [x] 3.3 实现 Theme Slice
    - 创建 src/store/slices/themeSlice.ts
    - 实现 setTheme action
    - 集成 localStorage 持久化
    - _需求: 2.4, 3.4, 3.5_

- [x] 4. 配置服务层 (Axios + TanStack Query)
  - [x] 4.1 创建 Axios 实例
    - 创建 src/services/request.ts
    - 配置 baseURL, timeout, headers
    - 实现请求拦截器 (添加 token)
    - 实现响应拦截器 (错误处理, 401 重定向)
    - _需求: 4.1, 4.2, 4.3, 4.4_
  - [x] 4.2 配置 TanStack Query
    - 创建 src/services/queryClient.ts
    - 配置 QueryClient 默认选项
    - _需求: 4.5_
  - [x] 4.3 创建 Mock 数据
    - 创建 src/services/mock/auth.ts (登录, 用户信息 mock)
    - 创建 src/services/mock/index.ts (mock 入口)
    - _需求: 4.7_
  - [x] 4.4 创建认证 API 服务
    - 创建 src/services/api/auth.ts
    - 实现 login, getUserInfo, logout 方法
    - 创建 useLogin, useUserInfo hooks
    - _需求: 4.6_

- [x] 5. 配置路由系统
  - [x] 5.1 创建路由配置
    - 创建 src/router/routes.ts 声明式路由配置
    - 配置路由元数据 (title, requiresAuth)
    - _需求: 5.1_
  - [x] 5.2 实现路由懒加载与预加载
    - 创建 src/utils/prefetch.ts 预加载工具
    - 实现 createLazyComponent 工厂函数
    - 实现 requestIdleCallback 空闲预加载
    - _需求: 5.5, 5.6_
  - [x] 5.3 实现路由守卫
    - 创建 src/router/AuthGuard.tsx
    - 实现未认证重定向逻辑
    - 实现登录后返回原页面逻辑
    - _需求: 5.2, 5.3, 5.4_
  - [x] 5.4 创建路由入口
    - 创建 src/router/index.tsx
    - 整合路由配置、懒加载、守卫
    - _需求: 5.1_

- [x] 6. 配置国际化
  - [x] 6.1 创建 i18n 配置
    - 创建 src/i18n/index.ts
    - 配置 i18next 和 react-i18next
    - 集成 localStorage 持久化
    - _需求: 6.1, 6.4, 6.5_
  - [x] 6.2 创建语言包
    - 创建 src/i18n/locales/zh.ts 中文语言包
    - 创建 src/i18n/locales/en.ts 英文语言包
    - _需求: 6.1_

- [x] 7. 创建工具函数和 Hooks
  - [x] 7.1 创建存储工具
    - 创建 src/utils/storage.ts (localStorage 封装)
    - _需求: 3.4, 6.4_
  - [x] 7.2 创建自定义 Hooks
    - 创建 src/hooks/useAuth.ts (认证状态 hook)
    - 创建 src/hooks/useTheme.ts (主题切换 hook)
    - _需求: 2.3, 2.4_

- [x] 8. 创建公共组件
  - [x] 8.1 创建布局组件
    - 创建 src/components/Layout/index.tsx
    - 包含主题切换、语言切换、用户信息展示
    - _需求: 6.2, 3.3_
  - [x] 8.2 创建主题切换组件
    - 创建 src/components/ThemeSwitcher/index.tsx
    - _需求: 3.3_
  - [x] 8.3 创建语言切换组件
    - 创建 src/components/LanguageSwitcher/index.tsx
    - _需求: 6.2_

- [x] 9. 实现登录功能
  - [x] 9.1 创建登录页面
    - 创建 src/pages/Login/index.tsx
    - 实现登录表单 (用户名、密码)
    - 集成 useLogin hook
    - 实现登录成功跳转首页
    - 实现错误提示
    - _需求: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. 实现首页功能
  - [x] 10.1 创建首页
    - 创建 src/pages/Home/index.tsx
    - 显示用户信息
    - 实现登出功能
    - _需求: 8.1, 8.2, 8.3, 8.4_

- [x] 11. 创建应用入口
  - [x] 11.1 创建 App 组件
    - 创建 src/App.tsx
    - 整合 Provider (Redux, QueryClient, Router, I18n)
    - _需求: 2.1, 4.5, 5.1, 6.1_
  - [x] 11.2 创建渲染入口
    - 创建 src/index.tsx
    - 创建 public/index.html
    - _需求: 1.1_

- [x] 12. 配置代码质量工具
  - [x] 12.1 配置 ESLint 和 Prettier
    - 创建 .eslintrc.js
    - 创建 .prettierrc
    - 添加 lint 和 format npm scripts
    - _需求: 9.1, 9.3_
  - [x] 12.2 配置 Husky 和 lint-staged
    - 配置 husky pre-commit hook
    - 配置 lint-staged
    - _需求: 9.1, 9.4_
  - [x] 12.3 配置 Commitlint
    - 创建 commitlint.config.js
    - 配置 commit-msg hook
    - _需求: 9.2_

- [x] 13. 检查点 - 项目验收
  - 运行 yarn start 确保开发服务器正常启动
  - 运行 yarn build 确保生产构建成功
  - 验证 /login 页面可访问，mock 登录功能正常
  - 验证登录成功后跳转首页，显示用户信息
  - 验证登出功能正常
  - 验证主题切换功能
  - 验证语言切换功能
  - 确保所有测试通过，如有问题请询问用户

## 备注

- 任务按顺序执行，每个任务完成后进行验证
- 优先使用 useRef / memo / useCallback 优化性能
- 遵循 TypeScript 严格模式
- 代码风格遵循 ESLint + Prettier 配置
