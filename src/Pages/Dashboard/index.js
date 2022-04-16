import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import { Box, Container, Flex } from "../../Components/Layouts";
import Modal from "../../Components/Modal";
import { Heading, LargeText, Spacer } from "../../Components/Typography";
import AddExpence from "../../Containers/AddExpence";
import AddFriendForm from "../../Containers/AddFriendForm";
import BalanceSummary from "../../Containers/BalanceSummary";
import theme from "../../theme";

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

const Dashboard = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = React.useState(false);
  const [openAddExpenceBox, setOpenAddExpenceBox] = React.useState(false);

  // const onAddFriend = (event) => {
  //   console.log("onAddExpence", event);
  //   // TODO: Add Function to save Friends data to the store
  // };

  // const onAddExpence = (event) => {
  //   console.log("onAddExpence", event);
  //   // TODO: Add Function to save Expences data to the store
  // };
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
            <LargeText>YOU OWE</LargeText>
          </Box>

          <Box style={{ flex: "1" }}>
            <LargeText>YOU ARE OWED</LargeText>
          </Box>
        </Flex>
      </Box>

      {/* Modal */}
      {openAddFriendBox && (
        <Modal title="Add Friend" onClose={() => setOpenAddFriendBox(false)}>
          <AddFriendForm />
        </Modal>
      )}

      {openAddExpenceBox && (
        <Modal title="Add Expence" onClose={() => setOpenAddExpenceBox(false)}>
          <AddExpence onClose={() => setOpenAddExpenceBox(false)}/>
        </Modal>
      )}
    </StyledContainer>
  );
};

export default Dashboard;
