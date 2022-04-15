import { ReactNode } from "react";
import { createContext, FC, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "./local-storage";

export enum ColorScheme {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}

export type ColorSchemeContextType = {
  colorScheme: ColorScheme;
  toggleTheme: (scheme?: ColorScheme) => void;
};
export const ColorSchemeContext = createContext<ColorSchemeContextType | null>(
  null
);

export type ColorSchemeProps = {
  children: ReactNode;
  initialColorScheme?: ColorScheme;
};

export const ColorSchemeProvider: FC<ColorSchemeProps> = ({
  children,
  initialColorScheme = ColorScheme.SYSTEM,
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    value: initialColorScheme,
  });

  const updateDom = useCallback((scheme: "dark" | "light") => {
    document.documentElement.classList.toggle("dark", scheme === "dark");
  }, []);

  const getSystemColorScheme = useCallback(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ColorScheme.DARK
      : ColorScheme.LIGHT;
  }, []);

  const onSystemColorSchemeChange = useCallback(() => {
    const scheme = getSystemColorScheme();
    updateDom(scheme);
  }, [getSystemColorScheme, updateDom]);

  const toggleTheme: ColorSchemeContextType["toggleTheme"] = useCallback(
    (scheme) => {
      if (scheme) {
        setColorScheme(scheme);
      } else {
        switch (scheme || colorScheme) {
          case ColorScheme.SYSTEM:
            setColorScheme(ColorScheme.LIGHT);
            break;
          case ColorScheme.LIGHT:
            setColorScheme(ColorScheme.DARK);
            break;
          case ColorScheme.DARK:
            setColorScheme(ColorScheme.SYSTEM);
            break;
          default:
            setColorScheme(ColorScheme.SYSTEM);
            break;
        }
      }
    },
    [colorScheme, setColorScheme]
  );

  useEffect(() => {
    updateDom(
      !!colorScheme && colorScheme !== ColorScheme.SYSTEM
        ? colorScheme
        : getSystemColorScheme()
    );
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (colorScheme === ColorScheme.SYSTEM) {
      matchMedia.addEventListener("change", onSystemColorSchemeChange);
    }
    return () => {
      matchMedia.removeEventListener("change", onSystemColorSchemeChange);
    };
  }, [updateDom, colorScheme, onSystemColorSchemeChange, getSystemColorScheme]);

  const value: ColorSchemeContextType = {
    colorScheme: colorScheme || ColorScheme.SYSTEM,
    toggleTheme,
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context)
    throw new Error("useColorScheme must be used inside a ColorSchemeProvider");
  return context;
};
