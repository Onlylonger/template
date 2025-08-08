const camelToKebab = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const getGlobalTheme = () => {
  const defaultValue = {
    front: "oklch(0.145 0 0)",
    bg: "oklch(1 0 0)",

    mainBg: "oklch(0.205 0 0)",
    mainFront: "oklch(0.985 0 0)",

    secondaryBg: "oklch(0.97 0 0)",
    secondaryFront: "oklch(0.205 0 0)",

    accentFront: "oklch(0.205 0 0)",
    accenntBg: "oklch(0.97 0 0)",

    border: "oklch(0.922 0 0)",

    input: "oklch(0.922 0 0)",

    destructive: "oklch(0.577 0.245 27.325)",

    /**
     * 0.25rem = 4px
     * */
    spacing: "0.25rem",
    // radius: "0.25rem",
  };

  type DefaultValue = typeof defaultValue;
  type Keys = keyof DefaultValue;

  const tmp = {} as DefaultValue;

  for (const key in defaultValue) {
    if (Object.prototype.hasOwnProperty.call(defaultValue, key)) {
      const finalKey = key as Keys;
      const kebabKey = camelToKebab(key);
      tmp[finalKey] = `var(--sl-${kebabKey}, ${defaultValue[finalKey]})`;
    }
  }

  return tmp;
};

export const vars = getGlobalTheme();
