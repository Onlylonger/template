import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import type { CustomError } from "./fetcher";
import { usePrevious } from "./usePrevious";
import isEqual from "react-fast-compare";

const defaultHandleTransformErrorRes = (
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

export type Service<TData, TParams extends unknown[]> = (
  ...args: TParams
) => Promise<TData>;

// 定义扩展的 Promise 类型
interface ExtendedPromise<T> extends Promise<T> {
  abortController?: AbortController;
}

export const useRequest = <TData, TParams extends unknown[]>(
  promiseFn: Service<TData, TParams>,
  options: {
    manual?: boolean;
    params?: TParams;
    transformErrorRes?: (err: CustomError) => Error | CustomError;
  } = {},
) => {
  const {
    manual = true,
    params,
    transformErrorRes = defaultHandleTransformErrorRes,
  } = options;

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const preParams = usePrevious(params);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
    setLoading(false);
  }, []);

  const run = useCallback(
    async (...args: TParams) => {
      setLoading(true);
      setError(null);
      const promise = promiseFn(...args);

      return promise
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setError(
            typeof transformErrorRes === "function"
              ? transformErrorRes(err)
              : err,
          );
          setLoading(false);
        });
    },
    [promiseFn, transformErrorRes],
  );

  useEffect(() => {
    if (isEqual(preParams, params)) return;
    let abort = null;
    if (manual) {
      const promise = run(...(params as TParams)) as ExtendedPromise<unknown>;
      abort = promise?.abortController;
    }
    return () => {
      abort?.abort();
    };
  }, [manual, params, preParams, run]);

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
};
