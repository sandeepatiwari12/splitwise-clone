import React from "react";
import Button from "../../Components/Button";
import { Container } from "../../Components/Layouts";
import { Heading2 } from "../../Components/Typography";
import styled from "styled-components";

// redux store dependencies
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/theme";

const StyledContainer = styled(Container)`
  background: ${({ theme: mode }) => mode.sectionBg};
  border-radius: 0 0 4px 4px;
  min-height: calc(100vh - 150px)
`;

const Settings = ({ theme, setTheme }) => {
  const updateTheme = async () => {
    const mode = theme === "light" ? "dark" : "light";
    await setTheme(mode);
  };
  return (
    <StyledContainer>
      <Heading2>Update the theme</Heading2>
      <Button onClick={updateTheme} outlined variant={"success"}>
        {theme === "light" ? "Dark Theme" : "Light Theme"}
      </Button>
    </StyledContainer>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.mode,
});

export default connect(mapStateToProps, { setTheme })(Settings);
