import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";

import UserContext from "../contexts/UserContext";

import Content from "./layout/Content";
import Main from "./layout/Main";
import Header from "./shared/Header";
import Menu from "./shared/Menu";
import TopContent from "./layout/TopContent";
import MainTitle from "./layout/MainTitle";
import Button from "./layout/Button";
import MainContent from "./layout/MainContent";

const ZERO = 0;

function Day({ selected, name }) {
  return (
    <DayButton selected={selected}>
      { name }
    </DayButton>
  );
}

function Habit({ id, name, days, habits, setHabits }) {
  const { user } = useContext(UserContext);

  const dayLetters = ["D", "S", "T", "Q", "Q", "S", "S"];

  const canDelete = () => window.confirm("Deseja mesmo excluir este hábito?");

  function deleteThisHabit() {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

    axios
      .delete(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      })
      .then(() => setHabits(habits.filter(habit => habit.id !== id)))
      .catch(err => console.log(err.response));
  }

  function handleClick() {
    if(canDelete()) {
      deleteThisHabit();
    }
  }

  function renderDays() {
    return dayLetters.map((day, index) => (
      <Day key={index} name={day} selected={days.includes(index)} />
    ));
  }

  return (
    <HabitContainer>
      <h2>{name}</h2>

      <HabitDays>
        { renderDays() }
      </HabitDays>

      <TrashIcon onClick={handleClick}>
        <ion-icon name="trash-outline"></ion-icon>
      </TrashIcon>
    </HabitContainer>
  );
}

function Habits() {
  const [habits, setHabits] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then(({ data }) => setHabits(data))
      .catch(err => console.log(err.response));
  }, []);

  function getHabits() {
    if(habits.length === ZERO) {
      return (
        <NoHabits>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
        </NoHabits>
      );
    }

    return habits.map(habit => (
      <Habit
        key={habit.id}
        id={habit.id}
        name={habit.name}
        days={habit.days}
        habits={habits}
        setHabits={setHabits}
      />
    ));
  }

  return (
    <>
      <Header />

      <Main>
        <Content>
          <TopContent>
              <MainTitle>
                Meus hábitos
              </MainTitle>

              <CustomButton>
                <ion-icon name="add-outline"></ion-icon>
              </CustomButton>
          </TopContent>

          <MainContent>
            { getHabits() }
          </MainContent>
        </Content>
      </Main>

      <Menu />
    </>
  );
}

const CustomButton = styled(Button)`
  width: 40px;
  height: 34px;
  font-size: 28px;
`;

const HabitContainer = styled.div`
  background-color: var(--white);
  height: 90px;
  border-radius: 5px;
  position: relative;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  h2 {
    font-size: 20px;
    color: var(--granite-gray);
  }
`;

const HabitDays = styled.div`
  display: flex;
  gap: 4px;
`;

const DayButton = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid ${props => props.selected ? 'var(--american-silver)' : 'var(--light-gray)'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.selected ? 'var(--white)' : 'var(--gainsboro)'};
  background-color: ${props => props.selected ? 'var(--american-silver)' : 'var(--white)'};
`;

const TrashIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: inherit;
  border: none;
  font-size: 18px;
  color: var(--granite-gray);

  :hover {
    cursor: pointer;
  }
`;

const NoHabits = styled.div`
  color: var(--granite-gray);
  font-size: 18px;
  line-height: 22px;
`;

export default Habits;
