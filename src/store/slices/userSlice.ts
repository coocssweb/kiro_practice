import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar?: string;
  roles: string[];
}

export interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  token: string | null;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

const getInitialState = (): UserState => {
  const token = localStorage.getItem(TOKEN_KEY);
  const userInfoStr = localStorage.getItem(USER_KEY);
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

  return {
    isAuthenticated: !!token && !!userInfo,
    userInfo,
    token,
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; userInfo: UserInfo }>) => {
      const { token, userInfo } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.userInfo = userInfo;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
