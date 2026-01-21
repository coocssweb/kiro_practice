import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser, clearUser, UserInfo } from '@/store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userInfo, token } = useAppSelector((state) => state.user);

  const login = useCallback(
    (data: { token: string; userInfo: UserInfo }) => {
      dispatch(setUser(data));
      // 登录后跳转到原来的页面或首页
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    },
    [dispatch, navigate, location.state]
  );

  const logout = useCallback(() => {
    dispatch(clearUser());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return {
    isAuthenticated,
    userInfo,
    token,
    login,
    logout,
  };
};
