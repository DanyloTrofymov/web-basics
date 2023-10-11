import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debouncedValue;
}
