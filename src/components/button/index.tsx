import { clsx } from "@shilong/utils";
import { baseStyle, sizeVariants, typeVariants } from "./styles.css";
import type { PropsWithChildren } from "react";

interface ButtonProps {
  variant?: keyof typeof typeVariants;
  className?: string;
  size?: keyof typeof sizeVariants;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { className, variant = "default", size = "default", ...reset } = props;

  return (
    <button
      {...reset}
      className={clsx(
        baseStyle,
        typeVariants[variant],
        sizeVariants[size],
        className,
      )}
    />
  );
};
