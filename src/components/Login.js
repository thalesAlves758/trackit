import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';

import logo from '../assets/img/logo.png';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function logIn() {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

    axios
      .post(URL, form)
      .then(({ data }) => {
        alert("Sucesso! Olhe o console");
        console.log(data);
      })
      .catch(error => alert(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    logIn();
  }

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" />
      </LogoContainer>

      <Form onSubmit={handleSubmit}>
        <InputForm
          required
          type="email"
          placeholder='email'
          name='email'
          disabled={isLoading}
          value={form.email}
          onChange={handleForm}
        />
        <InputForm
          required
          type="password"
          placeholder='senha'
          name='password'
          disabled={isLoading}
          value={form.password}
          onChange={handleForm}
        />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? <ThreeDots color="white" height="14" width="50" /> : 'Entrar' }
        </Button>
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

  :disabled {
    background-color: var(--anti-flash-white);
  }
`;

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

const StyledLink = styled(Link)`
  margin: 25px auto 0;
  font-size: 14px;
  color: var(--blue-jeans);
  text-align: center;
`;

export default Login;
