import React from "react";
import Input from "../Input";
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

const AutoComplete = ({ placeholder, list, searchKey, onValueSelect }) => {
  const [filteredList, setFilteredList] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const onInputChange = (e) => {
    const val = e.target.value;
    const filteredOptions = list.filter((item) =>
      item[searchKey].toLowerCase().startsWith(val.toLowerCase())
    );

    setInputValue(val);
    setFilteredList(filteredOptions);
    setShowOptions(true);
  };
  const onSelectItem = (e) => {
    onValueSelect(JSON.parse(e.target.value));
    setFilteredList([]);
    setInputValue("");
    setShowOptions(false);
  };

  return (
    <>
      <Input
        onChange={onInputChange}
        value={inputValue}
        placeholder={placeholder}
      />
      {showOptions && inputValue && (
        <StyledUL>
          {filteredList.map((opt) => (
            <StyledLI
              key={opt[searchKey]}
              value={JSON.stringify(opt)}
              onClick={onSelectItem}
            >
              {opt[searchKey]}
            </StyledLI>
          ))}
        </StyledUL>
      )}
    </>
  );
};

export default AutoComplete;
