import { useEffect, useRef } from "react";
import isEqual from "react-fast-compare";
import { usePrevious } from "./usePrevious";

// // 方式一
// export function useCompareEffect1(fn, deps) {
//   const preValue = usePrevious(deps);

//   useEffect(() => {
//     if (isEqual(preValue, deps)) return;

//     return fn();
//   }, deps);
// }

// 方式二
export function useCompareEffect2(fn, deps) {
  const preValue = usePrevious(deps);
  const signalRef = useRef(0);

  if (!isEqual(preValue, deps)) {
    signalRef.current += 1;
  }

  useEffect(fn, [signalRef.current]);
}
