
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
