import colors from "./colors";

export const darkTheme = {
  background: colors.darkBG,
  sectionBg: colors.sectionBG,
  text: colors.white,
};

export const lightTheme = {
  background: colors.lightBG,
  sectionBg: colors.gray,
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
