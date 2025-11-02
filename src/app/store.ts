import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/userProfile/profileSlice";
import type { AuthState } from "../features/auth/types";
import productsReducer from "../features/products/productsSlice";

// To persist authentication data in localstorage
const PERSIST_KEY = "ecom_auth";

// Loads the persisted authentication state from localStorage and returns the AuthState object if valid or undefined otherwise
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

// Preload the state with persisted AuthState if it is available
const preloadedAuth = loadAuthState();

// Create and configure the Redux store for the application
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    products: productsReducer,
  },
  preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
});

// Each time the store updates, the auth state is saved to localStorage
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
