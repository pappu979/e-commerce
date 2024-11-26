import { createSlice } from '@reduxjs/toolkit';
import { removeLogoutLocalStorage } from '../validation/localStorage';

const initialUserState = JSON.parse(localStorage.getItem("currentUser")) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialUserState,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      removeLogoutLocalStorage();
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
