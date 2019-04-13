import React, { Component } from "react";
import InitTracker from "./InitTracker";
import RoundCounter from "./RoundCounter";

export class Home extends Component {
	render() {
		return (
			<section>
				<InitTracker />
				<RoundCounter />
			</section>
		);
	}
}
