import { useEffect } from "react";
import { connect } from "react-redux";
import { setTheme, getTheme } from "../../redux/actions/theme";

const useThemeMode = ({ setTheme, getTheme, appliedTheme }) => {
  // const setMode = (mode) => {
  //   // Store Theme mode to the local storage
  //   window.localStorage.setItem("theme", mode);
  //   setThemeMode(mode);
  // };

  const themeToggler = () =>
    appliedTheme === "dark" ? setTheme("light") : setTheme("dark");

  useEffect(() => {
    // const localTheme = window.localStorage.getItem("theme");
    // localTheme && setThemeMode(localTheme);
    getTheme();
  }, [getTheme]);

  return [appliedTheme, themeToggler];
};

const mapStateToProps = (state) => ({
  loading: state.theme.loading,
  appliedTheme: state.theme.mode,
});
export default connect(mapStateToProps, { setTheme, getTheme })(useThemeMode);
