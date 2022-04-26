import React from "react";

// redux store dependencies
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/user";
import { getTheme } from "./redux/actions/theme";

import { Routes, Route, Navigate } from "react-router-dom";

// theme imports
import styled from "styled-components";
import GlobalStyle from "./theme/global";
import ThemeContext from "./utils/Context/ThemeContext";
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
  padding: 2rem;
`;

const App = ({ loadUser, loading }) => {
  React.useEffect(() => {
    loadUser();
  }, [loadUser]);
  console.log("loading", loading);

  return (
    <ThemeContext>
      <GlobalStyle />
      <PageWraper>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Main>
      </PageWraper>
    </ThemeContext>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});
export default connect(mapStateToProps, { loadUser, getTheme })(App);
