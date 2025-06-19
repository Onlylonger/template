const areValidateElements = (...args) =>
  !args.some(
    (ele) => !(ele && typeof ele.getBoundingClientRect === "function")
  );
export const createPopper = (ref, popper, opts = {}) => {
  const { placement = "bottom" } = opts;

  // console.log
  if (!areValidateElements(ref, popper)) {
    throw new Error("not validate dom element");
  }

  const refRects = ref.getBoundingClientRect();
  const popperRects = popper.getBoundingClientRect();
  const state = {
    x: 0,
    y: 0,
  };

  switch (placement) {
    case "bottom": {
      state.x = refRects.left;
      state.y = refRects.bottom;
      break;
    }

    default:
      break;
  }

  return state;
};
