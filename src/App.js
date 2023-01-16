import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import "./scss/App.scss";

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
