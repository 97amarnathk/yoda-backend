'use client';
import { DependencyList, useEffect, useState } from 'react';

export interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useQuery<T>(fetcher: () => Promise<T>, deps: DependencyList, enabled = true): QueryState<T> {
  const [state, setState] = useState<QueryState<T>>({ data: null, loading: enabled, error: null });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetcher()
      .then((data) => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch((error: Error) => { if (!cancelled) setState({ data: null, loading: false, error }); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return state;
}

export function useCountUp(targets: Record<string, number>, trigger: any) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    const start = performance.now();
    const duration = 700;
    const startVals: Record<string, number> = {};
    Object.keys(targets).forEach((k) => { startVals[k] = 0; });
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const vals: Record<string, number> = {};
      Object.keys(targets).forEach((k) => { vals[k] = Math.round(startVals[k] + (targets[k] - startVals[k]) * eased); });
      setCounts((c) => ({ ...c, ...vals }));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return counts;
}
