import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

import Header from "./shared/Header";
import Menu from "./shared/Menu";

import Main from "./layout/Main";
import MainTitle from "./layout/MainTitle";
import Content from "./layout/Content";
import TopContent from "./layout/TopContent";

function Today() {
  const { user } = useContext(UserContext);

  const [habits, setHabits] = useState([]);
  
  useEffect(() => {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    
    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      })
      .then(({ data }) => setHabits(data))
      .catch(err => console.log(err.response.data));
  }, []);

  function getCurrentDate() {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return `${weekDays[dayjs().day()]}, ${dayjs().format('DD/MM')}`;
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
              <Subtitle>
                Nenhum hábito concluído ainda
              </Subtitle>
            </Titles>
            <div className="teste">
              teste
            </div>
          </TopContent>
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

export default Today;
