import { useEffect, useState } from 'react';
import axios from 'axios';

// server di Fil
const URL =
  'https://2ee5-37-162-3-248.ngrok-free.app/digitazon/2023/02/group/2/students';
const KEY = '0876';

export function Students() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(URL, {
          headers: { key: KEY, 'ngrok-skip-browser-warning': true },
        });
        setStudents(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <ul>
      {students.map((s) => (
        <li>{s.name}</li>
      ))}
    </ul>
  );
}
