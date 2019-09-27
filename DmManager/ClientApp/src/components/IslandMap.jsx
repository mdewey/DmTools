import React from "react";
import map from "../images/serpents_skull.PNG";
const IslandMap = () => {
	return (
		<section class="map">
			<section>
				<img src={map} alt="Map of the Island" />
			</section>
			<section>
				<header>legend goes here</header>
				<ul>
					<li>A: Shipwrecked beach</li>
					<li>B: Jeinerve wreck</li>
					<li>B: Jeinerve wreck</li>
					<li>B: Jeinerve wreck</li>
					<li>B: Jeinerve wreck</li>
				</ul>
			</section>
		</section>
	);
};

export default IslandMap;
