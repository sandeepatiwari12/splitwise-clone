import React from "react";
import styled from "styled-components";
import AutoComplete from "../../Components/AutoComplete";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Label } from "../../Components/Typography";
import useForm from "../../utils/Hooks/useForm";

import { connect } from "react-redux";
import { getFriendsList } from "../../redux/actions/friend";

const FromField = styled.div`
  margin-bottom: 1.5rem;
`;

const Chips = styled(Button)`
  height: 2.5rem;
  border-radius: 20px;
  margin-right: 0.5rem;
`;

const AddExpence = ({ onFormSubmit, getFriendsList, friendsList }) => {
  const { values, errors, onInputChange } = useForm();
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  const onValueSelect = (e) => {
    let alreadyAdded = friends.find(({name}) => name === e.name);
    if(!alreadyAdded) setFriends([...friends, e]);
    // TODO: Add show error message
    else alert('Friend already added');
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length < 1 && Object.keys(values).length > 0)
      await onFormSubmit(values);
  };

  return (
    <form onSubmit={onSubmitForm} id={"addExpenceForm"}>
      {friends && friends.length > 0 && (
        <FromField>
          {friends.map((friend) => (
            <Chips key={`${friend.name}__${friend.phone}`} outlined={true}>
              {friend.name}
            </Chips>
          ))}
        </FromField>
      )}
      <FromField>
        <Label htmlFor="name">With you and</Label>
        <AutoComplete
          list={friendsList}
          searchKey={"name"}
          onValueSelect={onValueSelect}
          placeholder={
            friends.length ? "Add more Friends" : "Type Friends Name"
          }
        />
      </FromField>
      <FromField>
        <Label htmlFor="discription">Description</Label>
        <Input
          id="discription"
          type={"text"}
          placeholder={"Enter Description"}
          name="discription"
          required
          onChange={onInputChange}
        />
      </FromField>

      <FromField>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type={"number"}
          placeholder={"Enter Amount"}
          name="amount"
          required
          onChange={onInputChange}
        />
      </FromField>
      <Button type="submit" disabled={Boolean(Object.keys(errors).length)}>
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  friendsList: state.friends.list,
});

export default connect(mapStateToProps, { getFriendsList })(AddExpence);
