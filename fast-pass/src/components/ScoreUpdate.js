import React from 'react';
import Button from './Button';

const ScoreUpdate = ({ teams, updateScore, setGameState }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Update Scores
      </h2>
      {teams.map((team, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-opacity-20 rounded-full p-4"
          style={{ backgroundColor: team.color }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {team.name}
          </h3>
          <div className="flex items-center space-x-4">
            <Button onClick={() => updateScore(index, -1)} variant="danger">
              -
            </Button>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {team.score}
            </span>
            <Button onClick={() => updateScore(index, 1)} variant="success">
              +
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={() => setGameState("category")}>Next Round</Button>
    </div>
  );
};

export default ScoreUpdate;