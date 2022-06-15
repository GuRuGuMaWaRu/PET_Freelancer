import { useState, useEffect } from "react";

export const useLocalStorageWithState = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  const clearStoredValue = () => {
    localStorage.removeItem(key);
    setStoredValue(defaultValue);
  };

  return [storedValue, setStoredValue, clearStoredValue];
};
