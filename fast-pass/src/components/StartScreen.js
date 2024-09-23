import React from "react";
import Button from "./Button";

const StartScreen = ({ setGameState }) => {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Welcome to FastPass
      </h1>
      <Button
        onClick={() => setGameState("setup")}
        className="w-full text-xl py-4"
      >
        Start New Game
      </Button>
    </div>
  );
};

export default StartScreen;