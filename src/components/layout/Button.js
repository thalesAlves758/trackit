import styled from 'styled-components';

const Button = styled.button`
  height: 46px;
  border: none;
  background-color: var(--blue-jeans);
  border-radius: 5px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);

  :hover {
    cursor: pointer;
  }

  :disabled {
    opacity: 0.7;
  }
`;

export default Button;
