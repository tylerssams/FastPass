import React from 'react';

const VersusScreen = ({ teams }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-red-500 text-white p-4 rounded-3xl">
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        <span style={{ color: teams[0].color }}>{teams[0].name}</span>
        <br className="md:hidden" />
        <span className="mx-4">vs</span>
        <br className="md:hidden" />
        <span style={{ color: teams[1].color }}>{teams[1].name}</span>
      </h1>
    </div>
  );
};

export default VersusScreen;