import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Main from "./pages/Welcome/Main";
import Register from "./pages/Register/Register";
import RegisterAlert from "./pages/Register/RegisterAlert/RegisterAlert";
import AlreadyReg from "./pages/Register/AlreadyRegistered/AlreadyReg";

export default function App() {
  const keyToken = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    if (!keyToken) {
      return <Navigate to="/register" replace />; // если токена нет, то перейти на регистрацию
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* АВТОРИЗАЦИЯ */}
        <Route path="/" element={<Login />} />
        {/* ПЕРЕХОД В ВЕЛКОМ */}
        <Route
          path="/main"
          element={
            <ProtectedRoute keyToken={keyToken}>
              <Main />
            </ProtectedRoute>
          }
        />
        {/* РЕГИСТРАЦИЯ */}
        <Route path="/register" element={<Register />} />
        {/* ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ */}
        <Route path="/register-Alert" element={<RegisterAlert />} />
        {/* ПОЛЬЗОВАТЕЛЬ УЖЕ ЗАРЕГИСТРИРОВАН */}
        <Route path="/already-Reg" element={<AlreadyReg />} />
      </Routes>
    </Router>
  );
}
