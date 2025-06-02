import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import { supabase } from "./supabaseClient"; // 경로 맞춰서 수정

function App() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from("rankings").select("*");
      console.log("📦 DATA:", data);
      if (error) console.error("❌ ERROR:", error);
    };

    test();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
