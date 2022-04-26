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
import _ from 'lodash';

import { connect } from "react-redux";
import { getFriendsList } from "../../redux/actions/friend";
import { getExpenceSummary } from "../../redux/actions/expence";

const StyledContainer = styled(Container)`
  background: ${({ theme: mode }) => mode.sectionBg};
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

const Dashboard = ({
  getFriendsList,
  loading,
  friendList,
  getExpenceSummary,
  expenceData,
}) => {
  const [openAddFriendBox, setOpenAddFriendBox] = React.useState(false);
  const [openAddExpenceBox, setOpenAddExpenceBox] = React.useState(false);
  const [youOwes, setYouOwe] = React.useState([]);
  const [youOweds, setYouOwed] = React.useState([]);

  const createOweArray = (obj) => {
    let arr = [];
    Object.keys(obj).forEach((e) => {
      let findFriend = friendList.find(({ id }) => id === e);
      if (findFriend) arr.push({ ...findFriend, amount: obj[e] });
    });
    return arr;
  };

  const createSummary = async () => {
    getExpenceSummary();
    if (expenceData) {
      let { youOwe, youOwed } = expenceData;
      let youOwedArr = youOwed && createOweArray(youOwed);
      let youOweArr = youOwe && createOweArray(youOwe);
      setYouOwed(youOwedArr);
      setYouOwe(youOweArr);
    }
  };

  React.useEffect(() => {
    getFriendsList();
    getExpenceSummary();
  }, [getFriendsList, getExpenceSummary]);

  React.useEffect(() => {
    createSummary();
    // eslint-disable-next-line
  }, [friendList]);

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
                <React.Fragment key={val.id}>
                  {val.amount > 0 && (
                    <Box key={val.id} style={{ marginBottom: "1rem" }}>
                      <Label>{val.name}</Label>
                      <Text>
                        you owe: <strong>{_.round(val.amount, 2)}</strong>
                      </Text>
                    </Box>
                  )}
                </React.Fragment>
              ))}
          </Box>

          <Box style={{ flex: "1" }}>
            <BoldText style={{ marginBottom: "2rem" }}>YOU ARE OWED</BoldText>
            {youOweds &&
              youOweds.length > 0 &&
              youOweds.map((val) => (
                <React.Fragment key={val.id}>
                  {val.amount > 0 && (
                    <Box key={val.id} style={{ marginBottom: "1rem" }}>
                      <Label>{val.name}</Label>
                      <Text>
                        owes you: <strong>{_.round(val.amount, 2)}</strong>
                      </Text>
                    </Box>
                  )}
                </React.Fragment>
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
          <AddExpence
            onClose={() => {
              setOpenAddExpenceBox(false);
              getFriendsList();
              getExpenceSummary();
            }}
          />
        </Modal>
      )}
    </StyledContainer>
  );
};

const mapStateToProps = (state) => ({
  loading: state.friends.loading,
  friendList: state.friends.list,
  expenceData: state.expenceSummary.summary,
});

export default connect(mapStateToProps, { getFriendsList, getExpenceSummary })(
  Dashboard
);
