import { useState, useEffect } from 'react';

export default function HooksBond() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <>
      <h2>Bond between useEffect and useState</h2>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div>{count}</div>
    </>
  );
}
