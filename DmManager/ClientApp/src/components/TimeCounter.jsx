import React, { useState, useEffect } from "react";
import axios from "axios";

const TimeCounter = props => {
	const [displayTime, setDisplayTime] = useState("....");
	const [hours, setHours] = useState(0);

	const getLatest = async () => {
		if (props.currentGameId) {
			const resp = await axios.get(`/api/game/${props.currentGameId}/hours`);
			setHours(resp.data.time);
		}
	};

	useEffect(() => {
		getLatest();
	}, [props]);

	const updateHours = time => setHours(t => t + time);
	useEffect(() => {
		const d = Math.floor(hours / 24);
		console.log({ hours, d });
		const h = hours - d * 24;
		setDisplayTime(`${d} Days, ${h} hours`);
	}, [hours]);
	return (
		<section>
			<header>{displayTime} time on the island</header>
			<header>{hours} time on the island</header>
			<main>
				<p>add hours</p>
				<button onClick={() => updateHours(1)}>+1</button>
				<button onClick={() => updateHours(4)}>+4</button>
				<button onClick={() => updateHours(8)}>+8</button>
				<button onClick={() => updateHours(12)}>+12</button>
				<button onClick={() => updateHours(24)}>+24</button>
			</main>
		</section>
	);
};

export default TimeCounter;
