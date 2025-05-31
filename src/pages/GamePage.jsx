import React, { useState } from "react";
import "../styles/GamePage.css";

function GamePage() {
  /* 얼음 HP 설정 (1000과 5000사이 랜덤) 변수*/
  const [initialHP] = useState(
    Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
  );
  const [iceHP, setIceHP] = useState(initialHP);

  /* 얼음 HP 비율 변수 */
  const hpRatio = Math.max(iceHP / initialHP, 0); // 1.0 ~ 0.0 사이
  const shapeStyle = {
    borderRadius: `${(1 - hpRatio) * 50}%`,
  };

  /* 도구 설정 변수 */
  const [selectedTool, setSelectedTool] = useState(null);

  /* 게임 오버 변수 */
  const [isGameOver, setIsGameOver] = useState(false);

  /* 도구 종류 */
  const tools = {
    axe: { emoji: "🪓", damage: 500 },
    hammer: { emoji: "🔨", damage: 100 },
    chisel: { emoji: "🔧", damage: 20 },
    awl: { emoji: "🪛", damage: 1 },
  };

  /* 도구 클릭 함수 */
  const handleToolSelect = (toolName) => {
    setSelectedTool(toolName);
  };

  /* 얼음 클릭 함수 */
  const handleIceClick = () => {
    if (isGameOver) return;
    if (selectedTool) {
      const damage = tools[selectedTool].damage;
      setIceHP((prevHP) => {
        const newHP = prevHP - damage;
        if (newHP <= 0) {
          setIsGameOver(true);
        }
        return newHP;
      });
    }
  };

  return (
    <div>
      <div>Ice HP : {iceHP}</div>

      <div
        className={`ice-block 
          ${selectedTool ? `cursor-${selectedTool}` : ""}
          ${isGameOver ? "game-over" : ""}
        `}
        onClick={handleIceClick}
        style={shapeStyle}
      >
        {isGameOver && (
          <div className="ice-message">💀 RIP, beautiful ice.</div>
        )}
      </div>
      {/* 도구 버튼들 */}
      <div>
        <button onClick={() => handleToolSelect("axe")}>🪓 (-500)</button>
        <button onClick={() => handleToolSelect("hammer")}>🔨 (-100)</button>
        <button onClick={() => handleToolSelect("chisel")}>🔧 (-20)</button>
        <button onClick={() => handleToolSelect("awl")}>🪛 (-1)</button>
        <p>선택한 도구 : {selectedTool}</p>
      </div>
    </div>
  );
}
export default GamePage;
