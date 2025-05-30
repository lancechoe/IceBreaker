import React, { useState } from "react";
import "./GamePage.css";

function GamePage() {
  /* 얼음 HP 설정 (1000과 5000사이 랜덤)*/
  const [iceHP, setIceHP] = useState(
    Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
  );

  /* 도구 설정 */
  const [selectedTool, setSelectedTool] = useState(null);
  function handleToolSelect(toolName) {
    setSelectedTool(toolName);
  }
  const tools = {
    axe: { emoji: "🪓", damage: 500 },
    hammer: { emoji: "🔨", damage: 100 },
    chisel: { emoji: "🔧", damage: 20 },
    awl: { emoji: "🪛", damage: 1 },
  };

  return (
    <div>
      <div>Ice HP : {iceHP}</div>
      <div className="ice-block"></div>
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
