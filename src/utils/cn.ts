import { twMerge } from "tailwind-merge";

export const cn = (clx: string) => {
  return twMerge(clx);
};
