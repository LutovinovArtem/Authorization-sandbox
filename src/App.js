import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Authorization from "./pages/login/Authorization";
import Books from "./pages/books/Books";
import Register from "./pages/register/Register";
import AddBook from "./pages/addBook/AddBook";
import EditBook from "./pages/editBook/EditBook";
import { ProtectedRoute } from "./hoc/RequireKey";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                {" "}
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addBook"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editBook/:id"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}
