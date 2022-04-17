import React from "react";
import styled from "styled-components";
import theme from "../../theme";

export const List = styled.ul`
  position: absolute;
  background: ${({ theme: mode }) => mode.background};
  width: 250px;
  list-style: none;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: ${theme.shadows.button};
`;

export const ListItem = styled.option`
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
    <List>
      {list.map((opt) => (
        <ListItem
          key={opt[searchKey]}
          value={JSON.stringify(opt)}
          onClick={onOptionSelect}
        >
          {opt[searchKey]}
        </ListItem>
      ))}
    </List>
  );
};

export default Options;
