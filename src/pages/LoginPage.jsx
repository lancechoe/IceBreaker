import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // ✅ 로그인된 유저 자동 리다이렉트
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      navigate("/game");
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("country", "KR"); // 기본값으로 한국 설정
    localStorage.removeItem("bestScore");
    localStorage.setItem("bestScore", -1); // 처음은 -1로 세팅
    navigate("/game");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Make a Perfect Circle</h1>
      <input
        className="login-input"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin} className="login-button" disabled={!name}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
