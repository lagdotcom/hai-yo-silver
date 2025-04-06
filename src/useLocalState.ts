import { SetStateAction, useCallback, useState } from "react";

function getByKey<T>(storageKey: string, defaultValue: T) {
  const value = localStorage.getItem(storageKey);
  if (value == null) return defaultValue;

  return JSON.parse(value) as T;
}

export default function useLocalState<T>(storageKey: string, defaultValue: T) {
  const [value, rawSetValue] = useState(getByKey(storageKey, defaultValue));

  const setValue = useCallback(
    (s: SetStateAction<T>) => {
      rawSetValue((old) => {
        const newValue = s instanceof Function ? s(old) : s;
        localStorage.setItem(storageKey, JSON.stringify(newValue));
        return newValue;
      });
    },
    [storageKey],
  );

  return [value, setValue] as const;
}
