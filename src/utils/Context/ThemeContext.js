import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../theme";

// redux store dependencies
import { connect } from "react-redux";
import { getTheme } from "../../redux/actions/theme";

const ThemeContext = ({ children, theme, getTheme }) => {
  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  React.useEffect(() => {
    getTheme();
  }, [getTheme]);

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

const mapStateToProps = (state) => ({
  theme: state.theme.mode,
});

export default connect(mapStateToProps, { getTheme })(ThemeContext);
