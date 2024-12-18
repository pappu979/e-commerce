import { createSlice } from "@reduxjs/toolkit";
import { currentUser_id } from "../utils/authKeys";

const intialSignupState = {
  username: "",
  email: "",
  password: "",
  mobileNumber: "",
  id: currentUser_id,
  errors: {},
};

const intialLoginState = {
  email: "",
  password: "",
  errors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signup: intialSignupState,
    login: intialLoginState,
  },
  reducers: {
    updateSignupField: (state, action) => {
      state.signup[action.payload.field] = action.payload.value;
    },
    resetSignupForm: (state) => {
      state.signup = intialSignupState;
    },
    setSignupErrors: (state, action) => {
      state.signup.errors = action.payload;
    },
    updateLoginField: (state, action) => {
      state.login[action.payload.field] = action.payload.value;
    },
    resetLoginForm: (state) => {
      state.login = intialLoginState;
    },
    setLoginErrors: (state, action) => {
      state.login.errors = action.payload;
    },
  },
});

export const {
  updateSignupField,
  resetSignupForm,
  setSignupErrors,
  updateLoginField,
  resetLoginForm,
  setLoginErrors,
} = authSlice.actions;

export default authSlice.reducer;
