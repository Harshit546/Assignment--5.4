import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthResponse } from "./types";
import { loginThunk, logoutThunk } from "./authThunks";

const initialState: AuthState = {
  user: null,
  accessToken: undefined,
  refreshToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        const { accessToken, refreshToken, ...user } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    );
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    });
  },
});

export default authSlice.reducer;
