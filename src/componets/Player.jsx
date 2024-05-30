import { useState } from "react"

export default function Player({ name, symbol, isActive, handlePlayerChange }) {
  const [playerName, setPlayerName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)
  function handleEditClick() {
    setIsEditing(editing => !editing)
    {
      isEditing && handlePlayerChange(symbol, playerName)
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value)
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="palyer">
          {!isEditing && <span className="player-name">{playerName}</span>}
          {isEditing && (
            <span>
              <input className="player-name" type="text" required value={playerName} onChange={handleChange} />
            </span>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  )
}
