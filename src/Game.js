import React, { useState } from 'react'
import Board from './Board'

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const historySegment = history.slice(0, stepNumber + 1)
    const current = historySegment[historySegment.length - 1]
    const squares = current.squares.slice()
    console.log(historySegment)
    console.log(current)
    console.log(squares)
    
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(historySegment.concat([{ squares }]))
    setStepNumber(historySegment.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(move) {
      setStepNumber(move)
    setXIsNext(move % 2 === 0)
    console.log(history[stepNumber].squares)
    }
  
  // The following calculations can be removed from the context of render(), enhancing
  // separation of concerns between data handling and DOM manipulation
  
    const winner = calculateWinner(history[stepNumber].squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
    }
  
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            onClick={i => handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game 