import {
  useFloating,
  useClick,
  useHover,
  safePolygon,
  useInteractions,
  useDismiss,
} from "@floating-ui/react";
import { cloneElement, useState } from "react";

export const Popper = ({
  children,
  trigger,
  open,
  onOpenChange,
  placement = "bottom",
  dismiss = true,
  hover = false,
  click = true,
}) => {
  const [ownOpen, setOwnOpen] = useState(false);

  const finalOpen = open ?? ownOpen;
  const finalSetOpen = onOpenChange ?? setOwnOpen;

  const { refs, floatingStyles, context } = useFloating({
    open: finalOpen,
    onOpenChange: finalSetOpen,
    placement,
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
        cloneElement(children, {
          style: floatingStyles,
          ...getFloatingProps({
            ref: refs.setFloating,
          }),
        })}
    </>
  );
};
