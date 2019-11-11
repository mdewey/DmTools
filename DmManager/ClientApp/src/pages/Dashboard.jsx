import React, { useState, useEffect } from 'react';
import TimeCounter from '../components/TimeCounter';
import SelectGame from '../components/SelectGame';
import InitTracker from '../components/InitTracker';
import Notes from '../components/Notes';

const Dashboard = () => {
  const [selectedGameId, setSelectedGameId] = useState(0);
  const [currentGame, setCurrentGame] = useState({});

  const getGame = async () => {
    if (selectedGameId) {
      const game = await (await fetch('/api/games/' + selectedGameId)).json();
      setCurrentGame(game);
    }
  };

  useEffect(() => {
    getGame();
  }, [selectedGameId]);

  return (
    <div>
      <SelectGame updateSelectedGame={setSelectedGameId} />
      {selectedGameId ? (
        <>
          <h1>Playing: {currentGame.name}</h1>
          <TimeCounter currentGameId={selectedGameId} />
          <InitTracker currentGameId={selectedGameId} />
          <Notes gameId={selectedGameId} />
        </>
      ) : (
        <p>waiting, sweet heart</p>
      )}
    </div>
  );
};

export default Dashboard;
