import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import resultsReducer from "./slices/resultsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
