import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  // I initialize the state for game mode and the number of sets. "PVP" and 1 set are the defaults.
  const [mode, setMode] = useState("PVP"); // Default mode is "Player vs Player"
  const [sets, setSets] = useState(1); // Default number of sets is 1
  const navigate = useNavigate(); // This will help me navigate between pages

  // This function is triggered when the "Start Game" button is clicked.
  const startGame = () => {
    // I check if both the mode and sets are selected, if not, I show an alert.
    if (mode && sets) {
      // If both are selected, I navigate to the "Connect Four" game page, passing mode and sets as state.
      navigate("/connect-four", { state: { mode, sets } });
    } else {
      // If not, I prompt the user to select both options.
      alert("Please select both game mode and number of sets.");
    }
  };

  return (
    <div className="container h-screen flex flex-col items-center pt-10">
      {/* Main Heading */}
      <h1 className="text-5xl font-bold text-primary mb-8">Connect Four</h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Game Mode Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Game Mode</h2>
          <div className="flex space-x-4">
            {/* I map through the available game modes (PVP and PVAI) */}
            {["PVP", "PVAI"].map((gameMode) => (
              <button
                key={gameMode}
                onClick={() => setMode(gameMode)} // When clicked, I update the mode state
                className={`px-8 py-4 rounded-lg font-bold hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                  mode === gameMode
                    ? gameMode === "PVP"
                      ? "bg-tertiary text-white border-tertiary" // If this is the selected mode, highlight it with custom styles
                      : "bg-quaternary text-white border-quaternary"
                    : "bg-gray-200 text-black" // If not selected, use default styles
                }`}
              >
                {gameMode === "PVP" ? "Player vs Player" : "Player vs AI"} {/* Display the correct mode text */}
              </button>
            ))}
          </div>
        </div>

        {/* Set Selection */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Choose Number of Sets</h2>
          <div className="flex space-x-4">
            {/* I map through possible set values (1, 3, 5) and allow the user to choose */}
            {[1, 3, 5].map((set) => (
              <button
                key={set}
                onClick={() => setSets(set)} // When clicked, I update the sets state
                className={`px-6 py-3 rounded-lg font-bold hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800 border-[3px] ${
                  sets === set
                    ? "bg-red-500 text-white border-red-500" // If this number of sets is selected, highlight it with custom styles
                    : "bg-gray-200 text-black border-gray-300 hover:border-white" // If not selected, use default styles
                }`}
              >
                {set} {set === 1 ? "Set" : "Sets"} {/* Display the correct number of sets */}
              </button>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={startGame} // When clicked, I call startGame to start the game
          className={`mt-6 px-8 py-4 font-semibold rounded-lg border-[3px] ${
            sets && mode
              ? "bg-green-500 text-white hover:scale-105 ease-in duration-100 shadow-md shadow-neutral-800" // If mode and sets are selected, the button is active and styled
              : "bg-green-300 text-neutral-100 cursor-default" // If not, the button is inactive and dimmed
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default MainMenu;