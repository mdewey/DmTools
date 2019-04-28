import React, { Component } from 'react'
import './style.css'
class RoundCounter extends Component {
  state = {
    currentRound: 0
  }
  render() {
    return (
      <section className="tool-container round-counter">
        <header>Round Counter</header>
        <h1>{this.state.currentRound}</h1>
        <section className="buttons btn-group">
          <button
            className="btn btn-primary"
            onClick={() =>
              this.setState({ currentRound: this.state.currentRound - 1 })
            }
          >
            back
          </button>
          <button
            className="btn btn-warning"
            onClick={() => this.setState({ currentRound: 0 })}
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              this.setState({ currentRound: this.state.currentRound + 1 })
            }
          >
            Next Round
          </button>
        </section>
      </section>
    )
  }
}

export default RoundCounter
