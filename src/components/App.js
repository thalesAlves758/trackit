import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import localStorageHelper from './utilities/localStorageHelper';

import UserContext from '../contexts/UserContext';
import TodayHabitsContext from '../contexts/TodayHabitsContext';

import Login from './Login';
import Register from './Register';
import Today from './Today';
import Habits from './Habits';
import History from './History';

function App() {
  const initialUser = localStorageHelper.get('user') ? localStorageHelper.get('user') : null;

  const [user, setUser] = useState(initialUser);
  const [todayHabits, setTodayHabits] = useState([]);

  function getTodayHabits() {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    
    axios
      .get(URL, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      })
      .then(({ data }) => setTodayHabits(data))
      .catch(err => console.log(err.response));
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <TodayHabitsContext.Provider value={{ todayHabits, setTodayHabits, getTodayHabits }}>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<Register />} />
            <Route path='/hoje' element={<Today />} />
            <Route path='/habitos' element={<Habits />} />
            <Route path='/historico' element={<History />} />
          </Routes>
          
        </TodayHabitsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
