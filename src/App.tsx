import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import WheelPage from "./pages/WheelPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wheel" element={<WheelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
