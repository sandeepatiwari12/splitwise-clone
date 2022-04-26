import React from "react";
import styled from "styled-components";
import AutoComplete from "../../Components/AutoComplete";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { BoldText, Label, Text } from "../../Components/Typography";
import useForm from "../../utils/Hooks/useForm";
import Options from "../../Components/AutoComplete/Options";

import _ from "lodash";

import { connect } from "react-redux";
import { getFriendsList } from "../../redux/actions/friend";
import { addExpences } from "../../redux/actions/expence";
import Modal from "../../Components/Modal";

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
  const [formObj, setFormObj] = React.useState({
    paidBy: currentUser.id,
  });
  const [friends, setFriends] = React.useState([]);
  const [paidBy, setPaidBy] = React.useState("You");
  const [paidByOpened, openPaidBy] = React.useState(false);
  const [splitByOpened, openSplitBy] = React.useState(false);
  const [costPerPerson, setCostPerPerson] = React.useState(0);
  const searchKey = "name";

  React.useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  const onValueSelect = (e) => {
    let alreadyAdded = friends.find(({ name }) => name === e.name);
    if (!alreadyAdded) {
      setFriends([...friends, e]);
    } else alert("Friend already added");
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

  const splitTheBill = async (splits) => {
    for (let i = 0; i < splits.length; i++) {
      splits[i].balance = splits[i].exclude ? 0 : costPerPerson;
    }
    return splits;
  };

  const excludeFriend = (e) => {
    e.stopPropagation();
    let splits = [...formObj.splits];
    const id = e.target.value;
    const checked = e.target.checked;
    for (let i = 0; i < splits.length; i++) {
      if (splits[i].id === id) {
        splits[i].exclude = checked;
      }
    }
    const filteredSplits = splits.filter((e) => !e.exclude);
    setCostPerPerson(_.round(values.cost / filteredSplits.length, 2));
    setFormObj({ ...formObj, splits: splits });
  };

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
      formPayload.splits = await splitTheBill(formPayload.splits);
      await addExpences(formPayload);
      onClose();
    }
  };
  const onUpdateSplitby = () => {
    const filteredSplits = formObj.splits.filter((e) => !e.exclude);
    setFormObj({ ...formObj, splits: filteredSplits });
    openSplitBy(false);
  }

  return (
    <>
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
                and Split{" "}
                <Chips
                  onClick={() => {
                    setFormObj({
                      ...formObj,
                      splits: [currentUser, ...friends],
                    });
                    openSplitBy(!splitByOpened);
                  }}
                >
                  Equally
                </Chips>
              </Label>
              {paidByOpened && (
                <Options
                  list={[{ ...currentUser, name: "You" }, ...friends]}
                  searchKey={searchKey}
                  onSelectItem={onSelectPaidBy}
                />
              )}
              <Text style={{ marginTop: ".5rem" }}>
                <Label>{`(${costPerPerson}/person)`}</Label>
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
      {splitByOpened && (
        <Modal
          onClose={() => openSplitBy(false)}
          title={"Exclude friends"}
          small
        >
          {formObj.splits &&
            formObj.splits.length > 0 &&
            formObj.splits.map((friend) => (
              <BoldText
                key={friend.id}
                style={{ marginBottom: "1rem", cursor: "pointer" }}
              >
                <input
                  type={"checkbox"}
                  value={friend.id}
                  id={friend.id}
                  onChange={excludeFriend}
                />
                <Label
                  style={{ marginLeft: "1rem", cursor: "pointer" }}
                  htmlFor={friend.id}
                >
                  {friend.name}: {!friend.exclude && costPerPerson}
                </Label>
              </BoldText>
            ))}

          <Button type="button" onClick={onUpdateSplitby}>Done</Button>
        </Modal>
      )}
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
