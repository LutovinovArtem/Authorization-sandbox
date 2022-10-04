import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";

export default function App() {
  // проверка на наличие jwt токена
  const keyToken = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    if (!keyToken) {
      // если токена нет, то перейти на регистрацию
      return <Navigate to="/register" replace />; 
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
      </Routes>
    </Router>
  );
}
