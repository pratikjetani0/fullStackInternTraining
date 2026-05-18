import type { TestResult } from "../types";
import { STORAGE_KEYS } from "../utils/constants";
import { useLocalStorage } from "./useLocalStorage";

export function useResults() {
  const [results, setResults] = useLocalStorage<TestResult[]>(
    STORAGE_KEYS.TYPING_RESULT,
    [],
  );

  const addResult = (result: TestResult) => {
    setResults((prev) => [result, ...prev]);
  };

  return { results, addResult };
}
