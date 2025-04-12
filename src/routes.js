import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicTacToe />} />
        <Route path="/*" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
