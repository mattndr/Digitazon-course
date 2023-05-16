// Secondo esercizio: Scrivere una applicazione che si avvicini piu' possibile al concetto di "ruota della fortuna", quindi deve esserci una "ruota" (che puo' anche non avere l'aspetto di una ruota, basta che si vedano diversi valori selezionati di volta in volta... per arrivare ad uno solo finale), e deve esserci uno storico dei valori usciti.

import { useEffect, useState } from 'react';
import './WheelOfFortune.css';

export default function WheelOfFortune() {
  const cells = [
    { color: 'red', selected: false },
    { color: 'orange', selected: false },
    { color: 'yellow', selected: false },
    { color: 'green', selected: false },
    { color: 'lightblue', selected: false },
    { color: 'blue', selected: false },
    { color: 'purple', selected: false },
    { color: 'pink', selected: false },
  ];

  const [wheel, setWheel] = useState(cells);
  const [index, setIndex] = useState(0);
  const [wheelStarted, setWheelStarted] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!wheelStarted) return;
    let steps = Math.floor(Math.random() * 8 + 9);
    console.log(steps);
    let currentIndex = 0;
    update();
    let interval = setInterval(update, 300);

    function update() {
      const newCells = [...cells];
      newCells[currentIndex].selected = true;
      if (newCells[currentIndex - 1])
        newCells[currentIndex - 1].selected = false;
      if (currentIndex === 0) newCells[newCells.length - 1].selected = false;
      setWheel(newCells);
      setIndex(currentIndex);
      steps -= 1;
      if (steps === 0) {
        setWheelStarted(false);
        clearInterval(interval);
        const newHistory = [...history];
        newHistory.push(wheel[currentIndex].color);
        setHistory(newHistory);
        return;
      }
      currentIndex = (currentIndex + 1) % 8;
    }
  }, [wheelStarted]);

  return (
    <span className="wheel">
      <h2>Wheel Of Fortune</h2>
      <div className="content">
        <div className="history">
          <h3>History</h3>
          {history.map((current, i) => (
            <div key={i}>{current}</div>
          ))}
        </div>
        <div className="spin">
          <button onClick={() => setWheelStarted(!wheelStarted)}>Start</button>
          <div>
            {wheel.map((current, i) => (
              <Cell key={i} prop={current} />
            ))}
          </div>
          <div>
            {history.length > 0 || wheelStarted ? wheel[index].color : ''}
          </div>
        </div>
      </div>
    </span>
  );
}

function Cell({ prop }) {
  return (
    <div
      style={{ backgroundColor: prop.color }}
      className={`cell ${prop.selected ? 'selected' : ''}`}
    ></div>
  );
}
