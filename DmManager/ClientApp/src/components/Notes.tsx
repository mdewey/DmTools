import React, { useEffect } from "react";

type Notes = {
  gameId: number;
};

const Notes = ({ gameId }: Notes) => {
  useEffect(() => {
    console.log("updating notes for the game id " + gameId);
  }, [gameId]);

  return <div>Notes goes here!!!! for game id {gameId}</div>;
};

export default Notes;
