import React from "react";

// redux store dependencies
import store from "./store";
import { Provider } from "react-redux";

import { Routes, Route, Navigate } from "react-router-dom";
// theme imports
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/global";
import ThemeContext from "./utils/Context/ThemeContext";
import { lightTheme, darkTheme } from "./theme";
import useThemeMode from "./utils/Hooks/useThemeMode";
// end theme imports
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Settings from "./Pages/Settings";

const PageWraper = styled.div`
  box-sizing: border-box;
`;
const Main = styled.div`
  padding: 0 2rem 2rem;
`;

const App = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <Provider store={store}>
      <ThemeContext>
        <ThemeProvider theme={themeMode}>
          <GlobalStyle />
          <PageWraper>
            <Header themeColor={theme} themeToggler={themeToggler} />
            <Main>
              <Routes>
                <Route path="/" element={<Navigate to={"/dashboard"} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Main>
          </PageWraper>
        </ThemeProvider>
      </ThemeContext>
    </Provider>
  );
};

export default App;
