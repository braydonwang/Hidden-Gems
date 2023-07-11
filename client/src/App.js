import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import MyGems from "./components/MyGems";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import CreateGem from "./components/CreateGem";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/mygems"
          element={!user ? <Navigate to="/login" replace /> : <MyGems />}
        />
        <Route
          path="/create"
          element={!user ? <Navigate to="/login" replace /> : <CreateGem />}
        />
      </Routes>
    </div>
  );
}
