# 需求文档

## 简介

企业级 React + Webpack 项目脚手架，支持多环境配置、主题切换、国际化、权限路由等生产级特性。项目采用 TypeScript 开发，遵循大厂规范，具备良好的可维护性和扩展性。

## 术语表

- **Webpack_Builder**: Webpack 构建系统，负责项目打包、代码分割、环境配置
- **Theme_System**: 主题系统，管理深色/灰色两种皮肤切换
- **Auth_Guard**: 路由守卫，负责权限验证和路由保护
- **Store_Manager**: Redux Toolkit 状态管理器
- **Service_Layer**: 服务层，基于 Axios + TanStack Query 封装的 HTTP 请求与数据缓存模块
- **I18n_Module**: 国际化模块，基于 i18next 的多语言支持
- **Route_Config**: 路由配置系统，支持声明式路由配置

## 需求列表

### 需求 1: Webpack 多环境构建配置

**用户故事:** 作为开发者，我希望有独立的 test、pre、prod 环境 webpack 配置，以便轻松构建和部署到不同环境。

#### 验收标准

1. Webpack_Builder 应提供 test、pre、prod 三个环境的独立配置文件
2. Webpack_Builder 应支持所有环境共享的基础配置
3. 当构建生产环境时，Webpack_Builder 应启用代码压缩、tree shaking 和 source map 生成
4. 当构建开发环境时，Webpack_Builder 应启用热模块替换和快速刷新
5. Webpack_Builder 应通过 .env 文件支持环境特定变量
6. Webpack_Builder 应实现 vendor chunks 和动态导入的代码分割

### 需求 2: Redux Toolkit 状态管理

**用户故事:** 作为开发者，我希望使用 Redux Toolkit 进行全局状态管理并支持 DevTools，以便高效管理应用状态。

#### 验收标准

1. Store_Manager 应配置带有完整 TypeScript 类型的 Redux Toolkit
2. Store_Manager 应集成 Redux DevTools 用于开发调试
3. Store_Manager 应提供 user slice 存储已认证用户信息
4. Store_Manager 应提供 theme slice 管理当前主题状态
5. 当用户登录成功时，Store_Manager 应将用户信息持久化到 user slice

### 需求 3: TailwindCSS 双主题系统

**用户故事:** 作为用户，我希望在深色和灰色主题之间切换，以便自定义应用外观。

#### 验收标准

1. Theme_System 应提供深色主题和灰色主题预设
2. Theme_System 应与 TailwindCSS 集成进行样式管理
3. 当用户切换主题时，Theme_System 应立即应用新主题，无需页面刷新
4. Theme_System 应将主题偏好持久化到 localStorage
5. 当应用加载时，Theme_System 应恢复之前选择的主题

### 需求 4: HTTP 服务层

**用户故事:** 作为开发者，我希望有一个结构良好的 Axios + TanStack Query 服务层，以便进行具有一致错误处理、缓存和数据同步的 HTTP 请求。

#### 验收标准

1. Service_Layer 应提供带有基础配置的 Axios 实例
2. Service_Layer 应实现请求拦截器用于添加认证令牌
3. Service_Layer 应实现响应拦截器用于处理通用错误
4. 如果 API 请求返回 401 未授权，则 Service_Layer 应重定向到登录页面
5. Service_Layer 应配置 TanStack Query 的 QueryClient 用于数据缓存和状态管理
6. Service_Layer 应提供 useQuery 和 useMutation 的封装 hooks
7. Service_Layer 应支持开发和测试用的 mock 数据

### 需求 5: 权限路由系统

**用户故事:** 作为开发者，我希望有一个可配置的路由系统带有认证守卫，以便声明式地保护路由和管理导航。

#### 验收标准

1. Route_Config 应支持带有元数据的声明式路由配置
2. Auth_Guard 应保护除登录页外的所有路由
3. 当未认证用户访问受保护路由时，Auth_Guard 应重定向到登录页面
4. 当用户登录成功时，Auth_Guard 应重定向到原始请求的页面
5. Route_Config 应支持路由组件的懒加载
6. Route_Config 应实现空闲时预加载以提升导航性能

### 需求 6: 国际化支持

**用户故事:** 作为用户，我希望使用不同语言的应用，以便用我偏好的语言理解界面。

#### 验收标准

1. I18n_Module 应至少支持中文和英文
2. I18n_Module 应提供语言切换组件
3. 当用户切换语言时，I18n_Module 应立即更新所有文本
4. I18n_Module 应将语言偏好持久化到 localStorage
5. 当应用加载时，I18n_Module 应恢复之前选择的语言

### 需求 7: 登录功能

**用户故事:** 作为用户，我希望登录应用，以便访问受保护的功能。

#### 验收标准

1. 当用户访问 /login 路由时，系统应显示包含用户名和密码字段的登录表单
2. 当用户提交有效凭据时，Service_Layer 应调用 mock 登录 API
3. 当登录成功时，Store_Manager 应存储用户信息并重定向到首页
4. 如果登录失败，则系统应显示错误消息
5. 登录页面应无需认证即可访问

### 需求 8: 首页功能

**用户故事:** 作为已认证用户，我希望看到显示我用户信息的首页，以便验证我的登录状态。

#### 验收标准

1. 当已认证用户访问 / 路由时，系统应显示首页
2. 首页应显示来自 store 的当前用户信息
3. 首页应提供登出按钮
4. 当用户点击登出时，Store_Manager 应清除用户信息并重定向到登录页
5. 如果未认证用户访问首页，则 Auth_Guard 应重定向到登录页

### 需求 9: 代码质量保障

**用户故事:** 作为开发者，我希望有自动化的代码质量检查，以便团队保持一致的代码风格和提交规范。

#### 验收标准

1. 系统应在提交前对暂存文件运行 ESLint 和 Prettier
2. 系统应根据约定式提交格式验证提交信息
3. 系统应提供手动 lint 和格式化的 npm 脚本
4. 当发现 lint 错误时，系统应阻止提交

### 需求 10: 项目结构规范

**用户故事:** 作为开发者，我希望有组织良好的项目结构，以便轻松查找和维护代码。

#### 验收标准

1. 系统应提供 components 目录用于可复用 UI 组件
2. 系统应提供 utils 目录用于工具函数
3. 系统应提供 store 目录用于 Redux slices 和配置
4. 系统应提供 services 目录用于 API 服务模块
5. 系统应提供 pages 目录用于路由页面组件
6. 系统应提供 hooks 目录用于自定义 React hooks
