import React from "react";
import styled from "styled-components";
import Button from "../Button";
import NavLinks from "../NavLinks";
import theme from "../../theme";
import { Link } from "react-router-dom";
import { Spacer } from "../Typography";
const logo = require("../../Images/logo.png");

const HeaderContainer = styled.div`
  height: 80px;
  background: ${theme.colors.primary};
  color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
`;

const BrandName = styled.h1`
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 2em;
  line-height: 2em;
  color: ${theme.colors.white};
`;

const BrandIcon = styled.img`
  width: 54px;
  height: 55px;
  margin-right: 20px;
`;


const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const Header = ({ themeColor, themeToggler }) => {
  return (
    <HeaderContainer>
      <StyledLink to={"/dashboard"}>
        <BrandIcon alt="splitwise" src={logo} />
        <BrandName>Splitwise</BrandName>
      </StyledLink>
      <Spacer />
      <NavLinks />
      <Button onClick={themeToggler} outlined variant={"success"}>
        {themeColor === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </HeaderContainer>
  );
};

export default Header;
