import React, { useEffect, useState } from "react";

const SelectGame = props => {
	const [games, setGames] = useState([]);
	const selectGame = e => {
		console.log("updating to ", e.target.value);
	};

	const getGames = async () => {
		const resp = await (await fetch("/api/games")).json();
		console.log({ resp });
		setGames(resp);
	};

	useEffect(() => {
		getGames();
	}, []);
	return (
		<div>
			<select onChange={selectGame}>
				<option selected>select a game</option>
				{games.map(game => {
					return (
						<option key={game.id} value={game.id}>
							{game.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default SelectGame;
