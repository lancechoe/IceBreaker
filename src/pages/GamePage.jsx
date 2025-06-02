import React, { useState, useEffect } from "react";
import "../styles/GamePage.css";

function GamePage() {
  /* 얼음 HP 설정 (1000과 5000사이 랜덤) 변수*/
  const [initialHP, setInitialHP] = useState(
    Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
  );
  const [iceHP, setIceHP] = useState(initialHP);
  const hpRatio = Math.max(iceHP / initialHP, 0);
  const shapeStyle = {
    borderRadius: `${(1 - hpRatio) * 50}%`,
  };
  /* 도구 설정 변수 */
  const [selectedTool, setSelectedTool] = useState(null);
  /* 제출 변수 */
  const [submitted, setSubmitted] = useState(false);
  /* 결과 메시지 변수 */
  const [resultMessage, setResultMessage] = useState("");
  /* 게임 오버 변수 */
  const [isGameOver, setIsGameOver] = useState(false);
  /* 파편 변수 */
  const [flakes, setFlakes] = useState([]);
  /* 타이머 변수 */
  const [timer, setTimer] = useState(30);
  /* 스코어 변수 */
  const [score, setScore] = useState(null);
  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem("bestScore")) || 0;
  });

  /* 사운드 */
  const playHitSound = () => {
    const audio = new Audio(process.env.PUBLIC_URL + "/sounds/ice-hit.mp3");
    audio.volume = 0.5; // (0.0 ~ 1.0) → 필요하면 조절 가능
    audio.play();
  };

  /* 도구 종류 */
  const tools = {
    axe: { emoji: "🪓", damage: 500 },
    hammer: { emoji: "🔨", damage: 100 },
    chisel: { emoji: "🔧", damage: 20 },
    awl: { emoji: "🪛", damage: 1 },
  };

  /* 타이머 useEffect */
  useEffect(() => {
    if (submitted || isGameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted, isGameOver]);

  /* 도구 클릭 함수 */
  const handleToolSelect = (toolName) => {
    setSelectedTool(toolName);
  };

  /* 점수 계산 함수 */
  const calculateScore = (hp) => {
    const diff = Math.abs(hp - 1);
    return Math.max(0, 100 - diff); // 1HP가 완벽, 차이 날수록 점수 깎임
  };

  /* 얼음 클릭 함수 */
  const handleIceClick = (e) => {
    if (isGameOver || submitted || !selectedTool) return;
    playHitSound();

    // 데미지 처리
    const damage = tools[selectedTool].damage;
    setIceHP((prevHP) => {
      const newHP = prevHP - damage;
      if (newHP <= 0) setIsGameOver(true);
      return newHP;
    });

    // 흔들림 클래스 추가
    const ice = e.currentTarget;
    ice.classList.add("shake");
    setTimeout(() => {
      ice.classList.remove("shake");
    }, 200);

    // 떨어지는 조각 생성 (5~10개)
    const rect = ice.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const newFlakes = Array.from({
      length: Math.floor(Math.random() * 6) + 5,
    }).map((_, i) => ({
      id: Date.now() + i,
      left: offsetX + Math.random() * 30 - 15,
      top: offsetY + Math.random() * 10 - 10, // Y도 조금 랜덤하게
      delay: Math.random() * 0.3,
      color: `rgb(${Math.floor(Math.random() * 256)}, 
               ${Math.floor(Math.random() * 256)}, 
               ${Math.floor(Math.random() * 256)})`,
      size: Math.random() * 4 + 4, // 4 ~ 8px 사이 랜덤
    }));

    setFlakes((prev) => [...prev, ...newFlakes]);

    // 1초 후 제거
    setTimeout(() => {
      setFlakes((prev) =>
        prev.filter((flake) => !newFlakes.some((nf) => nf.id === flake.id))
      );
    }, 1000);
  };

  /* 제출 클릭 함수 */
  const handleSubmit = () => {
    if (isGameOver) {
      setResultMessage("💀 RIP, beautiful ice.");
    } else if (iceHP === 1) {
      setResultMessage("🎯 Perfect! You’ve carved the ideal sphere.");
    } else if (iceHP <= 5) {
      setResultMessage("✨ So close! Just a tiny chip away from perfection.");
    } else if (iceHP <= 20) {
      setResultMessage("🪓 Not bad, but still a bit rough around the edges.");
    } else {
      setResultMessage("💥 Hmm… You went a little too hard on it.");
    }

    const newScore = calculateScore(iceHP);
    setScore(newScore);

    // 최고점 갱신
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem("bestScore", newScore);
    }

    setSubmitted(true);
  };

  /* 재시작 함수 */
  const handleReset = () => {
    const newInitialHP = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    setInitialHP(newInitialHP);
    setIceHP(newInitialHP);
    setSelectedTool(null);
    setIsGameOver(false);
    setSubmitted(false);
    setResultMessage("");
    setTimer(30);
    setScore(null);
  };

  return (
    <div className="game-container">
      {/* 개발용 HP 표시 */}
      {process.env.NODE_ENV === "development" && <div> HP : {iceHP}</div>}
      <div className="status-text">⏱ : {timer}</div>

      {/* 얼음 블록 */}
      <div
        className={`ice-block 
          ${selectedTool ? `cursor-${selectedTool}` : ""}
          ${isGameOver ? "game-over" : ""}`}
        onClick={handleIceClick}
        style={shapeStyle}
      >
        {/*파편 렌더링 */}
        {flakes.map((flake) => (
          <div
            key={flake.id}
            className="ice-flake"
            style={{
              left: `${flake.left}px`,
              top: `${flake.top}px`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              backgroundColor: flake.color,
            }}
          />
        ))}

        {/* 둥근 모양 안에 색 칠하기 (Submit했을 때) */}
        {submitted && !isGameOver && (
          <div className="color-grid-inside" style={shapeStyle}>
            {Array.from({ length: 10000 }).map((_, i) => {
              const r = Math.floor(Math.random() * 255);
              const g = Math.floor(Math.random() * 255);
              const b = Math.floor(Math.random() * 255);
              return (
                <div
                  key={i}
                  className="grid-cell-inside"
                  style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                />
              );
            })}
          </div>
        )}

        {/* 결과 메시지 & Play Again 버튼 */}
        {(isGameOver || submitted) && (
          <div className="ice-message">
            <div className="result-text">{resultMessage}</div>
            <div className="hp-text">
              HP: {Math.max(iceHP, 0)} / {initialHP}
            </div>
            {score !== null && (
              <>
                <div className="score-text">Score: {score}</div>
                <div className="score-text">Best Score: {bestScore}</div>
              </>
            )}

            <button onClick={handleReset} className="play-again-button">
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={submitted || isGameOver}
        className="submit-button"
      >
        Submit
      </button>

      {/* 도구 버튼들 */}
      <div className="tool-buttons">
        <button className="tool-button" onClick={() => handleToolSelect("axe")}>
          🪓 (-500)
        </button>
        <button
          className="tool-button"
          onClick={() => handleToolSelect("hammer")}
        >
          🔨 (-100)
        </button>
        <button
          className="tool-button"
          onClick={() => handleToolSelect("chisel")}
        >
          🔧 (-20)
        </button>
        <button className="tool-button" onClick={() => handleToolSelect("awl")}>
          🪛 (-1)
        </button>
      </div>
    </div>
  );
}
export default GamePage;
