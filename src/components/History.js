import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

import Content from "./layout/Content";
import Main from "./layout/Main";
import MainContent from "./layout/MainContent";
import MainTitle from "./layout/MainTitle";
import TopContent from "./layout/TopContent";

import Header from "./shared/Header";
import Menu from "./shared/Menu";
import axios from 'axios';
import dayjs from 'dayjs';

function History() {
  const { user } = useContext(UserContext);

  const [habitsHistory, setHabitsHistory] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then(({ data }) => setHabitsHistory(data))
      .catch(err => console.log(err));
  }, []);

  const hasDate = date => habitsHistory.some(habit => habit.day === dayjs(date).format("DD/MM/YYYY"));

  function completedAllHabits(date) {
    const { habits } = habitsHistory.find(habit => habit.day === dayjs(date).format("DD/MM/YYYY"));

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
            <Calendar formatDay={getDay} />
          </MainContent>
        </Content>
      </Main>

      <Menu />
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

export default History;
