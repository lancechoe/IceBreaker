import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleLogin = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("country", "KR"); // 기본값으로 한국 설정
    navigate("/game");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sculpting Circle</h1>

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
