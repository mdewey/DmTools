import React, { Component } from "react";

export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<div>
				<ul>
					<li>Map of the island page</li>
					<li>list of all the points, with a status and quick summary</li>
					<li>each point can be edited</li>
					<li>each point has a status</li>
					<li>random encounters</li>
					<li>notes everywhere</li>
					<li>day and hour count</li>
				</ul>
			</div>
		);
	}
}
