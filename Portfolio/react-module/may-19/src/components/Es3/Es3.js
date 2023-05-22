// Scrivere un componente che rappresenta un input e la sua label.
// Il componente puo' essere configurato in modo che:
// la label appaia alla sinistra dell'input o alla sua destra, in base alla prop "posizione" che puo' essere "l" o "r"
// con una funzione, passata come prop, sia possibile inibire l'inserimento di certi caratteri, specificati appunto dalla funzione stessa

import { useState } from 'react';

export default function Es3({
  position = 'l',
  removeChars = (val) => {
    'abci'.split('').forEach((forbiddenChar) => {
      val = val.replace(forbiddenChar, '');
    });
    return val;
  },
}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h1 className="mt-20 font-bold">Es3</h1>
      <div className="flex gap-2 justify-center">
        <label
          className={position === 'r' ? 'order-last' : 'order-first'}
          htmlFor="myInput"
        >
          Label
        </label>
        <input
          className="border-2"
          id="myInput"
          value={inputValue}
          onChange={(e) => setInputValue(removeChars(e.target.value))}
        ></input>
      </div>
    </div>
  );
}
