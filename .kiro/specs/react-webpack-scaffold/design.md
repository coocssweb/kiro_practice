# 设计文档

## 概述

本项目是一个企业级 React + Webpack 脚手架，采用模块化架构设计。核心模块包括：构建系统、状态管理、主题系统、服务层、路由系统、国际化模块。项目使用 TypeScript 开发，遵循关注点分离原则。

## 架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Application                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │  Components │  │       Hooks         │  │
│  │  - Login    │  │  - Layout   │  │  - useAuth          │  │
│  │  - Home     │  │  - Theme    │  │  - useTheme         │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
├─────────┴────────────────┴─────────────────────┴─────────────┤
│                      Core Services                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Router    │  │    Store    │  │    Service Layer    │  │
│  │  (React     │  │  (Redux     │  │  (Axios + TanStack  │  │
│  │   Router)   │  │   Toolkit)  │  │   Query)            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Infrastructure                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Webpack   │  │  TailwindCSS│  │      i18next        │  │
│  │   Builder   │  │  + Themes   │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 组件与接口

### 1. Webpack 构建系统

```
config/
├── webpack.common.js      # 公共配置
├── webpack.dev.js         # 开发环境配置
├── webpack.test.js        # 测试环境配置
├── webpack.pre.js         # 预发布环境配置
├── webpack.prod.js        # 生产环境配置
└── paths.js               # 路径配置
```

**配置策略：**
- 使用 `webpack-merge` 合并配置
- 环境变量通过 `dotenv-webpack` 注入
- 代码分割策略：vendor (node_modules) + common (共享代码) + 动态导入

### 2. 状态管理 (Redux Toolkit)

```typescript
// store/index.ts
interface RootState {
  user: UserState;
  theme: ThemeState;
}

// store/slices/userSlice.ts
interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  token: string | null;
}

// store/slices/themeSlice.ts
interface ThemeState {
  mode: 'dark' | 'gray';
}
```

### 3. 主题系统

```typescript
// 主题配置
type ThemeMode = 'dark' | 'gray';

// TailwindCSS 主题变量
const themes = {
  dark: {
    '--bg-primary': '#1a1a2e',
    '--bg-secondary': '#16213e',
    '--text-primary': '#eaeaea',
    '--text-secondary': '#a0a0a0',
  },
  gray: {
    '--bg-primary': '#2d2d2d',
    '--bg-secondary': '#3d3d3d',
    '--text-primary': '#f5f5f5',
    '--text-secondary': '#b0b0b0',
  }
};
```

### 4. 服务层 (Axios + TanStack Query)

```typescript
// services/request.ts - Axios 实例
interface RequestConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// services/queryClient.ts - TanStack Query 配置
interface QueryClientConfig {
  defaultOptions: {
    queries: {
      staleTime: number;
      retry: number;
      refetchOnWindowFocus: boolean;
    };
  };
}

// services/api/auth.ts - 认证 API
interface AuthAPI {
  login(credentials: LoginParams): Promise<LoginResponse>;
  getUserInfo(): Promise<UserInfo>;
  logout(): Promise<void>;
}
```

### 5. 路由系统

```typescript
// router/routes.ts
interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType>;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
  };
  children?: RouteConfig[];
}

// router/AuthGuard.tsx
interface AuthGuardProps {
  children: React.ReactNode;
}
```

### 6. 代码拆包与智能预加载

**代码分割策略：**

```javascript
// webpack 配置 - splitChunks
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // React 核心库单独打包
      react: {
        name: 'react-vendor',
        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        priority: 20,
      },
      // Redux 相关单独打包
      redux: {
        name: 'redux-vendor',
        test: /[\\/]node_modules[\\/](@reduxjs|redux|react-redux)[\\/]/,
        priority: 15,
      },
      // 其他第三方库
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
      },
      // 公共代码
      common: {
        name: 'common',
        minChunks: 2,
        priority: 5,
      },
    },
  },
}
```

**路由懒加载：**

```typescript
// 使用 React.lazy 实现按需加载
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
```

**智能预加载策略：**

```typescript
// utils/prefetch.ts
interface PrefetchConfig {
  routes: string[];           // 需要预加载的路由
  delay: number;              // 延迟时间 (ms)
  onIdle: boolean;            // 是否在空闲时预加载
}

// 使用 requestIdleCallback 在浏览器空闲时预加载
const prefetchRoute = (importFn: () => Promise<unknown>) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn();
    }, { timeout: 2000 });
  } else {
    // 降级方案：使用 setTimeout
    setTimeout(() => {
      importFn();
    }, 200);
  }
};

// 预加载组件工厂
const createLazyComponent = (
  importFn: () => Promise<{ default: React.ComponentType }>,
  prefetch: boolean = true
) => {
  const Component = lazy(importFn);
  
  // 在空闲时预加载
  if (prefetch) {
    prefetchRoute(importFn);
  }
  
  return Component;
};
```

**预加载触发时机：**

