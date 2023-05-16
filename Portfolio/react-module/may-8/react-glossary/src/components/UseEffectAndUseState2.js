import { useState, useEffect } from 'react';

export default function HooksBond2() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [bothHaveValue, setBothHaveValue] = useState('false');

  useEffect(() => {
    setBothHaveValue(input1 && input2 ? 'true' : 'false');
  }, [input1, input2]);

  return (
    <>
      <h2>useEffect and useState</h2>
      <input value={input1} onChange={(e) => setInput1(e.target.value)}></input>
      <input value={input2} onChange={(e) => setInput2(e.target.value)}></input>
      <div>{bothHaveValue}</div>
    </>
  );
}
