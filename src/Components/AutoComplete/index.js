import React from "react";
import Input from "../Input";
import Options from "./Options";

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
    onValueSelect(e);
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
        <Options
          list={filteredList}
          searchKey={searchKey}
          onSelectItem={onSelectItem}
        />
      )}
    </>
  );
};

export default AutoComplete;
