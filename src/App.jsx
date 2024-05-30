import Player from "./componets/Player"
import GameBoard from "./componets/GameBoard"
import { useState } from "react"
import Log from "./componets/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./componets/GameOver"
const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function findActivePlayer(gameTurn) {
  let activePlayer = "X"
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    activePlayer = "O"
  }
  return activePlayer
}
function deriveWinner(gameBoard, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare]
    }
  }
  return winner
}

function buildGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
  for (const turn of gameTurn) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}
function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([])
  const activePlayer = findActivePlayer(gameTurn)
  const gameBoard = buildGameBoard(gameTurn)
  const winner = deriveWinner(gameBoard, players)
  const isdraw = gameTurn.length === 9 && !winner

  function handleSelectedSqure(rowIndex, colIndex) {
    setGameTurn(prevTurn => {
      let currentPlayer = findActivePlayer(prevTurn)
      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn]
      return updatedTurn
    })
  }
  function handleRematch() {
    setGameTurn([])
  }
  function handlePlayerChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return { ...prevPlayers, [symbol]: newName }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} handlePlayerChange={handlePlayerChange} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} handlePlayerChange={handlePlayerChange} />
        </ol>
        {(winner || isdraw) && <GameOver handleRematch={handleRematch} winner={winner} />}
        <GameBoard onSelectSquare={handleSelectedSqure} gameBoard={gameBoard} />
      </div>

      <Log turns={gameTurn} />
    </main>
  )
}

export default App
