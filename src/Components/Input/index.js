import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 1rem;
  font-size: 1rem;
  transition: 0.5s ease;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.sectionBg};
  color: ${({ theme }) => theme.text};
  :focus {
    border-color: ${({ theme }) => theme.text};
  }
`;

export default Input;

// ${({ theme }) => theme.sectionBg};
