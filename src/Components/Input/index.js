import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 1rem;
  font-size: 1rem;
  transition: .5s ease;
  margin-top: .5rem;
  margin-bottom: .5rem;
  :focus {
    border-color: #000;
  }
`;

export default Input;
