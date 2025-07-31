import { useState, useCallback } from "react";
import type { CustomError } from "./fetcher";
import { useStableFn } from "./useStableFn";
import { useCompareEffect2 } from "./useCompareEffect";

const defaultHandleonError = (
  err: CustomError<{
    msg?: string;
  }>,
) => {
  try {
    return new Error(err?.body?.msg);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return err;
  }
};

export type Service<TData, TParams extends unknown[]> = (...args: TParams) => {
  promise: Promise<TData>;
  controller: AbortController;
};

export const useRequest = <TData, TParams extends unknown[]>(
  promiseFn: Service<TData, TParams>,
  options: {
    manual?: boolean;
    params?: TParams;
    onError?: (err: CustomError) => Error | CustomError;
    onSuccess?: (res: CustomError) => void;
  } = {},
) => {
  const {
    manual = true,
    params,
    onError = defaultHandleonError,
    onSuccess,
  } = options;

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const staPromiseFn = useStableFn(promiseFn);
  const staOnErrorFn = useStableFn(onError);
  const staOnSuccessFn = useStableFn(onSuccess);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
    setLoading(false);
  }, []);

  const run = useCallback(
    (...args: TParams) => {
      setLoading(true);
      setError(null);

      const tmp = staPromiseFn.current(...args);

      const finalPromise = tmp.promise
        .then((res) => {
          setData(res);
          setLoading(false);
          staOnSuccessFn.current?.(res);
          return res;
        })
        .catch((err) => {
          if (err.name === "AbortError") return;

          setLoading(false);
          setError(err);
          staOnErrorFn.current?.(err);
          throw err;
        });

      return {
        promise: finalPromise,
        controller: tmp.controller,
      };
    },
    [staPromiseFn, staOnErrorFn, staOnSuccessFn],
  );

  useCompareEffect2(() => {
    let controller = null;
    if (manual) {
      const tmp = run(...((params ?? []) as TParams));
      tmp.promise.catch(() => {});
      controller = tmp.controller;
    }
    return () => {
      controller?.abort?.();
    };
  }, [manual, params, run]);

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
};
