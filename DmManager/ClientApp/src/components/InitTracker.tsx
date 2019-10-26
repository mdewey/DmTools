import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
  const getLatest = async () => {
    const resp = await axios.get(`/api/game/${currentGameId}/players`)
    setPlayers(resp.data)
  }

  const updatePlayerInit = (newValue: string, playerId: number) => {
    console.log({ newValue })

    setPlayers(prev => {
      const player = prev.filter(f => f.id === playerId)[0]
      player.currentInitiative = parseInt(newValue) || 0
      return [...prev]
    })
  }

  useEffect(() => {
    getLatest()
  }, [currentGameId])

  return (
    <div>
      <header>players</header>
      <ul>
        {players.map(player => {
          return (
            <li key={player.id.toString()} className="">
              <span>
                <input
                  placeholder="init"
                  value={player.currentInitiative || 0}
                  // onBlur={e => this.savePlayerInit(e, player.id)}
                  onChange={e => updatePlayerInit(e.target.value, player.id)}
                  type="text"
                  className="init-input"
                />
              </span>
              <span className="player-name">{player.name}</span>

              <span>
                <button
                  className="btn btn-link"
                  // onClick={() => this.deletePlayer(player.id)}
                >
                  delete
                </button>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InitTracker
