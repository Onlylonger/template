import { useRef } from "react";

// version3
export function usePrevious(state: unknown) {
  const previousRef = useRef<null | unknown>(null);
  const currentRef = useRef<null | unknown>(null);

  if (!Object.is(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}
