// Meno semplice: scrivere un componente che mostri il colore relativo ad una stringa RGB: deve essere una input per R, una per G, una per B. Una volta che l'utente ha inserito i tre valori il colore deve apparire in una zona dedicata.

import { useEffect, useState } from 'react';

export default function Es2() {
  const [rgb, setRgb] = useState(Array(3).fill());
  //   const [showColor, setShowColor] = useState(false);
  function handleOnChange(index, value) {
    if (isNaN(value)) return;
    if (value < 0) value = 0;
    if (value > 255) value = 255;
    const newRgb = [...rgb];
    newRgb[index] = value;
    setRgb(newRgb);
  }

  //   useEffect(() => {
  //     setShowColor(rgb.every((color) => color !== undefined));
  //   }, [rgb]);
  return (
    <>
      <h1 className="mt-20 font-bold">Es2</h1>
      <div className="flex gap-2 mt-4 justify-center">
        {rgb.map((color, i) => (
          <input
            className="w-20 border-2"
            value={rgb[i]}
            onChange={(e) => handleOnChange(i, e.target.value)}
          />
        ))}
      </div>
      {rgb.every((color) => color !== undefined) && (
        <div
          className={`m-8 p-8 bg-[rgb(${rgb[0]},${rgb[1]},${rgb[2]})]`}
        ></div>
      )}
    </>
  );
}
