import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Button from './Button';

const SetupScreen = ({ teams, setTeams, goalScore, setGoalScore, roundTime, setRoundTime, startGame }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Game Setup
      </h1>
      {teams.map((team, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <Input
            className="flex-grow rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 border-gray-300 dark:border-gray-600"
            value={team.name}
            onChange={(e) => {
              const newTeams = [...teams];
              newTeams[index].name = e.target.value;
              setTeams(newTeams);
            }}
            placeholder={`Team ${index + 1} Name`}
          />
          <Input
            type="color"
            className="w-14 h-14 p-1 rounded-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            value={team.color}
            onChange={(e) => {
              const newTeams = [...teams];
              newTeams[index].color = e.target.value;
              setTeams(newTeams);
            }}
          />
        </div>
      ))}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Goal Score: {goalScore}
        </label>
        <Select
          value={goalScore.toString()}
          onValueChange={(value) => setGoalScore(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select goal score" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((score) => (
              <SelectItem key={score} value={score.toString()}>
                {score}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800 dark:text-white">
          Round Time: {roundTime} seconds
        </label>
        <Select
          value={roundTime.toString()}
          onValueChange={(value) => setRoundTime(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select round time" />
          </SelectTrigger>
          <SelectContent>
            {[5, 30, 60, 90, 120].map((time) => (
              <SelectItem key={time} value={time.toString()}>
                {time} seconds
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
};

export default SetupScreen;