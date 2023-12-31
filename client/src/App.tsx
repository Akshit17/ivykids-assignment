import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import "react-toastify/dist/ReactToastify.css";
import { Timeline } from "./pages/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Cards />} /> */}
        <Route path="/" element={<Timeline />} />
        {/* <Route path="/timeline" element={<Timeline />} />
        <Route path="/profilePage" element={<profilePage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}
