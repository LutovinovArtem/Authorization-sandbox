import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Authorization from "./Authorization";


export default function App() {
  return (
    <Router>
      <Authorization />
    </Router>
  );
}
