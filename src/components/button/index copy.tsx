import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "@shilong/utils";

const getBtnClx = cva({
  base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 py-1 font-medium whitespace-nowrap transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary-bg text-primary-fg hover:bg-primary-bg/90 shadow-xs",
      secondary:
        "bg-secondary-bg text-secondary-fg hover:bg-secondary-bg/80 shadow-xs",
      outline:
        "bg-bg text-fg hover:bg-accent-bg hover:text-accent-fg dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
      ghost:
        "hover:bg-accent-bg hover:text-accent-fg dark:hover:bg-accent-bg/50",
      link: "text-primary-bg underline-offset-4 hover:underline",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  // defaultVariants?: ConfigVariants<T>;
});

export type ButtonVariants = VariantProps<typeof getBtnClx>;
export type ButtonProps = ButtonVariants & React.ComponentProps<"button">;

export const Button = (props: ButtonProps) => {
  const { className, variant, size, ...reset } = props;

  return (
    <button
      {...reset}
      className={cn(getBtnClx({ variant, size, className }))}
    />
  );
};
