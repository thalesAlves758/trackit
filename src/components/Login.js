import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.png';

function Login() {
  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" />
      </LogoContainer>

      <Form>
        <InputForm required type="email" placeholder='email' />
        <InputForm required type="password" placeholder='senha' />
        <Button type='submit'>Entrar</Button>
      </Form>
      <StyledLink to={'/'}>Não tem uma conta? Cadastre-se!</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 180px;
  height: 180px;
  margin: 68px 0 32px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

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
`;

const Button = styled.button`
  height: 46px;
  border: none;
  background-color: var(--blue-jeans);
  border-radius: 5px;
  font-size: 20px;
  text-align: center;
  color: var(--white);

  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  margin: 25px auto 0;
  font-size: 14px;
  color: var(--blue-jeans);
  text-align: center;
`;

export default Login;
