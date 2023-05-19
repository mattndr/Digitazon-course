// Semplice: scrivere un componente che data una frase inserita dall'utente in un input text la stampi come lista puntata sotto di esso.

import { useState } from 'react';

export default function Es1() {
  const [phrase, setPhrase] = useState('');
  let temp = phrase.split(' ');
  console.log(new Date());
  return (
    <>
      <h1 className="font-bold mb-4">Es 1</h1>
      <input
        name="phrase"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        placeholder="Insert a phrase"
        className="border-2"
      ></input>
      {phrase && (
        <>
          <h2 className="mt-8 font-bold">Result</h2>
          <ol className="mt-4 flex gap-2 flex-col">
            {phrase.split(' ').map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ol>
          {temp}
        </>
      )}
    </>
  );
}
