import React, { useEffect, useState } from 'react'
import axios from 'axios'

// TODO: ADD
// TODO: SORT
// TODO: DELETE

interface IInitTracker {
  currentGameId: Number
}

interface Player {
  id: number
  name: string
  currentInitiative: number | null
  gameId: number
}

const InitTracker = ({ currentGameId }: IInitTracker) => {
  const [players, setPlayers] = useState<Array<Player>>([])
  const [updatedPlayer, setUpdatedPlayer] = useState<Player | null>(null)

  const getLatest = async () => {
    const resp = await axios.get(`/api/game/${currentGameId}/players`)
    setPlayers(resp.data)
  }

  const updatePlayerInit = (newValue: string, playerId: number) => {
    setPlayers(prev => {
      const player = prev.filter(f => f.id === playerId)[0]
      player.currentInitiative = parseInt(newValue) || 0
      return [...prev]
    })
  }

  const updatePlayerOnServer = async (player: Player) => {
    await axios.put(`/api/game/${currentGameId}/players/${player.id}`, player)
  }

  useEffect(() => {
    if (updatedPlayer) {
      updatePlayerOnServer(updatedPlayer)
    }
  }, [updatedPlayer])

  useEffect(() => {
    getLatest()
  }, [currentGameId])

  return (
    <div>
      <header>players</header>
      <form onSubmit={e => e.preventDefault()}>
        <ul>
          {players.map((player, i) => {
            return (
              <li key={player.id.toString()} className="">
                <span>
                  <input
                    placeholder="init"
                    value={player.currentInitiative || ''}
                    onBlur={e => setUpdatedPlayer(player)}
                    onChange={e => updatePlayerInit(e.target.value, player.id)}
                    type="text"
                    className="init-input"
                    tabIndex={i + 1}
                  />
                </span>
                <span className="player-name">{player.name}</span>

                <span>
                  <button
                    className="btn btn-link"
                    // onClick={() => this.deletePlayer(player.id)}
                    tabIndex={-1}
                  >
                    delete
                  </button>
                </span>
              </li>
            )
          })}
        </ul>
      </form>
    </div>
  )
}

export default InitTracker
