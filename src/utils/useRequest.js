import { useState } from "react";
import { memo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const useRequest = memo(
  (promiseFn, options = {}) => {
    const { manual = true, params = [] } = options;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const run = useCallback(
      (...reset) => {
        return promiseFn(...reset);
      },
      [promiseFn]
    );

    useEffect(() => {
      if (manual) {
        setLoading(true);
        try {
          run(...params).then((res) => setData(res));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }, [run, manual, params]);

    return {
      data,
      error,
      loading,
    };
  },
  () => {
    return false;
  }
);