1. **应用启动后** - 在首屏渲染完成后，利用空闲时间预加载其他路由
2. **鼠标悬停** - 当用户悬停在导航链接上时，预加载对应路由
3. **视口可见** - 使用 Intersection Observer 预加载即将进入视口的内容

```typescript
// hooks/usePrefetch.ts
const usePrefetch = (importFn: () => Promise<unknown>) => {
  const prefetch = useCallback(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => importFn());
    }
  }, [importFn]);

  return { prefetch };
};

// 使用示例 - 鼠标悬停预加载
<Link 
  to="/dashboard" 
  onMouseEnter={() => prefetch()}
>
  Dashboard
</Link>
```

### 7. 国际化模块

```typescript
// i18n/index.ts
interface I18nConfig {
  lng: string;
  fallbackLng: string;
  resources: {
    zh: { translation: Record<string, string> };
    en: { translation: Record<string, string> };
  };
}
```

## 数据模型

### 用户模型

```typescript
interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar?: string;
  roles: string[];
}

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}
```

### API 响应模型

```typescript
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
```

## 目录结构

```
src/
├── components/           # 公共组件
│   ├── Layout/          # 布局组件
│   └── ThemeSwitcher/   # 主题切换器
├── hooks/               # 自定义 Hooks
│   ├── useAuth.ts       # 认证 Hook
│   └── useTheme.ts      # 主题 Hook
├── pages/               # 页面组件
│   ├── Login/           # 登录页
│   └── Home/            # 首页
├── router/              # 路由配置
│   ├── index.tsx        # 路由入口
│   ├── routes.ts        # 路由配置
│   └── AuthGuard.tsx    # 路由守卫
├── services/            # 服务层
│   ├── request.ts       # Axios 实例
│   ├── queryClient.ts   # TanStack Query 配置
│   ├── mock/            # Mock 数据
│   └── api/             # API 模块
├── store/               # Redux Store
│   ├── index.ts         # Store 配置
│   └── slices/          # Redux Slices
├── i18n/                # 国际化
│   ├── index.ts         # i18n 配置
│   └── locales/         # 语言包
├── utils/               # 工具函数
│   └── storage.ts       # 本地存储工具
├── styles/              # 样式文件
│   └── index.css        # TailwindCSS 入口
├── App.tsx              # 应用入口
└── index.tsx            # 渲染入口
```


## 正确性属性

*正确性属性是系统在所有有效执行中应保持为真的特征或行为——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

基于验收标准分析，以下是可通过属性测试验证的核心属性：

### Property 1: User Slice 状态一致性

*对于任意* 用户信息对象，当调用 setUser action 后，store 中的 userInfo 应与传入的对象相等，且 isAuthenticated 应为 true。

**验证: 需求 2.3, 2.5**

### Property 2: Theme Slice 状态切换

*对于任意* 主题模式 ('dark' | 'gray')，当调用 setTheme action 后，store 中的 theme.mode 应与传入的模式相等。

**验证: 需求 2.4**

### Property 3: 主题持久化往返一致性

*对于任意* 主题模式，保存到 localStorage 后再读取，应得到相同的主题模式。

**验证: 需求 3.4, 3.5**

### Property 4: 语言持久化往返一致性

*对于任意* 语言代码 ('zh' | 'en')，保存到 localStorage 后再读取，应得到相同的语言代码。

**验证: 需求 6.4, 6.5**

### Property 5: 请求拦截器 Token 注入

*对于任意* 已认证状态下的 HTTP 请求，请求头中应包含 Authorization 字段且值为当前 token。

**验证: 需求 4.2**

### Property 6: 路由守卫认证检查

*对于任意* 受保护路由和未认证状态，访问该路由应触发重定向到登录页。

**验证: 需求 5.2, 5.3, 8.5**

## 错误处理

### HTTP 错误处理

| 错误码 | 处理方式 |
|--------|----------|
| 401 | 清除 token，重定向到登录页 |
| 403 | 显示权限不足提示 |
| 500 | 显示服务器错误提示 |
| 网络错误 | 显示网络连接失败提示 |

### 表单验证错误

- 用户名为空：显示"请输入用户名"
- 密码为空：显示"请输入密码"
- 登录失败：显示"用户名或密码错误"

## 测试策略

### 单元测试

使用 Jest + React Testing Library 进行单元测试：

- **Redux Slices**: 测试 reducers 和 actions
- **工具函数**: 测试 storage 工具的读写
- **自定义 Hooks**: 测试 useAuth、useTheme 的行为

### 属性测试

使用 fast-check 进行属性测试：

- 配置每个属性测试运行至少 100 次迭代
- 每个测试标注对应的设计文档属性编号
- 标签格式: **Feature: react-webpack-scaffold, Property {number}: {property_text}**

### 集成测试

- 登录流程：表单提交 → API 调用 → Store 更新 → 路由跳转
- 登出流程：点击登出 → Store 清除 → 路由跳转
- 主题切换：点击切换 → Store 更新 → localStorage 持久化

### 测试覆盖目标

- 核心业务逻辑覆盖率 > 80%
- Redux Slices 覆盖率 100%
- 工具函数覆盖率 100%
