// src/components/landing-page/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate("/connect-four/main-menu");
  };

  return (
    <div className="min-h-screen">
        <div className="flex flex-col container items-center py-6">
            <header className="text-center mt-12">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Connect Four</h1>
                <p className="text-lg text-primary">Challenge yourself or a friend in this classic game of strategy!</p>
            </header>

            <section className="max-w-3xl mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-tertiary mb-4 text-center">About the Game</h2>
                <p className="text-gray-600 mb-6">
                Connect Four is a classic strategy game where two players compete to be the first to align four of their pieces
                in a row. Whether playing against a friend or the AI, make every move count!
                </p>

                <h2 className="text-2xl font-semibold text-tertiary mb-4 text-center">How to Play</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Select a column to drop your piece (either by clicking or tapping).</li>
                <li>Each player takes turns dropping one piece per round.</li>
                <li>Align four of your pieces vertically, horizontally, or diagonally to win.</li>
                <li>If the grid fills up and no player has connected four, the game ends in a draw.</li>
                </ol>
            </section>

            <button
                onClick={handlePlayNow}
                className="mt-10 px-8 py-3 bg-tertiary text-white text-lg font-bold rounded-full hover:bg-quaternary transition duration-300"
            >
                Play Now
            </button>
        </div>
    </div>
  );
}

export default LandingPage;
