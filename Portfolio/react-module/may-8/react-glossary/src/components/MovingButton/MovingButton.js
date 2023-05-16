// scrivere un pulsante non cliccabile, quando l'utente ci arriva quasi sopra (come potete programmare questo "quasi"?) il pulsante si sposta in un punto random della pagina.

import { useEffect, useState } from 'react';

export default function MovingButton() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [elementWH, setElementWH] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let box = document.getElementById('MovingButton');
    setElementWH({ width: box.offsetWidth, height: box.offsetHeight });
  }, []);

  function changePosition() {
    const newPosition = {
      top: Math.floor(Math.random() * elementWH.height),
      left: Math.floor(Math.random() * elementWH.width),
    };
    setPosition(newPosition);
  }
  return (
    <div id="MovingButton" style={{ height: '80%', width: '100%' }}>
      <button
        style={{
          position: 'sticky',
          top: position.top + 'px',
          left: position.left + 'px',
        }}
        onMouseOver={() => changePosition()}
      >
        Try to catch me
      </button>
    </div>
  );
}
