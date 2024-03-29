import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CourseCreatePopup from '../courses/CourseCreatePopup.component';
import ErrorMsg from '../shared/ErrorMsg.component';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});
  const userId = localStorage.getItem('userId');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!userId) navigate('/auth/login');
    let data = {};
    const getData = async (url, fieldName = '') => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          let receivedData = (await response.json()).data;
          if (fieldName) receivedData = { [fieldName]: receivedData };
          data = { ...data, ...receivedData };
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
    };

    (async function initializaData() {
      await getData(
        `${
          import.meta.env.VITE_SERVER_URL
        }/users/${userId}/profile?isSeller=1&fullName=1`
      );
      if (errorMsg) return;
      if (data['isSeller']) {
        await getData(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}/courses`,
          'courses'
        );
      }
      if (errorMsg) return;
      await getData(
        `${import.meta.env.VITE_SERVER_URL}/courses?enrolledUser=${userId}`,
        'enrolledCourses'
      );
      setDashboardData(data);
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errorMsg]);

  return (
    <div className="pt-16 px-[12.5%] h-full bg-gradient-to-r from-cyan-50 to-blue-100">
      {errorMsg && (
        <ErrorMsg
          message={errorMsg}
          customClasses="mx-auto mt-8 w-[50%]"
          setPropFunction={setErrorMsg}
        ></ErrorMsg>
      )}
      {!errorMsg && (
        <>
          <div
            id="popup-root"
            className="[&_.popup-content]:max-h-[90%] [&_.popup-content]:overflow-scroll"
          ></div>
          <section className="text-lg">
            <h2 className="flex justify-center text-3xl font-bold">
              Dashboard
            </h2>
            {dashboardData && (
              <div className="mt-14 flex flex-col gap-12">
                <section>
                  <h3 className="mt-4 mb-4 text-2xl text-center">
                    Corsi a cui sei iscritta/o
                  </h3>
                  {dashboardData['enrolledCourses'] &&
                  dashboardData['enrolledCourses'].length > 0 ? (
                    <div className="mt-8 p-4 flex flex-wrap grow justify-evenly gap-4">
                      {dashboardData['enrolledCourses'].map((course, i) => (
                        <button
                          className={`basis-[55%] border-l-8 border-cyan-500 p-1 py-2 cursor-pointer bg-white rounded-xl hover:bg-gray-50 active:bg-gray-100 hover:border-cyan-600 ${
                            course.endingDatetime
                              ? 'opacity-40 order-last border-gray-500'
                              : ''
                          }`}
                          key={course._id}
                          onClick={() => navigate(`/courses/${course._id}`)}
                        >
                          <div className="w-fit mx-auto px-2 my-2">
                            <p className="font-semibold">{course.title} </p>
                            <small>
                              {course.seller.fullName.firstName}{' '}
                              {course.seller.fullName.lastName}
                            </small>
                          </div>
                          {course.endingDatetime && (
                            <small>
                              Terminato il{' '}
                              {
                                new Date(course.endingDatetime)
                                  .toLocaleString('it-IT')
                                  .split(',')[0]
                              }
                            </small>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center mt-6 bg-white w-fit mx-auto px-12 py-8 rounded-lg">
                      Attualmente non sei iscritta/o ad alcun corso.
                    </p>
                  )}
                </section>
                <section className="mt-12">
                  {dashboardData['isSeller'] && (
                    <>
                      <h3 className="mb-4 text-2xl text-center">
                        I tuoi corsi
                      </h3>
                      <div className="text-center">
                        <NewCoursePopup
                          userFullName={dashboardData['fullName']}
                        ></NewCoursePopup>
                      </div>
                      {dashboardData['courses'].length > 0 && (
                        <div className="mt-8 mb-20 p-8 flex flex-wrap grow justify-evenly gap-4">
                          {dashboardData['courses'].map((course, i) => (
                            <button
                              className={`basis-[55%] border-l-8 border-cyan-500 p-1 py-2 cursor-pointer bg-white rounded-xl hover:bg-gray-50 active:bg-gray-100 hover:border-cyan-600 ${
                                course.endingDatetime
                                  ? 'opacity-40 order-last border-gray-500 hover:border-gray-700'
                                  : ''
                              }`}
                              key={course._id}
                              onClick={() =>
                                navigate(`/courses/${course._id}/management`, {
                                  state: { courseDetails: course },
                                })
                              }
                            >
                              <p className="w-fit mx-auto text-lg px-2 my-2 font-semibold">
                                {course.title}
                              </p>
                              {!course.publicationDatetime && (
                                <small className="block mt-3">
                                  Creato il{' '}
                                  {
                                    new Date(course.creationDatetime)
                                      .toLocaleString('it-IT')
                                      .split(',')[0]
                                  }
                                </small>
                              )}
                              {course.publicationDatetime &&
                                !course.startingDatetime && (
                                  <small>
                                    Pubblicato il{' '}
                                    {
                                      new Date(course.publicationDatetime)
                                        .toLocaleString('it-IT')
                                        .split(',')[0]
                                    }
                                  </small>
                                )}
                              {course.startingDatetime &&
                                !course.endingDatetime && (
                                  <small>
                                    Avviato il{' '}
                                    {
                                      new Date(course.startingDatetime)
                                        .toLocaleString('it-IT')
                                        .split(',')[0]
                                    }
                                  </small>
                                )}
                              {course.endingDatetime && (
                                <small>
                                  Terminato il{' '}
                                  {
                                    new Date(course.endingDatetime)
                                      .toLocaleString('it-IT')
                                      .split(',')[0]
                                  }
                                </small>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
            )}
          </section>{' '}
        </>
      )}
    </div>
  );
}

function NewCoursePopup({ userFullName }) {
  return (
    <div>
      <Popup
        trigger={
          <button className="p-2 px-4 mt-4 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:bg-cyan-200">
            Crea un corso
          </button>
        }
        modal
        nested
      >
        <CourseCreatePopup userFullName={userFullName}></CourseCreatePopup>
      </Popup>
    </div>
  );
}
