import { useContext } from 'react';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

function Header() {
  const { user: { image } } = useContext(UserContext);

  return (
    <HeaderContainer>
      <h1>TrackIt</h1>
      <img src={image} alt="Foto de perfil" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: 70px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  background-color: #126BA5;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    font-family: 'Playball', cursive;
    color: var(--white);
    font-size: 38px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
`;

export default Header;
