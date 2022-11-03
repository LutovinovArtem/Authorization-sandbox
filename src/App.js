import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Authorization from "./pages/login/Authorization";
import Books from "./pages/books/Books";
import Register from "./pages/register/Register";
import AddBook from "./pages/addBook/AddBook";
import EditBook from "./pages/editBook/EditBook";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<Books />} index />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/editBook/:id" element={<EditBook />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}