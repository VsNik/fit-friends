import { useEffect } from 'react';

type CallbackFn = { (): void };

export function useDebounce(callback: CallbackFn, value: number | number[], isChanged: boolean, delay?: number) {
  useEffect(() => {
    if (isChanged) {
      const timer = setTimeout(() => callback(), delay || 500);
      return () => clearTimeout(timer);
    }
  }, [value, delay, callback, isChanged]);
}
