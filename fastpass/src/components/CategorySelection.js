import React from 'react';
import Button from './Button';
import { CATEGORIES } from '../constants';

const CategorySelection = ({ selectedCategories, setSelectedCategories, setGameState }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Select Categories
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(CATEGORIES).map((category) => (
          <Button
            key={category}
            onClick={() =>
              setSelectedCategories((prev) =>
                prev.includes(category)
                  ? prev.filter((c) => c !== category)
                  : [...prev, category]
              )
            }
            variant={selectedCategories.includes(category) ? "default" : "outline"}
          >
            {category}
          </Button>
        ))}
      </div>
      <Button onClick={() => setGameState("playing")} variant="success">
        Start Round
      </Button>
    </div>
  );
};

export default CategorySelection;