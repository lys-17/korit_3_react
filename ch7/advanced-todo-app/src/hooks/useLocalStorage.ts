import { useState } from "react";

export function useLocalStorage<T>(key:string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item): initialValue;
    } catch (error) {
      console.error('LocalStorage error: ', error);
      return initialValue;
    };
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {
      console.error('LocalStorage error: ', error);
    }
  }

  return [storedValue, setValue] as const;
}