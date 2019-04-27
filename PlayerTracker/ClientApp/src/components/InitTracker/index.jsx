import React, { Component } from "react";
import axios from "axios";
import MaterialIcon, { colorPalette } from "material-icons-react";
import "./style.css";

let loader = (
	<div className="lds-ripple">
		<div />
		<div />
	</div>
);

class InitTracker extends Component {
	updateInterval;

	state = {
		newPlayerName: "",
		players: [],
		status: ""
	};

	componentDidMount() {
		this.getPlayers();
	}

	startPull = () => {
		this.setState({
			status: "waiting for players"
		});
		this.updateInterval = setInterval(() => {
			console.log("getting players");
			this.getPlayers();
		}, 1000);
	};
	stopPull = () => {
		this.setState({ status: "got players" }, () =>
			setTimeout(() => {
				this.setState({ status: "" });
			}, 5000)
		);
		console.log("stopping interval");
		clearInterval(this.updateInterval);
	};

	getPlayers = () => {
		axios.get("/api/players").then(json => {
			this.setState({
				players: json.data
			});
		});
	};

	handleNewPlayerNameChange = e => {
		this.setState({
			newPlayerName: e.target.value
		});
	};

	addPlayerToGame = e => {
		e.preventDefault();
		axios
			.post("/api/players", { playerName: this.state.newPlayerName })
			.then(json => {
				console.log({ json });
				this.setState(
					{
						players: this.state.players.concat(json.data),
						newPlayerName: ""
					},
					() => {}
				);
			});
	};

	deletePlayer = playerId => {
		axios.delete("/api/players/" + playerId).then(json => {
			this.setState({
				players: this.state.players.filter(player => player.id !== playerId)
			});
		});
	};

	updatePlayerInit = (e, playerId) => {
		console.log({ val: e.target.value, playerId });
		const index = this.state.players.findIndex(f => f.id === playerId);
		const player = this.state.players[index];
		const players = [...this.state.players];
		player.lastInitiative = e.target.value;
		players[index] = player;
		this.setState({ players });
	};

	savePlayerInit = (e, playerId) => {
		axios.post(`/api/players/${playerId}/initiative?init=${e.target.value}`);
	};

	sortPlayers = () => {
		const players = [...this.state.players].sort((a, b) => {
			if (a.lastInitiative > b.lastInitiative) {
				return -1;
			} else if (a.lastInitiative < b.lastInitiative) {
				return 1;
			} else {
				return 0;
			}
		});
		console.log(players);
		this.setState({ players });
	};

	render() {
		return (
			<div className="init-tracker">
				<header>Init Tracker</header>
				<main>
					<section>
						<form onSubmit={this.addPlayerToGame}>
							<input
								placeholder="Add new player"
								onChange={this.handleNewPlayerNameChange}
								value={this.state.newPlayerName}
							/>
							<button className="btn btn-link uppercase add-person-btn">
								<MaterialIcon
									icon="person_add"
									size="tiny"
									preloader={loader}
								/>
							</button>
						</form>
						<button
							onClick={this.sortPlayers}
							className="uppercase btn btn-primary sort-button"
						>
							sort
						</button>
						{/* 
				TODO: add back in 
					<button onClick={this.startPull}>gather</button>
					{this.state.status}
					<button onClick={this.stopPull}>stop</button> */}
					</section>
					<section>
						<ul>
							{this.state.players.map(player => {
								return (
									<li key={player.id} className="">
										<span>
											<input
												placeholder="init"
												value={player.lastInitiative}
												onBlur={e => this.savePlayerInit(e, player.id)}
												onChange={e => this.updatePlayerInit(e, player.id)}
												type="text"
												className="init-input"
											/>
										</span>
										<span className="player-name">{player.playerName}</span>

										<span>
											<button
												className="btn btn-link"
												onClick={() => this.deletePlayer(player.id)}
											>
												<MaterialIcon
													icon="remove_circle"
													size="tiny"
													preloader={loader}
												/>
											</button>
										</span>
									</li>
								);
							})}
						</ul>
					</section>
				</main>
			</div>
		);
	}
}

export default InitTracker;
