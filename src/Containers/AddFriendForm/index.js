import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Label } from "../../Components/Typography";
import useForm from "../../utils/Hooks/useForm";

import { connect } from "react-redux";
import { addFriend } from "../../redux/actions/friend";

const FromField = styled.div`
  margin-bottom: 1.5rem;
`;

const AddFriendForm = ({ loading, addFriend, onClose }) => {
  const { values, errors, onInputChange } = useForm();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length < 1 && Object.keys(values).length > 0) {
      values.balance = 0;
      await addFriend(values);
      onClose();
    }
  };

  return (
    <form onSubmit={onSubmitForm} id={"addContactForm"}>
      <FromField>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type={"text"}
          placeholder={"Enter Name"}
          name="name"
          required
          onChange={onInputChange}
        />
        {errors.name && <Label error={true}>{errors.name}</Label>}
      </FromField>
      <FromField>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type={"text"}
          placeholder={"Enter Phone"}
          name="phone"
          required
          onChange={onInputChange}
        />
        {errors.phone && <Label error={true}>{errors.phone}</Label>}
      </FromField>
      <Button
        type="submit"
        disabled={Boolean(Object.keys(errors).length) || loading}
      >
        {loading ? "Loading, Please wait" : "Submit"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.friends.loading,
});

export default connect(mapStateToProps, { addFriend })(
  AddFriendForm
);
