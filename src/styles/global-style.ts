import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { darkTheme } from "./theme";
import './font.css';
import './skeleton.css';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    overflow: hidden;
    font-family: ${darkTheme.fonts.family.base};
    color: ${darkTheme.colors.white};
    background-color: ${darkTheme.colors.background};
    padding: 0 ${darkTheme.paddings.base};
    height: 100vh;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
