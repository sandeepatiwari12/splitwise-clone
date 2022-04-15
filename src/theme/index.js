import colors from "./colors";

export const darkTheme = {
  background: colors.black,
  text: colors.white,
};

export const lightTheme = {
  background: colors.white,
  text: colors.black,
};

const shadows = {
  button: 'rgb(0 0 0 / 12%) 0px 1px 6px, rgb(0 0 0 / 12%) 0px 1px 4px'
}

const theme = {
  colors,
  shadows
};

export default theme;
