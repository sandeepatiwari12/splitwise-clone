import React from "react";
import styled from "styled-components";
import { Heading2, Spacer } from "../Typography";
import PropTypes from "prop-types";
import Button from "../Button";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 69%);
  overflow: hidden;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 45%;
  max-width: 50%;
  border: 2px solid ${({ theme: mode }) => mode.sectionBg};
  background: ${({ theme: mode }) => mode.sectionBg};
  border-radius: 4px;
  padding: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ModalTitle = styled(Heading2)`
  margin: 0;
  font-size: ${({ small }) => (small ? 1.8 : 2.5)}rem;
`;

const ModalBody = styled.div`
  padding: 1rem;
  min-height: 2rem;
  position: relative;
`;

const Modal = ({ title, children, onClose, small }) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalHeader>
          {title && <ModalTitle small={small}>{title}</ModalTitle>}
          <Spacer />
          <Button outlined onClick={onClose} variant={"error"}>
            {"Close"}
          </Button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
};

export default Modal;
