import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const [mode, setMode] = useState("PVP"); // Default mode
  const [sets, setSets] = useState(1); // Default sets
  const navigate = useNavigate();

  const startGame = () => {
    if (mode && sets) {
      navigate("/connect-four", { state: { mode, sets } });
    } else {
      alert("Please select both game mode and number of sets.");
    }
  };

  return (
    <div className="container h-screen flex flex-col items-center pt-10">
      <h1 className="text-5xl font-bold text-primary mb-8">Connect Four</h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Game Mode Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Game Mode</h2>
          <div className="flex space-x-4">
            {["PVP", "PVAI"].map((gameMode) => (
              <button
                key={gameMode}
                onClick={() => setMode(gameMode)}
                className={`px-8 py-4 rounded-lg font-bold hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                  mode === gameMode
                    ? gameMode === "PVP"
                      ? "bg-tertiary text-white border-tertiary"
                      : "bg-quaternary text-white border-quaternary"
                    : "bg-gray-200 text-black"
                }`}
              >
                {gameMode === "PVP" ? "Player vs Player" : "Player vs AI"}
              </button>
            ))}
          </div>
        </div>

        {/* Set Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Number of Sets</h2>
          <div className="flex space-x-4">
            {[1, 3, 5].map((set) => (
              <button
                key={set}
                onClick={() => setSets(set)}
                className={`px-6 py-3 rounded-lg font-bold hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                  sets === set
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-gray-200 text-black border-gray-300 hover:border-white"
                }`}
              >
                {set} {set === 1 ? "Set" : "Sets"}
              </button>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={startGame}
          className={`mt-6 px-8 py-4 font-semibold rounded-lg border-[3px] ${
            sets && mode
              ? "bg-green-500 text-white hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800"
              : "bg-green-300 text-neutral-100 cursor-default"
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
