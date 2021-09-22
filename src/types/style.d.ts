import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    margins: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };

    paddings: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };

    height: {
      modalHeader: string;
    }

    fonts: {
      family: {
        base: string;
        title: string;
        youAndI: string;
      };
      size: {
        sm: string;
        base: string;
        lg: string;
        xl: string;
        title: string;
      };
      weight: {
        light: number;
        normal: number;
        semiBold: number;
        bold: number;
      };
    };
    colors: {
      red: string;
      white: string;
      grey: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      };
      blue: string;
      primary: string,
      secondary: string,
      background: string,
      tertiary: string,
      divider: string,
    };
    device: {
      mobile: string,
      tablet: string,
      desktopL: string,
    },
  }
}
