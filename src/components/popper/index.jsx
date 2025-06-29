import {
  useFloating,
  useClick,
  useHover,
  safePolygon,
  useInteractions,
  useDismiss,
  arrow,
  FloatingArrow,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { Children } from "react";
import { createElement, cloneElement, useState, useRef } from "react";

export const Popper = ({
  children,
  trigger,
  open,
  onOpenChange,
  placement = "left",
  dismiss = true,
  hover = false,
  click = true,
}) => {
  const [ownOpen, setOwnOpen] = useState(false);
  const arrowRef = useRef(null);

  const finalOpen = open ?? ownOpen;
  const finalSetOpen = onOpenChange ?? setOwnOpen;

  const { refs, floatingStyles, context } = useFloating({
    open: finalOpen,
    onOpenChange: finalSetOpen,
    placement,
    middleware: [
      offset(9),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const clickFn = useClick(context, {
    enabled: click,
  });

  const hoverFn = useHover(context, {
    enabled: hover,
    handleClose: safePolygon(),
  });

  const dismissFn = useDismiss(context, {
    enabled: dismiss,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clickFn,
    hoverFn,
    dismissFn,
  ]);

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          ...getReferenceProps({
            ref: refs.setReference,
          }),
        })}
      {finalOpen &&
        children &&
        cloneElement(
          children,
          {
            style: floatingStyles,
            ...getFloatingProps({
              ref: refs.setFloating,
            }),
          },
          ...Children.map(children, (child) => child),
          createElement(FloatingArrow, {
            ref: arrowRef,
            context,
          })
        )}
    </>
  );
};
