import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authorization from "./pages/login/Authorization";
import Books from "./pages/books/Books";
import Register from "./pages/register/Register";
import AddBook from "./pages/addBook/AddBook";
import EditBook from "./pages/editBook/EditBook";

export default function App() {
  const keyToken = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    if (!keyToken) {
      return <Navigate to="/register" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route
          path="/books"
          element={
            <ProtectedRoute keyToken={keyToken}>
              {" "}
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addBook"
          element={
            <ProtectedRoute keyToken={keyToken}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBook/:id"
          element={
            <ProtectedRoute keyToken={keyToken}>
              <EditBook />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/editBook/"
          element={
            <ProtectedRoute keyToken={keyToken}>
              <EditBook />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
