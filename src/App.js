import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import "./scss/App.scss";

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./utils/context";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to='/ReactFirebase/login' />
    } else {
      return children
    }
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ReactFirebase" element={<Navigate to="/ReactFirebase/login" />}></Route>
          <Route path='/ReactFirebase/login' element={<Login />}></Route>
          <Route path='/ReactFirebase/register' element={<Register />}></Route>
          <Route path='/ReactFirebase/home' index element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
