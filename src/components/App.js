import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../contexts/UserContext';

import Login from './Login';
import Register from './Register';
import Today from './Today';

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='/hoje' element={<Today />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
