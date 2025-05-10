import React from "react";

function LeaderBoard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Game Over</h1>
      <h2>Leaderboard</h2>
      <p>Press Back to return to the game.</p>
      <button onClick={() => (window.location.href = "/")}>Back</button>
    </div>
  );
}

export default LeaderBoard;