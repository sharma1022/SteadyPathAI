import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import MedicalRecords from "./pages/MedicalRecords/MedicalRecords";
import RecordDetails from "./pages/MedicalRecords/RecordDetails";
import Schedule from "./pages/Schedule";
const App = () => {
  const { currentUser, getUserByEmail } = useStateContext();

  const { user, authenticated, ready, login } = usePrivy();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (ready && !authenticated) {
  //     login();
  //   } else if (user && !currentUser) {
  //     navigate("/onboarding");
  //   }
  // }, [user, authenticated, ready, login, currentUser, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-4 dark:bg-[#13131a]">
      <header className="l:w-full max-w-[1280px] max-sm:w-full sm:pr-5 xl:mx-auto xl:w-[1280px]">
        <Navbar />
      </header>
      <main className="l:w-full scrollbar-thumb-gray-700 scrollbar-track-gray-300 max-w-[1280px] max-sm:w-full sm:pr-5 xl:mx-auto xl:w-[1280px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/medical-records/:id" element={<RecordDetails />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
