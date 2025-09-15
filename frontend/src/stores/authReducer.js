import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    email: "",
    password: "",
  },
  user: null,
  loadingCheckAuth: false,
  errorCheckAuth: null,
  loadingLogin: false,
  errorLogin: null,
  loadingLogout: false,
  errorLogout: null,
};

// --------------------- Thunks ---------------------

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get(`${API_URL}/api/users/check-auth`,{ withCredentials: true });
  return res.data.email;
});

export const login = createAsyncThunk("auth/login", async (loginForm) => {
  const res = await axios.post(`${API_URL}/api/users/login`, loginForm,{ withCredentials: true });
  localStorage.setItem("user", res.data.email);
  return res.data.email;
});

export const signup = createAsyncThunk("auth/signup", async (signupForm) => {
  const res = await axios.post(`${API_URL}/api/users/signup`, signupForm, { withCredentials: true });
  localStorage.setItem("user", res.data.email);
  return res.data.email;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.get(`${API_URL}/api/users/logout`,{ withCredentials: true });
  localStorage.removeItem("user");
});

// --------------------- Slice ---------------------

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginForm: (state, action) => {
      state.loginForm = action.payload;
    },
    resetLoginForm: (state) => {
      state.loginForm = initialState.loginForm;
    },
    setSignupForm: (state, action) => {
      state.signupForm = action.payload;
    },
    resetSignupForm: (state) => {
      state.signupForm = initialState.signupForm;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- checkAuth ----------
      .addCase(checkAuth.pending, (state) => {
        state.loadingCheckAuth = true;
        state.errorCheckAuth = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loadingCheckAuth = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loadingCheckAuth = false;
        state.user = null;
        state.errorCheckAuth = action.error.message;
      })

      // -------- login ----------
      .addCase(login.pending, (state) => {
        state.loadingLogin = true;
        state.errorLogin = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingLogin = false;
        state.user = null;
        state.errorLogin = action.error.message;
      })

      // -------- signup ----------
      .addCase(signup.pending, (state) => {
        state.loadingCheckAuth = true;
        state.errorCheckAuth = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loadingCheckAuth = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loadingCheckAuth = false;
        state.user = null;
        state.errorCheckAuth = action.error.message;
      })

      // -------- logout ----------
      .addCase(logoutUser.pending, (state) => {
        state.loadingLogout = true;
        state.errorLogout = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loadingLogout = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loadingLogout = false;
        state.errorLogout = action.error.message;
      });
  },
});

export const {
  setLoginForm,
  resetLoginForm,
  setSignupForm,
  resetSignupForm,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
