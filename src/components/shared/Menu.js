import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import TodayHabitsContext from "../../contexts/TodayHabitsContext";

import getHabitsPercentage from '../utilities/getHabitsPercentage';

const ZERO = 0;

function Menu() {
  const { todayHabits } = useContext(TodayHabitsContext);

  return (
    <Footer>
      <MenuItem to="/habitos">
        Hábitos
      </MenuItem>

      <ProgressBarContainer>
        <Link to="/hoje">
          <CircularProgressbar
            value={getHabitsPercentage(todayHabits) || ZERO}
            text="Hoje"
            styles={buildStyles({
              textSize: '18px',
              backgroundColor: '#52b6ff',
              textColor: '#ffffff',
              trailColor: '#52b6ff',
              pathColor: '#ffffff',
            })}
          />
        </Link>
      </ProgressBarContainer>

      <MenuItem to="/historico">
        Histórico
      </MenuItem>
    </Footer>
  );
} 

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 70px;
  background-color: var(--white);
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled(Link)`
  font-size: 18px;
  color: var(--blue-jeans);
  text-decoration: none;
`;

const ProgressBarContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 90px;
  padding: 6px;
  background-color: var(--blue-jeans);
  margin: -30px 0 10px;
`;

export default Menu;
