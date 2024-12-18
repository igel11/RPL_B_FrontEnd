import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FindAccount from "./pages/FindAccount";
import ActivationCode from "./pages/ActivationCode";
import RessetPassword from "./pages/RessetPassword";
import Dashboard from "./pages/Dashboard";
import Absensi from "./pages/Absensi";
import Reservasi from "./pages/Reservasi";
import Laporan from "./pages/Laporan";
import Monitoring from "./pages/Monitoring";
const App = () => {
  return (
    <Router>
      {" "}
      {/* Pastikan seluruh aplikasi dibungkus Router */}
      <Routes>
        {/* Halaman utama SignUp */}
        <Route path="/" element={<SignIn />} />
        {/* Halaman SignIn */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/FindAccount" element={<FindAccount />} />
        <Route path="/ActivationCode" element={<ActivationCode />} />
        <Route path="/RessetPassword" element={<RessetPassword />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Absensi" element={<Absensi />} />
        <Route path="/Reservasi" element={<Reservasi />} />
        <Route path="/Laporan" element={<Laporan />} />
        <Route path="/Monitoring" element={<Monitoring />} />
      </Routes>
    </Router>
  );
};

export default App;
