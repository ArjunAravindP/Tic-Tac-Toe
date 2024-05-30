import { useState } from "react"

export default function GameBoard({ onSelectSquare, gameBoard }) {
  // const [gameBoard, setGameBoard] = useState(initialBoard)
  // function handleGameClick(rowIndex, colIndex) {
  //   setGameBoard(prevGameBoard => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol
  //     return updatedBoard
  //   })
  //   onSelectSquare()
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol ? true : false}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}
