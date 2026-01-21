import { ApiResponse } from '../request';
import { UserInfo } from '@/store/slices/userSlice';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

// Mock 用户数据
const mockUsers: Record<string, { password: string; userInfo: UserInfo }> = {
  admin: {
    password: 'admin123',
    userInfo: {
      id: '1',
      username: 'admin',
      nickname: '管理员',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      roles: ['admin'],
    },
  },
  user: {
    password: 'user123',
    userInfo: {
      id: '2',
      username: 'user',
      nickname: '普通用户',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      roles: ['user'],
    },
  },
};

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock 登录
export const mockLogin = async (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  await delay(500);

  const user = mockUsers[params.username];
  if (!user || user.password !== params.password) {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: null as unknown as LoginResponse,
    };
  }

  return {
    code: 0,
    message: 'success',
    data: {
      token: `mock_token_${Date.now()}`,
      userInfo: user.userInfo,
    },
  };
};

// Mock 获取用户信息
export const mockGetUserInfo = async (): Promise<ApiResponse<UserInfo>> => {
  await delay(300);

  const userInfoStr = localStorage.getItem('user_info');
  if (!userInfoStr) {
    return {
      code: 401,
      message: '未登录',
      data: null as unknown as UserInfo,
    };
  }

  return {
    code: 0,
    message: 'success',
    data: JSON.parse(userInfoStr),
  };
};

// Mock 登出
export const mockLogout = async (): Promise<ApiResponse<null>> => {
  await delay(200);
  return {
    code: 0,
    message: 'success',
    data: null,
  };
};
