import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';
import { Switch } from './components/ui/switch';
import { Slider } from './components/ui/slider';
import { Sun, Moon } from 'lucide-react';

const CATEGORIES = {
  'Movies': ['The Godfather', 'Star Wars', 'Pulp Fiction', 'Titanic', 'Avatar'],
  'Music': ['The Beatles', 'Michael Jackson', 'Queen', 'Madonna', 'Beyoncé'],
  'Pop Culture': ['Instagram', 'TikTok', 'Kardashians', 'Memes', 'Viral Challenges'],
  'History': ['World War II', 'Ancient Egypt', 'Industrial Revolution', 'French Revolution', 'American Civil War'],
  'Geography': ['Amazon Rainforest', 'Mount Everest', 'Great Barrier Reef', 'Sahara Desert', 'Niagara Falls'],
  'Books': ['Harry Potter', '1984', 'To Kill a Mockingbird', 'The Great Gatsby', 'Pride and Prejudice'],
  'Video Games': ['Mario', 'Minecraft', 'Fortnite', 'The Legend of Zelda', 'Grand Theft Auto'],
  'Sports': ['Soccer', 'Basketball', 'Tennis', 'Olympics', 'Super Bowl'],
  'Science': ['Albert Einstein', 'DNA', 'Black Holes', 'Climate Change', 'Quantum Physics'],
  'Food & Drink': ['Pizza', 'Sushi', 'Coffee', 'Chocolate', 'Avocado Toast']
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [teams, setTeams] = useState([
    { name: 'Team 1', color: '#3b82f6', score: 0 },
    { name: 'Team 2', color: '#ef4444', score: 0 }
  ]);
  const [goalScore, setGoalScore] = useState(50);
  const [roundTime, setRoundTime] = useState(60);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const startGame = () => {
    if (teams[0].name.trim() === '' || teams[1].name.trim() === '') {
      alert("Please enter names for both teams.");
      return;
    }
    setGameState('vs');
    setTimeout(() => setGameState('category'), 3000);
  };

  const getRandomPrompt = useCallback(() => {
    if (selectedCategories.length === 0) return '';
    const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const prompts = CATEGORIES[randomCategory];
    return prompts[Math.floor(Math.random() * prompts.length)];
  }, [selectedCategories]);

  const startRound = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    setGameState('playing');
    setTimeLeft(roundTime);
    setCurrentPrompt(getRandomPrompt());
  };

  const endRound = useCallback(() => {
    setGameState('score');
  }, []);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => {
          if (time === 1) {
            clearInterval(timer);
            endRound();
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, endRound]);

  const updateScore = (teamIndex, change) => {
    const newTeams = [...teams];
    newTeams[teamIndex].score += change;
    setTeams(newTeams);
    
    if (newTeams[teamIndex].score >= goalScore) {
      setGameState('winner');
      setCurrentTeam(teamIndex);
    }
  };

  const renderLogo = () => (
    <div className="text-4xl font-bold text-center mb-8">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">Fast</span>
      <span className="text-white dark:text-gray-200">Pass</span>
    </div>
  );

  const renderGame = () => {
    switch (gameState) {
      case 'start':
        return (
          <div className="space-y-8 text-center">
            {renderLogo()}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to FastPass</h1>
            <Button onClick={() => setGameState('setup')} className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white text-xl py-4 rounded-full transition-all duration-300 transform hover:scale-105">
              Start New Game
            </Button>
            <div className="flex items-center justify-center space-x-2">
              <Sun className="h-6 w-6 text-yellow-400" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="h-6 w-6 text-blue-300" />
            </div>
          </div>
        );
      case 'setup':
        return (
          <div className="space-y-6">
            {renderLogo()}
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Game Setup</h1>
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
              <label className="block text-sm font-medium text-gray-800 dark:text-white">Goal Score: {goalScore}</label>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[goalScore]}
                onValueChange={(value) => setGoalScore(value[0])}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800 dark:text-white">Round Time: {roundTime} seconds</label>
              <Slider
                min={30}
                max={120}
                step={30}
                value={[roundTime]}
                onValueChange={(value) => setRoundTime(value[0])}
                className="w-full"
              />
            </div>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-105">Start Game</Button>
          </div>
        );
      case 'vs':
        return (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-red-500 text-white p-4 rounded-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-center">
              <span style={{color: teams[0].color}}>{teams[0].name}</span>
              <br className="md:hidden" />
              <span className="mx-4">vs</span>
              <br className="md:hidden" />
              <span style={{color: teams[1].color}}>{teams[1].name}</span>
            </h1>
          </div>
        );
      case 'category':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Select Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(CATEGORIES).map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategories(prev => 
                    prev.includes(category) 
                      ? prev.filter(c => c !== category) 
                      : [...prev, category]
                  )}
                  variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                  className={`w-full rounded-full ${selectedCategories.includes(category) ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white' : 'border-2 border-blue-500 text-blue-500'}`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button onClick={startRound} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105">Start Round</Button>
          </div>
        );
      case 'playing':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Current Prompt:</h2>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">{currentPrompt}</p>
            <p className="text-2xl text-gray-800 dark:text-white">Time Left: {timeLeft}</p>
            <Button 
              onClick={() => setCurrentPrompt(getRandomPrompt())}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-xl py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Next Prompt
            </Button>
          </div>
        );
      case 'score':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Update Scores</h2>
            {teams.map((team, index) => (
              <div key={index} className="flex items-center justify-between bg-opacity-20 rounded-full p-4" style={{backgroundColor: team.color}}>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{team.name}</h3>
                <div className="flex items-center space-x-4">
                  <Button onClick={() => updateScore(index, -1)} className="rounded-full bg-red-500 hover:bg-red-600 text-white">-</Button>
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{team.score}</span>
                  <Button onClick={() => updateScore(index, 1)} className="rounded-full bg-green-500 hover:bg-green-600 text-white">+</Button>
                </div>
              </div>
            ))}
            <Button onClick={() => setGameState('category')} className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-105">Next Round</Button>
          </div>
        );
      case 'winner':
        return (
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              {teams[currentTeam].name} Wins!
            </h1>
            <div className="space-x-4">
              <Button onClick={() => setGameState('start')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full transition-all duration-300 transform hover:scale-105">New Game</Button>
              <Button onClick={() => {
                setTeams(teams.map(team => ({ ...team, score: 0 })));
                setGameState('vs');
              }} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105">
                Rematch
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-all duration-300">
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

export default App;