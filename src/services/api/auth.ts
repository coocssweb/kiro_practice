import { useMutation, useQuery } from '@tanstack/react-query';
import request, { ApiResponse } from '../request';
import { mockLogin, mockGetUserInfo, mockLogout, LoginParams, LoginResponse } from '../mock/auth';
import { UserInfo } from '@/store/slices/userSlice';

const isMockEnabled = process.env.REACT_APP_MOCK_ENABLED === 'true';

// API 方法
export const authApi = {
  login: async (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
    if (isMockEnabled) {
      return mockLogin(params);
    }
    const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', params);
    return response.data;
  },

  getUserInfo: async (): Promise<ApiResponse<UserInfo>> => {
    if (isMockEnabled) {
      return mockGetUserInfo();
    }
    const response = await request.get<ApiResponse<UserInfo>>('/auth/user');
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    if (isMockEnabled) {
      return mockLogout();
    }
    const response = await request.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },
};

// React Query Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

export const useUserInfo = (enabled = true) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: authApi.getUserInfo,
    enabled,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};
