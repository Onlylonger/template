import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import type { CustomError } from "./fetcher";

const defaultHandleTransformErrorRes = (
  err: CustomError<{
    msg?: string;
  }>,
) => {
  try {
    return err?.body?.msg;
  } catch (_) {
    return err;
  }
};

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;

// 定义扩展的 Promise 类型
interface ExtendedPromise<T> extends Promise<T> {
  abortController?: AbortController;
}

export const useRequest = <TData, TParams, Error = unknown>(
  promiseFn: Service<TData, TParams>,
  options: {
    manual?: boolean;
    params?: TParams;
    transformErrorRes?: (err: CustomError) => Error;
  } = {},
) => {
  const {
    manual = true,
    params = [],
    transformErrorRes = defaultHandleTransformErrorRes,
  } = options;

  const [data, setData] = useState<Awaited<ReturnType<F>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        }) as ReturnType<F>;
    },
    [promiseFn],
  );

  useEffect(() => {
    let abort = null;
    if (manual) {
      const promise = run(...params) as ExtendedPromise<unknown>;
      abort = promise?.abortController;
    }
    return () => {
      abort?.abort();
    };
  }, [run]);

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
};
