import React, { useState } from "react";
import TimeCounter from "../components/TimeCounter";
import SelectGame from "../components/SelectGame";

const Dashboard = () => {
	const [currentGame, setCurrentGame] = useState({});
	const [games, setGames] = useState([]);

	return (
		<div>
			<SelectGame />
			<TimeCounter />
		</div>
	);
};

export default Dashboard;
