import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Books from "./pages/books/Books";
import Register from "./pages/register/Register";
import AddBook from "./pages/addBook/AddBook";


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
        <Route path="/" element={<Login />} /> {/* Авторизация */}
        {/* Переход на страницу с книгами */}
        <Route
          path="/main"
          element={
            <ProtectedRoute keyToken={keyToken}> {/* Защищенный переход */}
              <Books />
            </ProtectedRoute>
          }
        />
        <Route path="/addBook" element={<AddBook />} /> {/* Переход на страницу с добавлением книги */}
        <Route path="/register" element={<Register />} /> {/* Регистрация */}
      </Routes>
    </Router>
  );
}
