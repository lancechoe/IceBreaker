import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직은 나중에 추가하고 일단 바로 게임으로 이동
    navigate("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Ice Breaker</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
