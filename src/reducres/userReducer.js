import { createSlice } from "@reduxjs/toolkit";
import { removeLogoutLocalStorage } from "../utils/helperFunction/localStorage";
import { toast } from "react-toastify";

const initialUserState =
  JSON.parse(localStorage.getItem("currentUser")) || null;

const userSlice = createSlice({
  name: "user",
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
      toast.success("You have successfully logged out!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
