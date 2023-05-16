import { useEffect, useState } from 'react';
import './TicTacToe.css';

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(''));
  const [last, setLast] = useState('X');
  const [winner, setWinner] = useState('');
  const [gameHistory, setGameHistory] = useState([Array(9).fill('')]);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    for (let i = 0; i < winningCombos.length; i++) {
      if (
        !cells[winningCombos[i][0]] ||
        !cells[winningCombos[i][1]] ||
        !cells[winningCombos[i][2]]
      )
        continue;
      if (
        cells[winningCombos[i][0]] === cells[winningCombos[i][1]] &&
        cells[winningCombos[i][0]] === cells[winningCombos[i][2]]
      )
        setWinner(last);
    }
  }, [cells]);

  function updateCell(index) {
    if (winner) return;
    const newCells = [...cells];
    const newLast = last === 'X' ? 'O' : 'X';
    setLast((lastState) => (lastState === 'X' ? 'O' : 'X'));
    newCells[index] = newLast;
    const newGameHistory = [...gameHistory];
    newGameHistory.push([...newCells]);
    setGameHistory(newGameHistory);
    setCells(newCells);
  }
  return (
    <>
      <div className="TicTacToe">
        {cells.map((cell, i) => (
          <Cell key={i} content={cell} index={i} updateCell={updateCell}></Cell>
        ))}
      </div>
      <ol>
        {gameHistory.map((current, i) => (
          <li key={i}>
            <button key={i} onClick={() => setCells(current)}>
              Go to {i === 0 ? 'start' : `move #${i}`}
            </button>
          </li>
        ))}
      </ol>
      <div style={{ color: 'red', marginTop: '2rem' }}>
        {winner.length > 0 ? `${winner} WON!` : ''}
      </div>
    </>
  );
}

function Cell({ content, index, updateCell }) {
  return (
    <span
      className="cell"
      onClick={() => {
        if (!content) updateCell(index);
      }}
    >
      {content}
    </span>
  );
}
