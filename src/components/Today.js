import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useContext } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import TodayHabitsContext from "../contexts/TodayHabitsContext";

import Header from "./shared/Header";
import Menu from "./shared/Menu";
import RenderIf from "./utilities/RenderIf";

import Main from "./layout/Main";
import MainTitle from "./layout/MainTitle";
import Content from "./layout/Content";
import TopContent from "./layout/TopContent";
import MainContent from "./layout/MainContent";

import getHabitsPercentage from "./utilities/getHabitsPercentage";
import localStorageHelper from './utilities/localStorageHelper';

const ZERO = 0;

function CompletedIcon({ done, toggleHabit }) {
  return (
    <ion-icon name="checkbox" onClick={toggleHabit} style={{ color: done ? '#8FC549' : '#EBEBEB' }}></ion-icon>
  );
}

function TodayHabit({ id, name, done, currentSequence, highestSequence }) {
  const { user } = useContext(UserContext);
  const { todayHabits, setTodayHabits } = useContext(TodayHabitsContext);

  function updateHabit() {
    setTodayHabits(todayHabits.map(habit => {
      if(habit.id !== id) {
        return habit;
      }

      const newCurrentSequence = done ? currentSequence - 1 : currentSequence + 1;
      const newHighestSequence = newCurrentSequence > highestSequence ? newCurrentSequence : highestSequence;

      return {
        ...habit,
        currentSequence: newCurrentSequence,
        highestSequence: newHighestSequence,
        done: !done,
      };
    }));
  }

  function toggleHabit() {
    const action = done ? 'uncheck' : 'check';

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${action}`;

    axios
      .post(URL, {}, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      })
      .then(() => updateHabit())
      .catch(err => console.log(err));
  }

  return (
    <HabitContainer>
      <HabitInfo>
        <h2>{name}</h2>
        <p>Sequência atual: <SequenceInfo green={done}>{currentSequence} dia(s)</SequenceInfo></p>
        <p>Seu recorde: <SequenceInfo green={currentSequence === highestSequence}>{highestSequence} dia(s)</SequenceInfo></p>
      </HabitInfo>

      <CompletedIcon toggleHabit={toggleHabit} done={done} />
    </HabitContainer>
  );
}

function Today() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { todayHabits, setTodayHabits } = useContext(TodayHabitsContext);

  function checkUser() {
    if(!user.email) {
      const userLocalStorage = localStorageHelper.get('user');

      if(userLocalStorage) {
        setUser(userLocalStorage);
        return;
      }

      navigate('/');
    }
  }
  
  useEffect(() => {
    checkUser();

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const hasUserInLocalstorage = () => localStorageHelper.get('user') !== null;

    const userToken = user.token || hasUserInLocalstorage() ? localStorageHelper.get('user').token : '';

    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${userToken}`,
        }
      })
      .then(({ data }) => setTodayHabits(data))
      .catch(err => console.log(err.response.data));
  }, []);

  function getCurrentDate() {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return `${weekDays[dayjs().day()]}, ${dayjs().format('DD/MM')}`;
  }

  const hasAnyCompletedHabit = () => todayHabits.length > ZERO && todayHabits.some(habit => habit.done);

  function getTodayHabits() {
    return todayHabits.map(habit => (
      <TodayHabit
        key={habit.id}
        id={habit.id}
        done={habit.done}
        name={habit.name}
        currentSequence={habit.currentSequence}
        highestSequence={habit.highestSequence}
      />
    ));
  }

  return (
    <>
      <Header />

      <Main>
        <Content>
          <TopContent>
            <Titles>
              <MainTitle>
                { getCurrentDate() }
              </MainTitle>

              <RenderIf isTrue={!hasAnyCompletedHabit()}>
                <Subtitle>
                  Nenhum hábito concluído ainda
                </Subtitle>
              </RenderIf>

              <RenderIf isTrue={hasAnyCompletedHabit()}>
                <Subtitle hasCompletedHabits="true">
                  {getHabitsPercentage(todayHabits)}% dos hábitos concluídos
                </Subtitle>
              </RenderIf>
            </Titles>
          </TopContent>

          <MainContent>
            { getTodayHabits() }
          </MainContent>
        </Content>
      </Main>

      <Menu />
    </>
  );
}

const Titles = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  color: ${props => props.hasCompletedHabits ? 'var(--android-green)' : 'var(--gray)'};
  font-size: 18px;
  line-height: 22px;
`;

const HabitContainer = styled.div`
  width: 100%;
  height: 94px;
  background-color: var(--white);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;

  ion-icon {
    font-size: 70px;
    border-radius: 5px;

    :hover {
      cursor: pointer;
    }
  }
`;

const HabitInfo = styled.div`
  color: var(--granite-gray);
  
  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`;

const SequenceInfo = styled.span`
  color: ${props => props.green ? '#8FC549' : 'inherit'};
`;

export default Today;
