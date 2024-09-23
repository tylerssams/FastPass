import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import SetupScreen from "./components/SetupScreen";
import VersusScreen from "./components/VersusScreen";
import CategorySelection from "./components/CategorySelection";
import GamePlay from "./components/GamePlay";
import ScoreUpdate from "./components/ScoreUpdate";
import WinnerScreen from "./components/WinnerScreen";
import { INITIAL_TEAMS } from "./constants";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [gameState, setGameState] = useState("start");
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [goalScore, setGoalScore] = useState(50);
  const [roundTime, setRoundTime] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const startGame = () => {
    if (teams[0].name.trim() === "" || teams[1].name.trim() === "") {
      alert("Please enter names for both teams.");
      return;
    }
    setGameState("vs");
    setTimeout(() => setGameState("category"), 3000);
  };

  const updateScore = (teamIndex, change) => {
    const newTeams = [...teams];
    newTeams[teamIndex].score += change;
    setTeams(newTeams);

    if (newTeams[teamIndex].score >= goalScore) {
      setGameState("winner");
      setCurrentTeam(teamIndex);
    }
  };

  const rematch = () => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
    setSelectedCategories([]);
    setGameState("category");
  };

  const renderGameState = () => {
    switch (gameState) {
      case "start":
        return <StartScreen setGameState={setGameState} darkMode={darkMode} setDarkMode={setDarkMode} />;
      case "setup":
        return <SetupScreen teams={teams} setTeams={setTeams} goalScore={goalScore} setGoalScore={setGoalScore} roundTime={roundTime} setRoundTime={setRoundTime} startGame={startGame} />;
      case "vs":
        return <VersusScreen teams={teams} />;
      case "category":
        return <CategorySelection selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} setGameState={setGameState} />;
      case "playing":
        return <GamePlay selectedCategories={selectedCategories} roundTime={roundTime} setGameState={setGameState} />;
      case "score":
        return <ScoreUpdate teams={teams} updateScore={updateScore} setGameState={setGameState} />;
      case "winner":
        return <WinnerScreen teams={teams} currentTeam={currentTeam} setGameState={setGameState} rematch={rematch} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-4 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-all duration-300">
          {renderGameState()}
        </div>
      </div>
    </div>
  );
};

export default App;