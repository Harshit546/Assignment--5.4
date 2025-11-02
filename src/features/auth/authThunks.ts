import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthResponse } from "./types";
import type { RootState } from "../../app/store";

interface LoginCreds {
  username: string;
  password: string;
}

// Async thunk for user login
export const loginThunk = createAsyncThunk<AuthResponse, LoginCreds>(
  "auth/login",
  async ({ username, password }) => {
    // Send POST request to login endpoint
    const { data } = await axios.post<AuthResponse>(
      "https://dummyjson.com/auth/login",
      { username, password }
    );
    // Returns user and token information as an AuthResponse
    return data;
  }
);

// Async thunk for user logout
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return;
});

// Async thunk for changing the user's password
export const changePasswordThunk = createAsyncThunk<
  { message: string },
  { currentPassword: string; newPassword: string },
  { state: RootState; rejectValue: { message: string } }
>(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    // Get the current authentication state
    const state = getState();
    const userId = state.auth.user?.id;
    // Reject if user is not authenticated
    if (!userId) {
      return rejectWithValue({ message: "Not authenticated" });
    }

    try {
      // Make a PUT request to change the password
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
