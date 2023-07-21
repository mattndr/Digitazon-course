import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import ReactPlayer from 'react-player';

export default function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
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
          setUserData(user);
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
    if (!userId) navigate('/auth/login');
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 bg-gradient-to-r from-cyan-50 to-blue-100">
      <button
        className="mx-[12.5%] p-2 mt-14 w-fit bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:bg-gray-500"
        onClick={() => navigate(-1)}
      >
        Torna alla pagina precedente
      </button>
      {Object.keys(userData).length > 0 && (
        <section className="h-full pt-10">
          {errorMsg && (
            <ErrorMsg
              message={errorMsg}
              customClasses="mx-auto mb-12 w-[75%]"
            ></ErrorMsg>
          )}
          <h2 className="text-2xl font-semibold text-center mx-auto">
            Dettagli del venditore
          </h2>
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col pt-6 mt-8">
                <div className="flex flex-col py-2 mb-8 justify-center items-center px-[10%]">
                  <p className="bg-white px-16 py-3 text-2xl font-bold whitespace-nowrap border-x-8 border-cyan-400">
                    {userData['fullName'].firstName +
                      ' ' +
                      userData['fullName'].lastName}
                  </p>
                </div>
                {userData['sellerProfile'] && (
                  <div className="flex flex-col items-center text-xl text-center mt-8 mb-20 mx-auto py-10 bg-white w-[60%] px-20 rounded-t-3xl rounded-b-3xl border-x-0 border-t-0 border-t-gray-200 border-x-blue-200 leading-8">
                    <p className="first-letter:text-2xl first-letter:font-bold px-20 whitespace-pre-line">
                      {userData['sellerProfile'].description}
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`mx-auto w-[62%] h-[30%] ${
                  userData['sellerProfile'] ? 'border-gray-200' : 'mt-12'
                }`}
              >
                <div className="p-2 m-16 bg-gradient-to-r from-cyan-500 to-blue-500">
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
              </div>
              {userData['publicatedCourses'].length > 0 ? (
                <>
                  <h3 className="pb-1 px-2 mt-20 text-2xl text-center font-semibold">
                    Corsi di{' '}
                    {userData['fullName'].firstName +
                      ' ' +
                      userData['fullName'].lastName}
                  </h3>
                  <section className="flex flex-col gap-4 items-center mt-16 mb-32 py-12 h-fit mx-[19%] bg-white rounded-2xl">
                    <ul className="flex flex-col gap-12 w-[90%]">
                      {userData['publicatedCourses'].map((course, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-8 border-l-8 border-cyan-500 px-4 py-1"
                        >
                          <div className="grow">
                            <p className="text-lg flex justify-left flex-col font-bold mb-2">
                              {course.title}
                            </p>
                            <p className="whitespace-pre-line">
                              {course.description.substring(0, 200) + '...'}
                            </p>
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
                </>
              ) : (
                <>
                  <h3 className="pb-1 px-2 mt-28 mb-12 text-2xl text-center font-semibold">
                    Corsi di{' '}
                    {userData['fullName'].firstName +
                      ' ' +
                      userData['fullName'].lastName}
                  </h3>
                  <p className="mx-[25%] mb-32 bg-white p-8 text-center text-xl rounded-lg border-t-2">
                    Attualmente il venditore non ha corsi attivi.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
