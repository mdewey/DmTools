import React, { useState, useEffect } from "react";
import TimeCounter from "../components/TimeCounter";
import SelectGame from "../components/SelectGame";

const Dashboard = () => {
	const [selectedGameId, setSelectedGameId] = useState(0);
	const [currentGame, setCurrentGame] = useState({});

	const getGame = async () => {
		if (selectedGameId) {
			const game = await (await fetch("/api/games/" + selectedGameId)).json();
			setCurrentGame(game);
		}
	};

	useEffect(() => {
		getGame();
	}, [selectedGameId]);

	return (
		<div>
			<SelectGame updateSelectedGame={setSelectedGameId} />
			<header>player {currentGame.name}</header>
			<TimeCounter currentGameId={selectedGameId} />
		</div>
	);
};

export default Dashboard;
