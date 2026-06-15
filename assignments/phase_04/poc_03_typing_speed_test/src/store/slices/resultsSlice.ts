import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TestResult } from "../../types";
import { STORAGE_KEYS } from "../../utils/constants";

const savedResults = localStorage.getItem(STORAGE_KEYS.TYPING_RESULT);

interface ResultsState {
  results: TestResult[];
}

const initialState: ResultsState = {
  results: savedResults ? JSON.parse(savedResults) : [],
};

const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<TestResult>) => {
      state.results.push(action.payload);

      localStorage.setItem(
        STORAGE_KEYS.TYPING_RESULT,
        JSON.stringify(state.results),
      );
    },

    clearResults: (state) => {
      state.results = [];

      localStorage.removeItem(STORAGE_KEYS.TYPING_RESULT);
    },
  },
});

export const { addResult, clearResults } = resultSlice.actions;
export default resultSlice.reducer;
