import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import MyGems from "./components/MyGems";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mygems" element={<MyGems />} />
        </Routes>
      </Router>
    </div>
  );
}
