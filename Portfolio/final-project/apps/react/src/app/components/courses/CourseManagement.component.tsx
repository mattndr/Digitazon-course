import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoursePopup from './CourseUpdatePopup.component';
import TodosUpdatePopup from '../todos/TodosUpdatePopup.component';
import Popup from 'reactjs-popup';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function CourseManagement() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');

  const updateCourseStatus = async (fieldName, value) => {
    const dataToSend = structuredClone(courseData);
    dataToSend[fieldName] = value;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/users/${userId}/courses/${courseId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dataToSend),
        }
      );
      if (response.ok) {
        setCourseData(dataToSend);
        setErrorMsg('');
        setDoneMsg('Operazione effettuata correttamente.');
      } else {
        setErrorMsg(
          response.headers.get('content-type').includes('application/json')
            ? (await response.json()).message
            : `${response.status} ${response.statusText}`
        );
      }
    } catch {
      setErrorMsg(
        errorMsg ? errorMsg + ' ' : 'Server momentaneamente non raggiungibile.'
      );
    }
  };

  useEffect(() => {
    if (!userId) navigate('/auth/login');
    (async function getData() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/users/${userId}/courses/${courseId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          const course = (await response.json()).data;
          setCourseData(course);
        } else {
          setErrorMsg(
            response.headers.get('content-type').includes('application/json')
              ? (await response.json()).message
              : `${response.status} ${response.statusText}`
          );
        }
      } catch {
        setErrorMsg(
          errorMsg
            ? errorMsg + ' '
            : 'Server momentaneamente non raggiungibile.'
        );
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errorMsg, doneMsg]);

  return (
    <div className="h-full">
      <div
        id="popup-root"
        className="[&_.popup-content]:max-h-[90%] [&_.popup-content]:w-[65%] [&_.popup-content]:overflow-scroll"
      ></div>
      <section className="py-12 mx-[17.5%] h-full">
        <button
          className="p-2 border bg-gray-700 text-white w-fit rounded-lg hover:bg-gray-600 active:bg-gray-500"
          onClick={() => navigate(-1)}
        >
          Torna alla dashboard
        </button>
        <h2 className="mt-4 mb-12 font-bold flex justify-center text-2xl">
          Dettagli del corso
        </h2>
        {errorMsg && (
          <ErrorMsg
            message={errorMsg}
            customClasses="mx-auto w-[50%]"
          ></ErrorMsg>
        )}
        {doneMsg && (
          <DoneMsg
            message={doneMsg}
            setPropFunction={setDoneMsg}
            customClasses="mb-10 mx-[10%]"
          ></DoneMsg>
        )}
        {Object.keys(courseData).length > 0 && !courseData['deleted'] && (
          <>
            <div>
              {courseData['publicationDatetime'] &&
              !courseData['startingDatetime'] ? (
                <div className="flex justify-center gap-6">
                  <button
                    className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    onClick={() =>
                      updateCourseStatus('publicationDatetime', null)
                    }
                  >
                    Interrompi pubblicazione
                  </button>
                  <button
                    className="py-2 px-6 bg-cyan-400 text-lg rounded-lg hover:bg-cyan-300 active:bg-cyan-200"
                    onClick={() =>
                      updateCourseStatus(
                        'startingDatetime',
                        new Date().toISOString()
                      )
                    }
                  >
                    Avvia il corso
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    onClick={() => navigate(`/courses/${courseId}`)}
                  >
                    Visualizza il corso
                  </button>
                </div>
              ) : (
                <div>
                  {!courseData['startingDatetime'] ? (
                    <div className="flex justify-center items-center gap-6">
                      <PopupButton courseData={courseData}></PopupButton>
                      <button
                        className="py-2 text-lg px-6 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:bg-cyan-200"
                        onClick={() =>
                          updateCourseStatus(
                            'publicationDatetime',
                            new Date().toISOString()
                          )
                        }
                      >
                        Pubblica il corso
                      </button>
                      <button
                        className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => updateCourseStatus('deleted', true)}
                      >
                        Cancella il corso
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      {!courseData['endingDatetime'] && (
                        <button
                          className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                          onClick={() =>
                            updateCourseStatus(
                              'endingDatetime',
                              new Date().toISOString()
                            )
                          }
                        >
                          Termina corso
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className="border-l-8 border-cyan-500 flex flex-col gap-8 mt-12 mb-12 bg-gray-100">
                {courseData && (
                  <ul className="flex flex-col gap-11 py-4 mx-[8%] my-6">
                    <li>
                      <p className="font-bold">Titolo</p>
                      <div className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 w-fit">
                        {courseData['title']}
                      </div>
                    </li>
                    <li>
                      <p className="font-bold">Descrizione</p>
                      <p className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 whitespace-pre-line">
                        {courseData['description']}
                      </p>
                    </li>
                    <li>
                      <p className="font-bold">
                        Link del video di presentazione
                      </p>
                      <a
                        href={courseData['presentationVideoUrl']}
                        target="_blank"
                        rel="noreferrer"
                        className="border-l-4 border-blue-100 block px-4 py-2 mt-3 w-fit bg-white hover:bg-blue-100"
                      >
                        {courseData['presentationVideoUrl']}
                      </a>
                    </li>
                    <li>
                      <p className="font-bold">
                        Link dell'immagine di copertina
                      </p>
                      <a
                        href={courseData['imageUrl']}
                        target="_blank"
                        rel="noreferrer"
                        className="border-l-4 border-blue-100 block px-4 py-2 mt-3 w-fit bg-white hover:bg-blue-100"
                      >
                        {courseData['imageUrl']}
                      </a>
                    </li>
                    {courseData['todos'] && (
                      <li>
                        <p className="font-bold">Programma</p>
                        <div className="bg-white border-l-4 border-blue-100 px-4 py-3 mt-3">
                          {courseData['todos'].length > 0 ? (
                            <TodoList itemList={courseData['todos']}></TodoList>
                          ) : (
                            <p>Nessun programma definito</p>
                          )}
                        </div>
                      </li>
                    )}
                    <li>
                      <p className="font-bold">Prezzo</p>
                      <div className="bg-white border-l-4 border-blue-100 px-3 py-2 mt-3 w-fit">
                        {courseData['price']} €
                      </div>
                    </li>
                    <li className="flex gap-4 flex-wrap	justify-between">
                      <div>
                        <p className="font-bold">Creato il</p>
                        <div className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 w-fit">
                          {new Date(
                            courseData['creationDatetime']
                          ).toLocaleString('it-IT')}
                        </div>
                      </div>
                      <div>
                        {courseData['publicationDatetime'] && (
                          <div>
                            <p className="font-bold">Pubblicato il</p>
                            <div className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 w-fit">
                              {new Date(
                                courseData['publicationDatetime']
                              ).toLocaleString('it-IT')}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {courseData['startingDatetime'] && (
                          <div>
                            <p className="font-bold">Avviato il</p>
                            <div className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 w-fit">
                              {new Date(
                                courseData['startingDatetime']
                              ).toLocaleString('it-IT')}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {courseData['endingDatetime'] && (
                          <div>
                            <p className="font-bold">Terminato il</p>
                            <div className="bg-white border-l-4 border-blue-100 px-4 py-2 mt-3 w-fit">
                              {new Date(
                                courseData['endingDatetime']
                              ).toLocaleString('it-IT')}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                )}
              </div>
              {courseData['todos'] && courseData['startingDatetime'] && (
                <section className="flex flex-col gap-6 mt-24 items-center">
                  <h3 className="text-2xl mb-2 font-bold">
                    Andamento del programma
                  </h3>
                  {!courseData['endingDatetime'] && (
                    <PopupButton courseData={courseData}></PopupButton>
                  )}
                  <div className="mb-10 mt-4 px-12 bg-white border-l-0 border-cyan-500 w-[100%]">
                    <TodoList
                      itemList={courseData['todos']}
                      extended={true}
                      innerEnum={true}
                      olClasses="list-none"
                      className="bg-gray-100 py-2 px-12 border-l-8 bg-blue-50 border-blue-400"
                    ></TodoList>
                  </div>
                </section>
              )}
            </div>
            {courseData['publicationDatetime'] && (
              <section className="my-20 pb-8 max-w-[50%] mx-auto">
                <h3 className="my-10 text-2xl text-center font-bold">
                  Utenti iscritti al corso
                </h3>
                {courseData['enrolledUsers'].length > 0 ? (
                  <div className="border-t-8 border-t-gray-500 bg-gray-100 pb-2">
                    <p className="text-center text-lg my-8">
                      Numero di iscritti: {courseData['enrolledUsers'].length}
                    </p>
                    <ul className="flex flex-col gap-4 p-4 justify-center">
                      {courseData['enrolledUsers'].map((user, i) => (
                        <li
                          key={i}
                          className="border-l-4 flex gap-12 bg-white py-1 px-6 w-fit mx-auto text-center"
                        >
                          <p>
                            {user['fullName'].firstName}{' '}
                            {user['fullName'].lastName}{' '}
                          </p>
                          <p>{user['email']}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-center">
                    Nessun utente è attualmente iscritto al corso.
                  </p>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export function TodoList({
  itemList,
  extended = false,
  className = '',
  olClasses = '',
  innerEnum = false,
}) {
  return (
    <ol className={`flex flex-col gap-4 list-decimal px-4 ${olClasses}`}>
      {itemList.map((item, i) => (
        <li key={i}>
          <div className={`flex flex-col rounded-xl ${className}`}>
            <div className={`flex flex-col gap-2 py-2`}>
              <div className="flex justify-between items-center">
                <div className="font-semibold">
                  {innerEnum && (
                    <div className="text-md font-semibold w-fit pr-2 mb-1">
                      [ {i + 1} ]
                    </div>
                  )}
                  {item.title}
                </div>
                <div className="flex flex-col items-center">
                  {extended && item['completionDate'] && (
                    <div className="mt-1 mb-2 gap-2 text-blue-500">
                      <p>
                        Completato il{' '}
                        {
                          new Date(item['completionDate'])
                            .toLocaleString('it-IT')
                            .split(',')[0]
                        }
                      </p>
                    </div>
                  )}
                  {extended && item.linksToRecorderLessons && (
                    <a
                      href={item.linksToRecorderLessons}
                      target="_blank"
                      rel="noreferrer"
                      className="px-1 py-1 w-fit text-md items-center px-4 text-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white rounded-lg whitespace-nowrap"
                    >
                      Vai alle lezioni
                    </a>
                  )}
                </div>
              </div>
              <p className="whitespace-pre-line">{item.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function PopupButton({ courseData }) {
  return (
    <div>
      {!courseData['startingDatetime'] ? (
        <Popup
          trigger={
            <button className="py-2 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Edita il corso
            </button>
          }
          modal
          nested
        >
          <CoursePopup inputCourse={courseData}></CoursePopup>
        </Popup>
      ) : (
        <Popup
          trigger={
            <button className="py-2 text-lg px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Modifica
            </button>
          }
          modal
          nested
        >
          <TodosUpdatePopup inputCourse={courseData}></TodosUpdatePopup>
        </Popup>
      )}
    </div>
  );
}
