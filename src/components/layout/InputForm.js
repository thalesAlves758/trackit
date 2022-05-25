import styled from 'styled-components';

const InputForm = styled.input`
  height: 46px;
  border: 1px solid var(--light-gray);
  border-radius: 5px;
  font-size: 20px;
  color: var(--granite-gray);
  padding: 0 10px;
  outline: none;

  ::placeholder {
    color: var(--gainsboro);
  }

  :disabled {
    background-color: var(--anti-flash-white);
  }
`;

export default InputForm;
