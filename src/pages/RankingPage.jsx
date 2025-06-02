import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function RankingPage() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      const { data, error } = await supabase
        .from("rankings")
        .select("*")
        .gte("created_at", `${today}T00:00:00`)
        .lte("created_at", `${today}T23:59:59`)
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
    <div style={{ padding: "30px", color: "#000", textAlign: "center" }}>
      <h2>🏆 Today's Ranking</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {rankings.map((user, index) => (
          <li key={user.id} style={{ margin: "10px 0", fontSize: "18px" }}>
            {index + 1}. {user.name} {getFlagEmoji(user.country)} — {user.score}{" "}
            pts
          </li>
        ))}
      </ul>
    </div>
  );
}

// 국가 코드로 국기 이모지 반환
function getFlagEmoji(countryCode) {
  if (!countryCode) return "🌐";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

export default RankingPage;
