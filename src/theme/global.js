import { createGlobalStyle, withTheme } from "styled-components";

const globalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body  {
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  h1, h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.text};
  }

`;

export default withTheme(globalStyle);
