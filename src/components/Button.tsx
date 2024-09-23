import { useState } from "react";
import styled from "styled-components";

const ButtonComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonStyle onClick={() => setIsOpen(!isOpen)}>
      Explore web APIs
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  background-color: #8bc4e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7ab1d3; /* Darker shade on hover */
  }
`;

export default ButtonComponent;
