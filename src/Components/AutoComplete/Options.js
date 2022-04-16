import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const StyledUL = styled.ul`
  position: absolute;
  background: ${({ theme: mode }) => mode.background};
  width: 250px;
  list-style: none;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: ${theme.shadows.button};
`;

const StyledLI = styled.option`
  height: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s all;
  :hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const Options = ({ list, searchKey, onSelectItem }) => {
  const onOptionSelect = (e) => onSelectItem(JSON.parse(e.target.value));
  return (
    <StyledUL>
      {list.map((opt) => (
        <StyledLI
          key={opt[searchKey]}
          value={JSON.stringify(opt)}
          onClick={onOptionSelect}
        >
          {opt[searchKey]}
        </StyledLI>
      ))}
    </StyledUL>
  );
};

export default Options;
