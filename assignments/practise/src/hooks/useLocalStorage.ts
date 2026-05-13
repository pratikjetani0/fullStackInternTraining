import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // GET DATA ONCE
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : initialValue;

  const [value, setValue] = useState<T>(initial);

  // SAVE DATA WHENEVER IT CHANGES
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
