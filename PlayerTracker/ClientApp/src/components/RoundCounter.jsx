import React, { Component } from "react";

class RoundCounter extends Component {
	state = {
		currentRound: 0
	};
	render() {
		return (
			<div>
				<h1>{this.state.currentRound}</h1>
				<button
					onClick={() =>
						this.setState({ currentRound: this.state.currentRound + 1 })
					}
				>
					Next Round
				</button>
				<button
					onClick={() =>
						this.setState({ currentRound: this.state.currentRound + 1 })
					}
				>
					go back a Round
				</button>
			</div>
		);
	}
}

export default RoundCounter;
