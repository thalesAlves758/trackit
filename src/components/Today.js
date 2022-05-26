import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

import Header from "./shared/Header";
import Menu from "./shared/Menu";
import RenderIf from "./utilities/RenderIf";

import Main from "./layout/Main";
import MainTitle from "./layout/MainTitle";
import Content from "./layout/Content";
import TopContent from "./layout/TopContent";
import MainContent from "./layout/MainContent";

const ZERO = 0;
const ONE_HUNDRED = 100;

function CompletedIcon({ done }) {
  return (
    <ion-icon name="checkbox" style={{ color: done ? '#8FC549' : '#EBEBEB' }}></ion-icon>
  );
}

function TodayHabit({ id, name, done, currentSequence, highestSequence }) {
  return (
    <HabitContainer>
      <HabitInfo>
        <h2>{name}</h2>
        <p>Sequência atual: <SequenceInfo green={done}>{currentSequence} dia(s)</SequenceInfo></p>
        <p>Seu recorde: <SequenceInfo green={currentSequence === highestSequence}>{highestSequence} dia(s)</SequenceInfo></p>
      </HabitInfo>

      <CompletedIcon done={done} />
    </HabitContainer>
  );
}

function Today() {
  const { user } = useContext(UserContext);

  const [todayHabits, setTodayHabits] = useState([]);
  
  useEffect(() => {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    
    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
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

  const getCompletedHabitsAmount = () => todayHabits.reduce((acc, habit) => habit.done ? ++acc : acc, ZERO);

  const getCompletedHabitsPercentage = () => parseInt(getCompletedHabitsAmount() / todayHabits.length * ONE_HUNDRED);

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
                <Subtitle>
                  {getCompletedHabitsPercentage()}% dos hábitos concluídos
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
