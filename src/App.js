import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

export default function App() {
  const keyToken = window.localStorage.token;

  const ProtectedRoute = ({ children }) => {
    if (!keyToken) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute keyToken={keyToken}>
              <Welcome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}