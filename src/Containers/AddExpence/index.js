import React from "react";
import styled from "styled-components";
import AutoComplete from "../../Components/AutoComplete";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Label, Text } from "../../Components/Typography";
import useForm from "../../utils/Hooks/useForm";
import Options from "../../Components/AutoComplete/Options";
import _ from "lodash";

import { connect } from "react-redux";
import { getFriendsList } from "../../redux/actions/friend";
import { addExpences } from "../../redux/actions/expence";
// import AddFriendForm from "../AddFriendForm";
// import Modal from "../../Components/Modal";

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Chips = styled(Button)`
  height: 2.5rem;
  border-radius: 20px;
  margin: 0 0.5rem;
`;

const AddExpence = ({
  getFriendsList,
  addExpences,
  friendsList,
  currentUser,
  onClose,
}) => {
  const { values, errors, onInputChange } = useForm();
  const [splitMethod, setSplitMethod] = React.useState("EQUAL");
  const [formObj, setFormObj] = React.useState({
    paidBy: currentUser.id,
    splitBy: splitMethod,
  });
  const [friends, setFriends] = React.useState([]);
  const [paidBy, setPaidBy] = React.useState("You");
  const [paidByOpened, openPaidBy] = React.useState(false);
  const [constPerPerson, setCostPerPerson] = React.useState(0);
  // const [addFriendsBoxOpened, openAddnewFriendBox] = React.useState(false);
  const searchKey = "name";

  React.useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  const onValueSelect = (e) => {
    let alreadyAdded = friends.find(({ name }) => name === e.name);
    if (!alreadyAdded) setFriends([...friends, e]);
    // TODO: Add show error message
    else alert("Friend already added");
  };

  const onSelectPaidBy = (value) => {
    setFormObj({ ...formObj, paidBy: value.id });
    setPaidBy(value.name);
    openPaidBy(false);
  };

  const onCostUpdate = (e) => {
    const cost = e.target.value;
    setCostPerPerson(_.round(cost / (friends.length + 1), 2));
  };
  // const onSelectSplitBy = (value) => {};

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length < 1 && Object.keys(values).length > 0) {
      const formPayload = {
        ...values,
        ...formObj,
        splits: [...friends, currentUser],
        date: new Date(),
        createdBy: currentUser,
      };
      await splitTheBill(formPayload);
    }
  };

  const splitTheBill = async (obj) => {
    for (let i = 0; i < obj.splits.length; i++) {
      obj.splits[i].balance = constPerPerson;
    }
    await addExpences(obj);
    // onClose();
  };

  return (
    <>
      {/* <Button onClick={() => openAddnewFriendBox(true)}>Add new</Button>
      {addFriendsBoxOpened && (
        <Modal onClose={() => openAddnewFriendBox(false)}>
          <AddFriendForm onClose={() => openAddnewFriendBox(false)} />
        </Modal>
      )} */}
      <form onSubmit={onSubmitForm} id={"addExpenceForm"}>
        {friends && friends.length > 0 && (
          <FormField>
            {friends.map((friend) => (
              <Chips key={`${friend.name}__${friend.phone}`} outlined={true}>
                {friend.name}
              </Chips>
            ))}
          </FormField>
        )}
        <FormField>
          <Label htmlFor="name">With you and</Label>
          <AutoComplete
            list={friendsList}
            searchKey={searchKey}
            onValueSelect={onValueSelect}
            placeholder={
              friends.length ? "Add more Friends" : "Type Friends Name"
            }
          />
        </FormField>
        {friends && friends.length > 0 && (
          <>
            <FormField>
              <Label htmlFor="discription">Description</Label>
              <Input
                id="discription"
                type={"text"}
                placeholder={"Enter Description"}
                name="discription"
                required
                onChange={onInputChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="cost">Amount</Label>
              <Input
                id="cost"
                type={"number"}
                placeholder={"Enter Amount"}
                name="cost"
                required
                onChange={(e) => {
                  onCostUpdate(e);
                  onInputChange(e);
                }}
              />
            </FormField>
            <FormField>
              <Label>
                Paid by
                <Chips onClick={() => openPaidBy(!paidByOpened)} outlined>
                  {paidBy}
                </Chips>
                and Split Equally
              </Label>
              {paidByOpened && (
                <Options
                  list={friends}
                  searchKey={searchKey}
                  onSelectItem={onSelectPaidBy}
                />
              )}
              <Text style={{ marginTop: ".5rem" }}>
                <Label>{`(${constPerPerson}/person)`}</Label>
              </Text>
            </FormField>
            <Button
              type="submit"
              disabled={Boolean(Object.keys(errors).length)}
            >
              Submit
            </Button>
          </>
        )}
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  friendsList: state.friends.list,
  currentUser: state.user.userData,
});

export default connect(mapStateToProps, { getFriendsList, addExpences })(
  AddExpence
);
