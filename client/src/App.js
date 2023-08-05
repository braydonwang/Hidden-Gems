import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import CreateGem from "./pages/CreateGem";

import { TORONTO_COORDS } from "./utils/Constants";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [coordinates, setCoordinates] = useState(TORONTO_COORDS);

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setUser={setUser}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <CreateGem user={user} setCoordinates={setCoordinates} />
            )
          }
        />
      </Routes>
    </div>
  );
}
