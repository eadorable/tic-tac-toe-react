import React, { useState } from 'react';
import './CSS/Game.css';

const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleButtonClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <button onClick={() => handleButtonClick(index)}>
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);

  let status;
  const statusStyle = document.getElementById('status');
  if (winner) {

    status = `Player ${winner} wins!`;
    statusStyle.classList.add('status');

  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="board--container">
      <div id="status" className="div--status">
        {status}
      </div>
      <div id="board" className="div--status--winner">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button id="btn--reset" onClick={() => window.location.reload()}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
