import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthResponse } from "./types";
import type { RootState } from "../../app/store";

interface LoginCreds {
  username: string;
  password: string;
}

export const loginThunk = createAsyncThunk<AuthResponse, LoginCreds>(
  "auth/login",
  async ({ username, password }) => {
    const { data } = await axios.post<AuthResponse>(
      "https://dummyjson.com/auth/login",
      { username, password }
    );
    return data;
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return;
});

export const changePasswordThunk = createAsyncThunk<
  { message: string },
  { currentPassword: string; newPassword: string },
  { state: RootState; rejectValue: { message: string } }
>(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?.id;
    if (!userId) {
      return rejectWithValue({ message: "Not authenticated" });
    }

    try {
      await axios.put(`https://dummyjson.com/users/${userId}`, {
        password: newPassword,
        oldPassword: currentPassword,
      });
      return { message: "Password changed" };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({ message: err.message });
      }
      return rejectWithValue({ message: "Failed to change password" });
    }
  }
);
