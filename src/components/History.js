import Content from "./layout/Content";
import Main from "./layout/Main";
import MainContent from "./layout/MainContent";
import MainTitle from "./layout/MainTitle";
import NoContentMessage from './layout/NoContentMessage';
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
            <NoContentMessage>
              Em breve você poderá ver o histórico dos seus hábitos aqui!
            </NoContentMessage>
          </MainContent>
        </Content>
      </Main>

      <Menu />
    </>
  );
}

export default History;
