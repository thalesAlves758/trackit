import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

import Content from "./layout/Content";
import Main from "./layout/Main";
import MainContent from "./layout/MainContent";
import MainTitle from "./layout/MainTitle";
import TopContent from "./layout/TopContent";

import Header from "./shared/Header";
import Menu from "./shared/Menu";
import RenderIf from './utilities/RenderIf';

import axios from 'axios';
import dayjs from 'dayjs';

const ZERO = 0;
const UNAUTHORIZED_CODE = 401;

function History() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [habitsHistory, setHabitsHistory] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);

  function checkUser() {
    if(!user) {
      navigate('/');
    }
  }

  useEffect(() => {
    checkUser();
    
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

    const token = user ? user.token : '';

    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(({ data }) => setHabitsHistory(data))
      .catch(err => {
        if(err.response.status === UNAUTHORIZED_CODE) {
          navigate('/');
        }
      });
  }, []);

  const hasDate = date => habitsHistory.some(habit => habit.day === dayjs(date).format("DD/MM/YYYY"));

  const getHistoryByDate = date => habitsHistory.find(habit => habit.day === dayjs(date).format("DD/MM/YYYY"));

  function completedAllHabits(date) {
    const { habits } = getHistoryByDate(date);

    return habits.every(habit => habit.done);
  }

  function getDay(locale, date) {
    if(!hasDate(date)) {
      return (
        <DayWithoutBackground>
          { dayjs(date).format("DD") }
        </DayWithoutBackground>
      );
    }

    return (
      <Day completedAll={completedAllHabits(date)}>
        { dayjs(date).format('DD') }
      </Day>
    );
  }

  function renderDateHabits() {
    return selectedHabits.map(habit => (
      <DayHabit key={habit.id} done={habit.done}>{habit.name}</DayHabit>
    ));
  }

  function handleClickDay(value) {
    const dayHistory = getHistoryByDate(value);

    if(!dayHistory) {
      return;
    }

    setSelectedHabits([...dayHistory.habits]);
  }

  const closeModal = () => setSelectedHabits([]);

  return (
    <>
      <Header />

      <Main>
        <Content>
          <TopContent>
            <MainTitle>
              Histórico
            </MainTitle>
          </TopContent>

          <MainContent>
            <Calendar formatDay={getDay} onClickDay={handleClickDay} className="calendar" />
          </MainContent>
        </Content>
      </Main>

      <Menu />

      <RenderIf isTrue={selectedHabits.length > ZERO}>
        <Modal>
          <ModalContent>
            <ModalTop>
              Hábitos
              <ion-icon onClick={closeModal} name="close-outline"></ion-icon>
            </ModalTop>

            <DayHabits>
              { renderDateHabits() }
            </DayHabits>
          </ModalContent>
        </Modal>
      </RenderIf>
    </>
  );
}

const Day = styled.div`
  background-color: ${props => props.completedAll ? '#8cc654' : '#ea5766'};
  margin: 0 auto;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const DayWithoutBackground = styled(Day)`
  background-color: inherit;
`;

const Modal = styled.div`
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 46px;
  overflow-y: scroll;
`;

const ModalContent = styled.div`
  width: 336px;
  background-color: var(--white);
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

const ModalTop = styled.div`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ion-icon {
    font-size: 30px;

    :hover {
      cursor: pointer;
    }
  }
`;

const DayHabits = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DayHabit = styled.div`
  padding: 16px;
  width: 100%;
  border-radius: 6px;
  background-color: ${props => props.done ? '#8cc654' : '#ea5766'};
`;

export default History;
