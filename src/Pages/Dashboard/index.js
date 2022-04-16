import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import { Box, Container, Flex } from "../../Components/Layouts";
import Modal from "../../Components/Modal";
import {
  BoldText,
  Heading,
  Label,
  Spacer,
  Text,
} from "../../Components/Typography";
import AddExpence from "../../Containers/AddExpence";
import AddFriendForm from "../../Containers/AddFriendForm";
import BalanceSummary from "../../Containers/BalanceSummary";
import theme from "../../theme";
import { connect } from "react-redux";
import { getFriendsList } from "../../redux/actions/friend";

const StyledContainer = styled(Container)`
  background: ${theme.colors.gray};
  border-radius: 0 0 4px 4px;
`;

const PageHeader = styled.div`
  padding: 1rem 2rem;
  border-bottom: 2px solid ${theme.colors.primary};
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  column-gap: 20px;
`;

const Dashboard = ({ getFriendsList, loading, friendList }) => {
  const [openAddFriendBox, setOpenAddFriendBox] = React.useState(false);
  const [openAddExpenceBox, setOpenAddExpenceBox] = React.useState(false);
  const [youOwes, setYouOwe] = React.useState([]);
  const [youOweds, setYouOwed] = React.useState([]);

  const createSummary = () => {
    console.log("friends", friendList);
    let expenceData = JSON.parse(localStorage.getItem("expenseData"));
    if (expenceData) {
      let { youOwe, youOwed } = expenceData;
      let youOwedArr = [];
      let youOweArr = [];
      Object.keys(youOwed).forEach((e) => {
        let findFriend = friendList.find(({ id }) => id === e);
        if (findFriend) youOwedArr.push({ ...findFriend, amount: youOwed[e] });
      });

      Object.keys(youOwe).forEach((e) => {
        let findFriend = friendList.find(({ id }) => id === e);
        if (findFriend) youOweArr.push({ ...findFriend, amount: youOwe[e] });
      });
      setYouOwed(youOwedArr);
      setYouOwe(youOweArr);
    }
  };

  React.useEffect(() => {
    getFriendsList();
    createSummary();
    // eslint-disable-next-line
  }, []);

  return (
    <StyledContainer>
      {/* Page Header */}
      <PageHeader>
        <Flex>
          <Heading style={{ margin: 0 }}>Dashboard</Heading>
          <Spacer />
          <ButtonContainer>
            <Button
              variant={"warning"}
              onClick={() => setOpenAddFriendBox(true)}
            >
              {"Add Friends"}
            </Button>
            <Button onClick={() => setOpenAddExpenceBox(true)}>
              {"Add Expences"}
            </Button>
          </ButtonContainer>
        </Flex>
      </PageHeader>
      {/* Balance Summary */}
      <BalanceSummary />

      <Box style={{ marginTop: "1rem" }}>
        <Flex>
          <Box style={{ flex: "1" }}>
            <BoldText style={{ marginBottom: "2rem" }}>YOU OWE</BoldText>
            {youOwes &&
              youOwes.length > 0 &&
              youOwes.map((val) => (
                <Box key={val.id} style={{ marginBottom: "1rem" }}>
                  <Label>{val.name}</Label>
                  <Text>
                    you owe: <strong>{val.amount}</strong>
                  </Text>
                </Box>
              ))}
          </Box>

          <Box style={{ flex: "1" }}>
            <BoldText style={{ marginBottom: "2rem" }}>YOU ARE OWED</BoldText>
            {youOweds &&
              youOweds.length > 0 &&
              youOweds.map((val) => (
                <Box key={val.id} style={{ marginBottom: "1rem" }}>
                  <Label>{val.name}</Label>
                  <Text>
                    owes you: <strong>{val.amount}</strong>
                  </Text>
                </Box>
              ))}
          </Box>
        </Flex>
      </Box>

      {/* Modal */}
      {openAddFriendBox && (
        <Modal title="Add Friend" onClose={() => setOpenAddFriendBox(false)}>
          <AddFriendForm onClose={() => setOpenAddFriendBox(false)} />
        </Modal>
      )}

      {openAddExpenceBox && (
        <Modal title="Add Expence" onClose={() => setOpenAddExpenceBox(false)}>
          <AddExpence onClose={() => {
            setOpenAddExpenceBox(false);
            createSummary()
            }} />
        </Modal>
      )}
    </StyledContainer>
  );
};

const mapStateToProps = (state) => ({
  loading: state.friends.loading,
  friendList: state.friends.list,
});

export default connect(mapStateToProps, { getFriendsList })(Dashboard);
