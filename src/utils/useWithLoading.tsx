import {useState} from 'react';

export function useWithLoading(fn:any) {
  const [loading, setLoading] = useState(false);

  const func = (...args:any) => {
    setLoading(true);
    return fn(...args).finally(() => {
      setLoading(false);
    });
  };

  return { func, loading };
}
