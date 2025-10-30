import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/userProfile/profileSlice";
import type { AuthState } from "../features/auth/types";
import productsReducer from "../features/products/productsSlice";

const PERSIST_KEY = "ecom_auth";

function loadAuthState(): AuthState | undefined {
  try {
    const stored = localStorage.getItem(PERSIST_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object" && "user" in parsed) {
      return parsed as AuthState;
    }
  } catch (err) {
    console.warn("Invalid auth state in localStorage", err);
  }
  return undefined;
}

const preloadedAuth = loadAuthState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    products: productsReducer,
  },
  preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
});

store.subscribe(() => {
  const { auth } = store.getState();
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(auth));
  } catch (err) {
    console.warn("Failed to save auth state", err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
