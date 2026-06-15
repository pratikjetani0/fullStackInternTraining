import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";
import { STORAGE_KEYS } from "../../utils/constants";

const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(action.payload),
      );
    },

    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;

      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
