import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const getBtnClx = cva(
  "cursor-pointer rounded-md px-2 py-1 hover:bg-gray-200 border border-black disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        outline: "",
        ghost: "",
        link: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    // defaultVariants?: ConfigVariants<T>;
  },
);

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
