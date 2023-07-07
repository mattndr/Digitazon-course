import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CourseCreation from './courses/CourseCreation.component';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const userId = localStorage.getItem('userId');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    userId &&
      (async function getDashboard() {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/dashboard`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          let data = (await response.json()).data;
          data = { ...dashboardData, ...data };
          console.log(data);

          setDashboardData(data);
        } else {
          setErrorMsg((await response.json()).message);
        }
      })();
  }, []);

  if (!userId) {
    return <Navigate replace to="/auth/login" />;
  }

  return (
    <div className="flex flex-col gap-8 bg-gray-50 px-[10%]">
      <h2 className="mt-12 text-2xl">Dashboard</h2>
      {errorMsg && <div>{errorMsg}</div>}
      {dashboardData && (
        <>
          <div>
            <h3>Corsi a cui sei iscritto</h3>
          </div>
          <div>
            {dashboardData['isSeller'] && (
              <>
                <h3>I tuoi corsi</h3>
                <PopupCourse></PopupCourse>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function PopupCourse() {
  return (
    <div>
      <Popup
        trigger={
          <button className="p-2 mt-4 bg-cyan-400 rounded-lg hover:bg-cyan-500">
            Crea un corso
          </button>
        }
        modal
        nested
      >
        <CourseCreation></CourseCreation>
      </Popup>
    </div>
  );
}
