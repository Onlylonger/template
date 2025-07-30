import { useState, useCallback } from "react";
import type { CustomError } from "./fetcher";
import { useStableFn } from "./useStableFn";
import { useCompareEffect2 } from "./useCompareEffect";

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

export type Service<TData, TParams extends unknown[]> = (...args: TParams) => {
  promise: Promise<TData>;
  controller: AbortController;
};

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
  const staPromiseFn = useStableFn(promiseFn);
  const staTransformErrorResFn = useStableFn(transformErrorRes);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
    setLoading(false);
  }, []);

  const run = useCallback(
    (...args: TParams) => {
      setLoading(true);
      setError(null);

      const tmp = staPromiseFn(...args);

      const finalPromise = tmp.promise
        .then((res) => {
          setData(res);
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);

          if (err.name === "AbortError") return;

          const tmpErr =
            typeof staTransformErrorResFn === "function"
              ? staTransformErrorResFn(err)
              : err;

          setError(tmpErr);
          throw tmpErr;
        });

      return {
        promise: finalPromise,
        controller: tmp.controller,
      };
    },
    [staPromiseFn, staTransformErrorResFn],
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
