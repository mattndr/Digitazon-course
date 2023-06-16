import { useEffect, useState } from 'react';
import { Errors } from './Errors';

export function Students() {
  const [students, setStudents] = useState([]);
  const [httpError, setHttpError] = useState('');
  const URL = 'http://localhost:3000/digitazon/2023/02/group/4/students';

  useEffect(() => {
    (async function getData() {
      try {
        const response = await fetch(URL, {
          headers: { key: '0020' },
        });
        if (!response.ok) {
          throw Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (httpError) setHttpError('');
        setStudents(data);
      } catch (error) {
        setHttpError(error.toString());
      }
    })();
  }, []);

  return (
    <>
      <h2 className="font-bold text-xl mt-10">Students</h2>
      <h3 className="mt-4">Group 4</h3>

      <ul className="flex flex-col mt-4 gap-2">
        {students.map((s, i) => (
          <li key={i} className="flex justify-center gap-1">
            <span>{s.name}</span>
            <span>{s.lastname}</span>
          </li>
        ))}
      </ul>
      {httpError ? <Errors error={httpError}></Errors> : null}
    </>
  );
}
