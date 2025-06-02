import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // 새로 만든 CSS 불러오기

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/game");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sculpting Circle</h1>

      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default LoginPage;
