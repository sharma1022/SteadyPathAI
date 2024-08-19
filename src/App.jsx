import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#13131a] p-4">
      <header className="l:w-full max-w-[1280px] max-sm:w-full sm:pr-5 xl:mx-auto xl:w-[1280px]">
        <Navbar />
      </header>
      <main className="l:w-full max-w-[1280px] max-sm:w-full sm:pr-5 xl:mx-auto xl:w-[1280px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
