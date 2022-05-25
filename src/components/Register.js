import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';

import Container from "./layout/Container";
import LogoContainer from "./layout/LogoContainer";
import Form from "./layout/Form";
import InputForm from "./layout/InputForm";
import Button from "./layout/Button";
import StyledLink from "./layout/StyledLink";

import logo from '../assets/img/logo.png';

function Register() {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    image: '',
  });

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function register() {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    axios
      .post(URL, form)
      .then(() => navigate('/'))
      .catch(error => alert(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    register();
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

        <InputForm
          required
          type="text"
          placeholder='nome'
          name='name'
          disabled={isLoading}
          value={form.name}
          onChange={handleForm}
        />

        <InputForm
          required
          type="url"
          placeholder='foto'
          name='image'
          disabled={isLoading}
          value={form.image}
          onChange={handleForm}
        />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? <ThreeDots color="white" height="14" width="50" /> : 'Cadastrar' }
        </Button>
      </Form>

      <StyledLink to='/'>Já tem uma conta? Faça login!</StyledLink>
    </Container>
  );
}

export default Register;
