import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Prestamo from "./components/prestamo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prestamo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
