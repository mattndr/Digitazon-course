import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { TodoList } from './CourseManagement.component';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function CourseDetails() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  const handleCourseEnrollment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}/enrollments`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (response.ok) {
        setDoneMsg('Iscrizione avvenuta con successo!');
        setEnrolled(true);
        setErrorMsg('');
      } else {
        setErrorMsg(
          response.headers.get('content-type') === 'application/json'
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
          `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
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
    window.scrollTo(0, 0);
  }, [errorMsg, doneMsg]);

  return (
    <section className="pt-10 h-full bg-gray-100">
      <button
        className="mx-[10%] p-2 mt-4 w-fit border bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Torna alla pagina precedente
      </button>
      {doneMsg && (
        <DoneMsg
          message={doneMsg}
          setPropFunction={setDoneMsg}
          customClasses="mx-[15%] mt-8"
        ></DoneMsg>
      )}
      {errorMsg && (
        <ErrorMsg
          message={errorMsg}
          customClasses="mx-auto mt-8 w-[50%]"
          setPropFunction={setErrorMsg}
        ></ErrorMsg>
      )}
      {Object.keys(courseData).length > 0 && (
        <div className="mb-12 py-20">
          <div className="flex flex-col gap-10 px-10 pt-16 pb-28 px-16 mx-[15%] bg-white border-t-8 border-cyan-400">
            <div className="flex justify-between items-center ml-[7.5%]">
              <button
                onClick={() => navigate(`/users/${courseData['seller'].id}`)}
                className="text-xl font-bold border-l-8 border-gray-700 bg-gray-100 px-6 py-2 hover:bg-gray-200 active:bg-gray-100 rounded-r-xl"
              >
                {courseData['seller']['fullName'].firstName}{' '}
                {courseData['seller']['fullName'].lastName}
              </button>
              {!courseData['enrolledUsers'].includes(userId) && !enrolled ? (
                <button
                  type="submit"
                  onClick={handleCourseEnrollment}
                  className="font-bold text-xl text-gray-800 mr-[7.5%] rounded-lg py-4 px-10 bg-cyan-400 hover:bg-cyan-300"
                >
                  ACQUISTA a {courseData['price']} €
                </button>
              ) : (
                <p className="text-xl text-white mr-[7.5%] py-4 px-10 bg-gray-700">
                  ACQUISTATO
                </p>
              )}
            </div>
            <h2 className="text-3xl mb-8 mt-4 text-center font-bold [word-spacing:2px]">
              {courseData['title']}
            </h2>
            <div className="mx-auto w-[85%] h-[30%] p-2 bg-gray-700">
              <ReactPlayer
                className="aspect-video"
                width={'100%'}
                height={'100%'}
                controls={false}
                url={
                  courseData['presentationVideoUrl']
                    ? courseData['presentationVideoUrl']
                    : 'https://www.youtube.com/watch?v=ScMzIvxBSi4&ab_channel=BenMarquezTX'
                }
              />
            </div>
            <p className="text-center w-[95%] bg-gray-50 mx-auto border-l-8 border-l-gray-300 border-r-8 border-r-gray-100 py-10 mt-12 px-8 text-lg [word-spacing:2px]">
              {courseData['description']}
            </p>
          </div>
          {courseData['todos'].length > 0 && (
            <div className="flex flex-col gap-12">
              <section className="flex flex-col gap-10 items-center px-10 pt-16 pb-28 px-16 mx-[15%] border-b-4 border-b-gray-200 bg-white border-t-8 border-gray-300">
                <h3 className="mt-16 mb-16 text-2xl py-0.5 font-semibold px-6">
                  Programma del corso
                </h3>
                <div className="w-[80%] mx-auto">
                  <TodoList
                    itemList={courseData['todos']}
                    extended={courseData['startingDatetime'] ? true : false}
                    className="py-4 px-6"
                    olClasses={`list-none gap-2 border-l-4 border-cyan-500 ${
                      courseData['startingDatetime']
                        ? 'border-white [&_li]:border-l-4 [&_li]:border-cyan-500'
                        : ''
                    }`}
                    innerEnum={true}
                  ></TodoList>
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
