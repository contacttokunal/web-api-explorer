import { useState } from "react";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonStyle>
      <Button onClick={() => setIsOpen(!isOpen)}>Explore web APIs</Button>
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
`;

export default Button;
