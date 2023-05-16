// Semplice: scrivere un componente che rappresenti un input text, quando l'input e' vuoto oppure ha dentro solo dei numeri, oppure solo della punteggiatura, deve avere il bordo rosso.
// Quando la pagina carica non deve subito partire dal rosso, ma arrivarci solo dopo che l'utente ha scritto qualcosa.

import { useEffect, useState } from 'react';
import './InputTextCheck.css';

// export default function InputTextCheck() {
//   const [inputValue, setInputValue] = useState('');
//   const [inputClass, setInputClass] = useState('');
//   const punctuation = new Set([',', '.', ';', ':', '-']);

//   function onInputChange(value) {
//     setInputValue(value);
//     if (
//       value.length === 0 ||
//       !/\D/.test(value) ||
//       value.split('').every((current) => punctuation.has(current))
//     ) {
//       setInputClass('red-border');
//     } else setInputClass('');
//   }
//   return (
//     <div className="wrap">
//       <h1>Input Test Check</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => onInputChange(e.target.value)}
//         className={inputClass}
//       ></input>
//     </div>
//   );
// }

export default function InputTextCheck() {
  const [inputValue, setInputValue] = useState('');
  const [inputClass, setInputClass] = useState('');
  const punctuation = new Set([',', '.', ';', ':', '-']);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (
      inputValue.length === 0 ||
      !/\D/.test(inputValue) ||
      inputValue.split('').every((current) => punctuation.has(current))
    ) {
      setInputClass('red-border');
    } else setInputClass('');
  }, [inputValue]);

  return (
    <div className="wrap">
      <h2>Input Test Check</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={inputClass}
      ></input>
    </div>
  );
}
