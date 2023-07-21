import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getCourses(url) {
      try {
        const response = await await fetch(url);
        if (response.ok) {
          setErrorMsg('');
          const courses = (await response.json()).data;
          setCourses(courses);
        } else
          setErrorMsg(
            response.headers.get('content-type').includes('application/json')
              ? (await response.json()).message
              : `${response.status} ${response.statusText}`
          );
      } catch {
        setErrorMsg(
          errorMsg
            ? errorMsg + ' '
            : 'Server momentaneamente non raggiungibile.'
        );
      }
    }
    if (search) {
      (async () =>
        await getCourses(
          `${import.meta.env.VITE_SERVER_URL}/courses?search=${search}`
        ))();
    } else {
      (async () =>
        await getCourses(`${import.meta.env.VITE_SERVER_URL}/courses`))();
    }
  }, [searchParams]);

  return (
    <section className="bg-gradient-to-r from-cyan-50 to-blue-100">
      <h2 className="mb-20 mt-16 text-3xl font-bold text-center">
        Corsi
        {errorMsg && (
          <ErrorMsg
            message={errorMsg}
            customClasses="mx-auto mt-8 w-[50%] font-normal"
            setPropFunction={setErrorMsg}
          ></ErrorMsg>
        )}
        {search ? (
          <>
            <span className="text-xl font-normal"> che includono </span>
            <span className="text-2xl font-bold">'{search}'</span>
          </>
        ) : (
          ''
        )}
      </h2>
      {courses.length > 0 ? (
        <div className="flex flex-col justify-center gap-16 mx-[16%] mb-32">
          {courses.map((c, i) => (
            <Course key={i} course={c}></Course>
          ))}
        </div>
      ) : (
        <div>
          {!errorMsg && (
            <p className="my-8 text-center text-lg">
              Attualmente non ci sono corsi disponibili.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function Course({ course }) {
  const navigate = useNavigate();
  return (
    <article className="flex gap-12 border-2 border-blue-100 items-center bg-white rounded-3xl h-50">
      <div
        className={`basis-[18%] bg-cover bg-center h-52 rounded-3xl`}
        style={{
          backgroundImage: `url(${
            course.imageUrl
              ? course.imageUrl
              : 'https://placehold.co/600x400/orange/black'
          })`,
        }}
      ></div>
      <div className="flex flex-col justify-center basis-[75%] gap-4">
        <header className="text-2xl flex justify-between items-center gap-4 mr-10">
          <p className="font-bold">{course.title}</p>
          <small className="text-gray-800 text-md bg-cyan-50 px-4">
            {course['seller']['fullName'].firstName}{' '}
            {course['seller']['fullName'].lastName}
          </small>
        </header>
        <p className="overflow-hidden">
          {course.description.substring(0, 230)}...
        </p>
        <div className="flex gap-16 justify-between items-center">
          <div>
            <button
              className="text-white font-medium border-2 rounded-lg py-2 px-8 bg-gray-600 hover:bg-gray-500"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              DETTAGLI
            </button>
          </div>
          <div className="flex items-center mr-10">
            <p className="text-xl font-bold text-center rounded-l-2xl text-gray-700 px-5 py-2 bg-cyan-50">
              {course.price} €
            </p>
            <button
              className="rounded-r-2xl text-lg font-semibold border-l-2 border-gray-500 py-2 px-12 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              ACQUISTA
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
