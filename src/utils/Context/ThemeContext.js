import React from "react";
import { ThemeProvider } from "styled-components";
import useThemeMode from "../Hooks/useThemeMode";
import { lightTheme, darkTheme } from "../../theme";

const ThemeContext = ({ children }) => {
  const { theme } = useThemeMode();

  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default ThemeContext;
