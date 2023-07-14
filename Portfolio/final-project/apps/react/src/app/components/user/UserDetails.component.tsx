import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import ReactPlayer from 'react-player';

export default function UserDetails() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async function getData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          const data = (await response.json()).data;
          const user = {
            ...data.user,
            publicatedCourses: data.publicatedCourses,
          };
          console.log(user);

          setUserData(user);
        } else {
          setErrorMsg(
            response.headers.get('content-type') === 'application/json'
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
    if (!userId) navigate('/auth/login');
  }, []);

  return (
    <div className="h-full flex flex-col gap-8 bg-gray-100 ">
      <button
        className="mx-[12.5%] p-2 mt-14 w-fit border bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Torna alla pagina precedente
      </button>
      {Object.keys(userData).length > 0 && (
        <section className="mx-[14%] h-full pt-10 mt-10 bg-white">
          {errorMsg && (
            <ErrorMsg
              message={errorMsg}
              customClasses="mx-auto mb-12 w-[75%]"
            ></ErrorMsg>
          )}
          <h2 className="text-2xl text-center py-5 mx-auto">
            Dettagli del venditore
          </h2>
          <div className="px-[5%]">
            <div className="px-[5%] flex flex-col gap-20">
              <div className="flex py-2 mt-8 justify-center items-center">
                <div className="bg-gray-500 py-1 w-full rounded-lg"></div>
                <p className="bg-white px-16 py-3 text-2xl font-bold whitespace-nowrap">
                  {userData['fullName'].firstName +
                    ' ' +
                    userData['fullName'].lastName}
                </p>
                <div className="bg-gray-500 py-1 w-full rounded-lg"></div>
              </div>
              {userData['sellerProfile'] && (
                <div className="flex flex-col items-center text-lg text-center bg-gray-100 w-[85%] mx-auto py-6 px-10 border-x-4 border-gray-300">
                  <p>{userData['sellerProfile'].description}</p>
                </div>
              )}
              <div className="mx-auto w-[85%] h-[30%] p-2 mt-8 bg-gray-700">
                <ReactPlayer
                  className="aspect-video"
                  width={'100%'}
                  height={'100%'}
                  controls={false}
                  url={
                    userData['sellerProfile'] &&
                    userData['sellerProfile'].presentationVideoUrl
                      ? userData['sellerProfile'].presentationVideoUrl
                      : 'https://www.youtube.com/watch?v=ScMzIvxBSi4&ab_channel=BenMarquezTX'
                  }
                />
              </div>
              {userData['publicatedCourses'].length > 0 ? (
                <section className="flex flex-col gap-4 items-center mt-4 mb-20 h-fit">
                  <h3 className="pb-1 px-2 mt-6 mb-6 text-2xl font-semibold">
                    Corsi di{' '}
                    {userData['fullName'].firstName +
                      ' ' +
                      userData['fullName'].lastName}
                  </h3>
                  <ul className="flex flex-col gap-12 mb-32 w-[90%]">
                    {userData['publicatedCourses'].map((course, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-8 border-l-8 border-cyan-500 px-4 py-1"
                      >
                        <div className="grow">
                          <p className="text-lg flex justify-left flex-col font-bold mb-2">
                            {course.title}
                          </p>
                          <p>{course.description.substring(0, 200) + '...'}</p>
                        </div>
                        <button
                          className="bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200 rounded-lg py-2 px-4 whitespace-nowrap"
                          onClick={() => navigate(`/courses/${course._id}`)}
                        >
                          Visualizza il corso
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                <p className="mt-4 mb-32 bg-gray-100 p-4 text-center text-lg border-t-2">
                  Attualmente il venditore non ha corsi attivi.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
