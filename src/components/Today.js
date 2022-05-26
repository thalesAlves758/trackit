import axios from "axios";
import { useEffect, useState, useContext } from "react";

import UserContext from "../contexts/UserContext";

import Header from "./shared/Header";
import Menu from "./shared/Menu";

import Main from "./layout/Main";

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

  return (
    <>
      <Header />

      <Main>
        Hello
      </Main>

      <Menu />
    </>
  );
}

export default Today;
