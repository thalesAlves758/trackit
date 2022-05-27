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
import Form from "./layout/Form";
import InputForm from "./layout/InputForm";
import SecondaryButton from "./layout/SecondaryButton";

import RenderIf from './utilities/RenderIf';

const ZERO = 0;

function Day({ clickable = false, selected, name, index, handleCheck = null }) {
  return (
    <DayCheckbox selected={selected} onClick={clickable ? () => handleCheck(index) : null}>
      { name }
    </DayCheckbox>
  );
}

function Days({ clickable = false, selectedDays = [], handleCheck = null }) {
  const dayLetters = ["D", "S", "T", "Q", "Q", "S", "S"];

  function renderDays() {
    return dayLetters.map((day, index) => (
      <Day clickable={clickable} key={index} handleCheck={handleCheck} index={index} name={day} selected={selectedDays.includes(index)} />
    ));
  }

  return (
    <HabitDays>
      { renderDays() }
    </HabitDays>
  );
}

function Habit({ id, name, days, habits, setHabits }) {
  const { user } = useContext(UserContext);

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

  return (
    <HabitContainer>
      <h2>{name}</h2>

      <Days selectedDays={days} />

      <TrashIcon onClick={handleClick}>
        <ion-icon name="trash-outline"></ion-icon>
      </TrashIcon>
    </HabitContainer>
  );
}

function NewHabitForm({ cancel }) {
  const [form, setForm] = useState({
    name: '',
    days: [],
  });

  function toggleDay(value) {
    const { days } = form;

    if(days.includes(value)) {
      setForm({ ...form, days: days.filter(day => day !== value)})
      return;
    }

    setForm({ ...form, days: [...days, value].sort() })
  }

  return (
    <HabitForm>
      <InputForm
        required
        type="text"
        placeholder="nome do hábito"
        name="name"
        value={form.name}
        onChange={event => setForm({...form, name: event.target.value})}
      />

      <Days clickable={true} handleCheck={toggleDay} selectedDays={form.days} />

      <FormButtons>
        <SecondaryButton onClick={cancel}>
          Cancelar
        </SecondaryButton>
        <Button>
          Salvar
        </Button>
      </FormButtons>
    </HabitForm>
  );
}

function Habits() {
  const [showForm, setShowForm] = useState(false);
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

              <CustomButton onClick={() => setShowForm(true)}>
                <ion-icon name="add-outline"></ion-icon>
              </CustomButton>
          </TopContent>

          <RenderIf isTrue={showForm}>
            <NewHabitForm cancel={() => setShowForm(false)} />
          </RenderIf>

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

const HabitForm = styled(Form)`
  margin-top: 20px;
  background-color: var(--white);
  padding: 18px;
`;

const DayCheckbox = styled.div`
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

const FormButtons = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 6px;

  button {
    width: 84px;
  }
`;

export default Habits;
