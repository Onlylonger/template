import {
  useFloating,
  useClick,
  useHover,
  safePolygon,
  useInteractions,
  useDismiss,
  arrow as arrowMiddleware,
  FloatingArrow,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
} from "@floating-ui/react";
import { Children } from "react";
import { createElement, cloneElement, useState, useRef } from "react";

const ARROW_HEIGHT = 7;

export const Popper = ({
  children,
  trigger,
  open,
  onOpenChange,
  placement = "bottom",
  dismiss = true,
  hover = false,
  click = true,
  arrow = false,
  offsetHeight = 0,
  floatingArrowProps = {},
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
      offsetMiddleware(
        (arrow ? floatingArrowProps?.height || ARROW_HEIGHT : 0) + offsetHeight
      ),
      flipMiddleware(),
      shiftMiddleware(),
      arrow
        ? arrowMiddleware({
            element: arrowRef,
          })
        : undefined,
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
      {finalOpen && children && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {cloneElement(
            children,
            {
              //
            },
            ...Children.map(children.props?.children, (child) => child),
            arrow
              ? createElement(FloatingArrow, {
                  ...floatingArrowProps,
                  ref: arrowRef,
                  context,
                })
              : null
          )}
        </div>
      )}
    </>
  );
};
