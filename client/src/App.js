import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import MyGems from "./pages/MyGems";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import CreateGem from "./pages/CreateGem";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [coordinates, setCoordinates] = useState({
    lat: 43.66583121158871,
    lng: -79.38509373244385,
  });

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
          path="/mygems"
          element={!user ? <Navigate to="/login" replace /> : <MyGems />}
        />
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
