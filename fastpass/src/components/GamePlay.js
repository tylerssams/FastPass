import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import { CATEGORIES } from '../constants';

const GamePlay = ({ selectedCategories, roundTime, setGameState }) => {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [timeLeft, setTimeLeft] = useState(roundTime);

  const getRandomPrompt = useCallback(() => {
    if (selectedCategories.length === 0) return "";
    const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const prompts = CATEGORIES[randomCategory];
    return prompts[Math.floor(Math.random() * prompts.length)];
  }, [selectedCategories]);

  useEffect(() => {
    setCurrentPrompt(getRandomPrompt());
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameState("score");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [getRandomPrompt, roundTime, setGameState]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-6xl font-bold text-center mb-8">{currentPrompt}</p>
      <Button onClick={() => setCurrentPrompt(getRandomPrompt())}>
        Next Prompt
      </Button>
      <p className="text-2xl mt-4">Time left: {timeLeft}s</p>
    </div>
  );
};

export default GamePlay;