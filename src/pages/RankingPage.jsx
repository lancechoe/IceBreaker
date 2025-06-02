import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/RankingPage.css";
import { useNavigate } from "react-router-dom";

function RankingPage() {
  const [rankings, setRankings] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRankings = async () => {
      const { data, error } = await supabase
        .from("rankings")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.error("❌ 랭킹 불러오기 에러:", error);
      } else {
        setRankings(data);

        // 내 순위 찾기
        const index = data.findIndex((user) => user.name === username);
        if (index !== -1) {
          setMyRank(index + 1);
        }
      }
    };

    fetchRankings();
  }, [username]);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">🏆 Top 10 Rankings</h2>
      <ul className="ranking-list">
        {rankings.slice(0, 10).map((user, index) => {
          let rankClass = "";
          let icon = "";
          if (index === 0) {
            rankClass = "first";
            icon = "👑";
          } else if (index === 1) {
            rankClass = "second";
            icon = "🥈";
          } else if (index === 2) {
            rankClass = "third";
            icon = "🥉";
          }

          return (
            <li
              key={`${user.name}-${index}`}
              className={`ranking-item ${rankClass}`}
            >
              {index + 1}. {icon} {user.name} — {user.score} pts
            </li>
          );
        })}
      </ul>

      {/* 내 순위가 10위 밖이라면 하단에 따로 보여줌 */}
      {myRank > 10 && (
        <div className="my-rank-text">
          You are ranked <strong>#{myRank}</strong> — keep carving! 💪
        </div>
      )}
      <button className="back-button" onClick={() => navigate("/game")}>
        Back to Game
      </button>
    </div>
  );
}

export default RankingPage;
