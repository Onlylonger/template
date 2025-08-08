import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/index.css";
import { calc } from "@vanilla-extract/css-utils";

const colorMix = (name: string, percent: number) => {
  return `color-mix(in oklab,${name}${percent}%, transparent)`;
};

const px = (n: number) => ({
  paddingLeft: calc.multiply(vars.spacing, n),
  paddingRight: calc.multiply(vars.spacing, n),
});

const py = (n: number) => ({
  paddingTop: calc.multiply(vars.spacing, n),
  paddingBottom: calc.multiply(vars.spacing, n),
});

const buttonResetStyle = style({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  border: "0 solid",

  lineHeight: 1.5,
  // fontFamily:
  //   'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  font: "inherit",
  fontFeatureSettings: "inherit",
  fontVariationSettings: "inherit",
  letterSpacing: "inherit",
  color: "inherit",
  borderRadius: 0,
  backgroundColor: "transparent",
  opacity: 1,
  appearance: "button",
  borderColor: vars.border,
});

// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
export const baseStyle = style([
  buttonResetStyle,
  {
    fontSize: calc.multiply(vars.spacing, 3.5),
    boxSizing: "border-box",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: calc.multiply(vars.spacing, 2),
    borderRadius: calc(vars.spacing).multiply(2).subtract("2px").toString(),
    border: 1,
    flexShrink: 0,
    cursor: "pointer",
    fontWeight: 500,
    whiteSpace: "nowrap",
    transition: "all",
    outline: "none",
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
]);

export const typeVariants = styleVariants({
  // bg-primary text-primary-foreground shadow-xs hover:bg-primary/90
  default: {
    color: vars.mainFront,
    backgroundColor: vars.mainBg,

    // boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    ":hover": {
      background: colorMix(vars.mainBg, 90),
    },
  },
  // bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80
  secondary: {
    backgroundColor: vars.secondaryBg,
    color: vars.secondaryFront,
    // boxShadow:
    ":hover": {
      backgroundColor: colorMix(vars.secondaryBg, 80),
    },
  },
  // bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60

  destructive: {
    backgroundColor: vars.destructive,
    color: "white",
    ":hover": {
      backgroundColor: colorMix(vars.destructive, 90),
    },
    "&:is(.dark *)": {
      backgroundColor: colorMix(vars.destructive, 60),
    },
  },
  // hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50
  ghost: {
    ":hover": {
      backgroundColor: vars.accenntBg,
      color: vars.accentFront,
    },
    "&:is(.dark *)": {
      color: vars.front,
      ":hover": {
        backgroundColor: colorMix(vars.accenntBg, 50),
      },
    },
  },
  // text-primary underline-offset-4 hover:underline
  link: {
    color: vars.mainBg,
    textUnderlineOffset: 4,
    ":hover": {
      textDecoration: "underline",
    },
  },
  // border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50
  outline: {
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: vars.bg,
    borderColor: vars.input,

    ":hover": {
      backgroundColor: vars.accenntBg,
      color: vars.accentFront,
    },
    "&:is(.dark *)": {
      borderColor: vars.input,
      color: vars.front,
      backgroundColor: colorMix(vars.input, 30),
      ":hover": {
        backgroundColor: colorMix(vars.input, 50),
      },
    },
  },
});

export const sizeVariants = styleVariants({
  // h-9 px-4 py-2 has-[>svg]:px-3
  default: {
    height: calc.multiply(vars.spacing, 9),
    ...px(4),
    ...py(2),
  },
  // h-10 rounded-md px-6 has-[>svg]:px-4
  lg: {
    height: calc.multiply(vars.spacing, 10),
    ...px(6),
  },
  // h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5
  sm: {
    height: calc.multiply(vars.spacing, 8),
    ...px(3),
    gap: calc.multiply(vars.spacing, 1.5),
  },
});
