import React, { Component } from "react";
import InitTracker from "./InitTracker/index";
import RoundCounter from "./RoundCounter";
import Notes from "./Notes";
import "./home.css";

export class Home extends Component {
	render() {
		return (
			<div className="main">
				<InitTracker className="col" />
				<RoundCounter className="col" />
				<Notes className="col" />
			</div>
		);
	}
}
