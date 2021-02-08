import React from 'react'
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void
}

const ButtonWrapper = styled.button`
  padding-left: 40px;
  padding-right: 40px;
  color: white;
`;

const Text = styled.p`
  color: green;
  font-size: 1.5em;
`;

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Text>{children}</Text>
    </ButtonWrapper>
  );
}