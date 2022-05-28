import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import Content from "./layout/Content";
import Main from "./layout/Main";
import MainContent from "./layout/MainContent";
import MainTitle from "./layout/MainTitle";
import TopContent from "./layout/TopContent";

import Header from "./shared/Header";
import Menu from "./shared/Menu";

function History() {
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
            <Calendar />
          </MainContent>
        </Content>
      </Main>

      <Menu />
    </>
  );
}

export default History;
