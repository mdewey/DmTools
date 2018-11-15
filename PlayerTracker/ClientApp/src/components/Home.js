import React, { Component } from 'react';
import axios from 'axios';


export class Home extends Component {

  state = {
    newPlayerName: "",
    players: []
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers = () => {
    axios
      .get("/api/players")
      .then(json => {
        this.setState({
          players: json.data
        })
      })
  }

  handleNewPlayerNameChange = (e) => {
    this.setState({
      newPlayerName: e.target.value
    })
  }

  addPlayerToGame = (e) => {
    e.preventDefault();
    axios
      .post("/api/players", { playerName: this.state.newPlayerName })
      .then(json => {
        console.log({ json });
        this.setState({
          players: this.state.players.concat(json.data)
        })
      })
  }

  deletePlayer = (playerId) => {
    axios
      .delete("/api/players/" + playerId)
      .then(json => {
        this.setState({
          players: this.state.players.filter(player => player.id !== playerId)
        })
      })
  }

  updatePlayerInit = (e, playerId) => {
    const index = this.state.players.findIndex(f => f.id === playerId);
    const player = this.state.players[index];
    const players = [...this.state.players];
    player.lastInitiative = parseInt(e.target.value, 10);
    players[index] = player;
    this.setState({ players });
  }

  savePlayerInit = (e, playerId) => {
    axios
      .post(`/api/players/${playerId}/initiative/${e.target.value}`)
  }

  sortPlayers = () => {
    const players = [...this.state.players].sort((a, b) => {
      if (a.lastInitiative > b.lastInitiative) {
        return -1
      } else if (a.lastInitiative < b.lastInitiative) {
        return 1;
      }
      else {
        return 0;
      }
    });
    console.log(players)
    this.setState({ players })

  }

  render() {
    return (
      <div>
        <h1>Init Tracker</h1>
        <section>
          <button onClick={this.sortPlayers}>sort</button>
          <form onSubmit={this.addPlayerToGame}>
            <input placeholder="Add new player" onChange={this.handleNewPlayerNameChange} />
            <button>Add player</button>
          </form>
        </section>
        <section>
          <ul>
            {this.state.players.map(player => {
              return <li key={player.id} className="">
                <span>{player.playerName}</span>
                <span>
                  <input
                    placeholder="init"
                    value={player.lastInitiative}
                    onBlur={(e) => this.savePlayerInit(e, player.id)}
                    onChange={(e) => this.updatePlayerInit(e, player.id)}
                    type="number"
                    className="init-input" />
                </span>
                <span><button onClick={() => this.deletePlayer(player.id)}>remove</button></span>
              </li>
            })}
          </ul>
        </section>
      </div>
    );
  }
}
