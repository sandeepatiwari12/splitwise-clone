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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  h1, h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.text};
  }

`;

export default withTheme(globalStyle);
