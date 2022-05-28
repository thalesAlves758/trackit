import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../contexts/UserContext';
import TodayHabitsContext from '../contexts/TodayHabitsContext';

import Login from './Login';
import Register from './Register';
import Today from './Today';
import Habits from './Habits';
import History from './History';

function App() {
  const [user, setUser] = useState({});
  const [todayHabits, setTodayHabits] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <TodayHabitsContext.Provider value={{ todayHabits, setTodayHabits }}>

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
