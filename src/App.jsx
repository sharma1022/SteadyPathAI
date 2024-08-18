import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
const App = () => {
  return (
    <main className="flex min-h-screen flex-row bg-[#131313] p-4">
      <header className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        {/* Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </main>
  );
};

export default App;
