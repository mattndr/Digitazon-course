import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Es2() {
  const { id } = useParams();
  console.log(id);
  return <h2>Es 2</h2>;
}

function AsyncCall({ url, func }) {
  useEffect(() => {
    (async function get() {
      const res = await fetch(url);
      const data = await res.json();
    })();
  }, []);
}
