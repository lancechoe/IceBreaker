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

      <p className="login-reward-text">
        정사각형 얼음을 조각해 완벽한 원(Circle)을 만들어보세요
      </p>
      <p className="login-reward-text">
        다양한 도구를 사용해 정사각형형의 HP를 줄이고,
      </p>
      <p className="login-reward-text">
        딱 1 HP가 남도록 조각하면 최고 점수를 받을 수 있어요 제한 시간은 60초!
      </p>
      <p className="login-reward-text"></p>
    </div>
  );
}

export default LoginPage;
