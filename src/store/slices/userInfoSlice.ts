import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
  name: string;
  email: string;
}

const initialState: UserInfoState = {
  name: '',
  email: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfoName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserInfoEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetUserInfo: (state) => {
      state.name = initialState.name;
      state.email = initialState.email;
    },
  },
});

export const { setUserInfoName, setUserInfoEmail, resetUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
