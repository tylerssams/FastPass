import React from 'react';
import Button from './Button';

const WinnerScreen = ({ teams, currentTeam, setGameState, rematch }) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
        {teams[currentTeam].name} Wins!
      </h1>
      <div className="space-x-4">
        <Button onClick={() => setGameState("start")} variant="default">
          New Game
        </Button>
        <Button onClick={rematch} variant="success">
          Rematch
        </Button>
      </div>
    </div>
  );
};

export default WinnerScreen;