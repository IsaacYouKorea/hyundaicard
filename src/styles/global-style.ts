import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { darkTheme } from "./theme";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    font-family: ${darkTheme.fonts.family.base};
    color: ${darkTheme.colors.white};
    background-color: ${darkTheme.colors.background};
    padding: 0 0.5rem;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;