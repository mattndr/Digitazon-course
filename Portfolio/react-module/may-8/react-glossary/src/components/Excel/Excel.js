// si richiede di creare un componente che sia la versione estremamente semplificata di una riga di Excel. Si devono creare n input dove n e' una prop, ogni qualvolta un input cambia si deve salvare nello stato:
//  * il numero totale di celle che hanno un valore al loro interno
//  * un array con tutti i valori nelle celle

import { useEffect, useState } from 'react';
import './Excel.css';
export default function Excel() {
  const [numOfCells, setNumOfCells] = useState(3);
  return (
    <div className="Excel">
      <h1>Excel</h1>
      <div>
        {/* <label for="num">Set number of cells </label> */}
        <input
          id="num"
          value={numOfCells}
          onChange={(e) => setNumOfCells(e.target.value)}
        ></input>
      </div>

      <Row numOfCells={numOfCells > 0 ? numOfCells : 1}></Row>
    </div>
  );
}

function Row({ numOfCells }) {
  const [cells, setCells] = useState(Array(numOfCells).fill(''));

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < numOfCells; i++) {
      arr.push('');
    }
    setCells(arr);
  }, [numOfCells]);

  function updateCell(index, value) {
    const newCells = [...cells];
    newCells[index] = value;
    setCells(newCells);
  }

  return (
    <div className="row">
      <div className="cells">
        {cells.map((el, i) => (
          <input
            key={i}
            value={el}
            onChange={(e) => {
              console.log('ok');
              updateCell(i, e.target.value);
            }}
          ></input>
        ))}
      </div>
      <div>Non-empty cells: {cells.filter((el) => el !== '').length}</div>
      <div>Cells contents: {cells.filter((el) => el !== '').toString()}</div>
    </div>
  );
}
