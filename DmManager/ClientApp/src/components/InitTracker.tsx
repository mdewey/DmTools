import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { async } from 'q'

interface IInitTracker {
  currentGameId: number
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
  const [newPlayer, setNewPlayer] = useState<string>('')

  const getLatest = async () => {
    const resp = await axios.get(`/api/game/${currentGameId}/players`)
    setPlayers(getSortedPlayers(resp.data))
  }

  const updatePlayerInit = (newValue: string, playerId: number) => {
    setPlayers(prev => {
      const player = prev.filter(f => f.id === playerId)[0]
      player.currentInitiative = parseInt(newValue) || 0
      return getSortedPlayers(prev)
    })
  }

  const updatePlayerOnServer = async (player: Player) => {
    await axios.put(`/api/game/${currentGameId}/players/${player.id}`, player)
  }

  const addPlayerToGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ newPlayer })
    const data = newPlayer.split(',')
    const player: Player = {
      currentInitiative: parseInt(data[1]) || 0,
      name: data[0],
      id: 0,
      gameId: -1
    }
    const resp = await axios.post(`/api/game/${currentGameId}/players`, player)
    const createdPlayer = resp.data as Player
    setPlayers(prev => getSortedPlayers([...prev, createdPlayer]))
    setNewPlayer('')
  }

  const deletePlayer = async (playerId: number) => {
    if (playerId) {
      await axios.delete(`/api/game/${currentGameId}/players/${playerId}`)
      setPlayers(prev => prev.filter(f => f.id !== playerId))
    }
  }

  const getSortedPlayers = (players: Array<Player>): Array<Player> => {
    return [
      ...players.sort((a, b) => {
        if (!a.currentInitiative) {
          return 1
        } else if (!b.currentInitiative) {
          return -1
        } else {
          if (a.currentInitiative > b.currentInitiative) {
            return -1
          } else if (a.currentInitiative < b.currentInitiative) {
            return 1
          } else {
            return 0
          }
        }
      })
    ]
  }

  const sortPlayers = async () => {
    setPlayers(prev => getSortedPlayers(prev))
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
      <button onClick={sortPlayers}>sort</button>
      <form onSubmit={e => addPlayerToGame(e)}>
        <input
          placeholder="Add new player"
          onChange={e => setNewPlayer(e.target.value)}
          value={newPlayer}
        />
        <button className="btn btn-link uppercase add-person-btn">add</button>
      </form>
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
                    onClick={() => deletePlayer(player.id)}
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
