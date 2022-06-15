import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Producto from "./product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Producto />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
