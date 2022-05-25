import { useState } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';

import Container from './layout/Container';
import LogoContainer from './layout/LogoContainer';
import Form from './layout/Form';
import InputForm from './layout/InputForm';
import Button from './layout/Button';
import StyledLink from './layout/StyledLink';

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

      <StyledLink to='/cadastro'>Não tem uma conta? Cadastre-se!</StyledLink>
    </Container>
  );
}

export default Login;
