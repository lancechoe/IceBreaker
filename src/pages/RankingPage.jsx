import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/RankingPage.css"; // ✅ CSS 파일 import

function RankingPage() {
  const [rankings, setRankings] = useState([]);

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
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">🏆 Today's Ranking</h2>
      {rankings.length === 0 ? (
        <p>No rankings yet. Be the first!</p>
      ) : (
        <ul className="ranking-list">
          {rankings.map((user, index) => {
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
      )}
    </div>
  );
}

function getFlagEmoji(countryCode) {
  if (!countryCode) return "🌐";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

export default RankingPage;
