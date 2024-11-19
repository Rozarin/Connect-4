// src/components/connect-four/MainMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const [mode, setMode] = useState(null);
  const [sets, setSets] = useState(1);
  const navigate = useNavigate();

  const startGame = () => {
    if (mode && sets) {
      // Navigate to the ConnectFour game page, passing mode and sets as state
      navigate("/connect-four", { state: { mode, sets } });
    } else {
      alert("Please select both game mode and number of sets.");
    }
  };

  return (
    <div className="container h-screen flex flex-col items-center pt-10">
      <h1 className="text-5xl font-bold text-primary font mb-8">Connect Four</h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Game Mode Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Game Mode</h2>
          <div className="flex flex-col space-y-4 text-lg font-bold">
            <button
              onClick={() => setMode("PVP")}
              className={`px-6 py-3 rounded-lg hover:text-white hover:bg-tertiary hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                mode === "PVP" ? "bg-tertiary text-white" : "bg-gray-200 text-black border-tertiary"
              }`}
            >
              Player vs Player
            </button>
            <button
              onClick={() => setMode("PVAI")}
              className={`px-6 py-3 rounded-lg hover:text-white hover:bg-quaternary hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                mode === "PVAI" ? "bg-quaternary text-white" : "bg-gray-200 text-black border-quaternary"
              }`}
            >
              Player vs AI
            </button>
          </div>
        </div>

        {/* Set Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Number of Sets</h2>
          <div className="flex space-x-4 font-bold">
            {[1, 3, 5].map((set) => (
              <button
                key={set}
                onClick={() => setSets(set)}
                className={`px-6 py-3 rounded-lg hover:bg-red-300 hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                  sets === set ? "bg-red-500 text-white" : "bg-gray-200 text-black border-red-500 hover:border-white"
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
              : "bg-green-300 text-neutral-100"
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
