import { DefaultTheme } from "styled-components";

const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`,
    youAndI: `'Noto Sans KR', sans-serif`,
  },
  size: {
    sm: "1.4rem",
    base: "1.6rem",
    lg: "2rem",
    xl: "2.5rem",
    title: "1rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const colors = {
  red: "#de4954",
  white: "#ffffff",
  grey: {
    100: "#353535",
    200: "#454545",
    300: "#555555",
    400: "#656565",
    500: "#757575",
    600: "#858585",
    700: "#959595",
  },
  blue: "#5da4e5",
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const darkThemeColors = {
  ...colors,
  primary: colors.white,
  secondary: colors.grey[700],
  background: colors.grey[100],
  tertiary: colors.red,
};

// 테마와 관련없이 공통으로 사용되는 변수들입니다
const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
};

// 각 테마는 공통 변수와 함께, 각기 다른 색상 값들을 갖습니다.
export const darkTheme:DefaultTheme = {
  ...defalutTheme,
  colors: darkThemeColors,
};
