import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    search
      ? (async function getCourses() {
          const res = await (
            await fetch(
              `${import.meta.env.VITE_SERVER_URL}/courses?search=${search}`
            )
          ).json();
          console.log(res.data);
          setCourses(res.data);
        })()
      : (async function getCourses() {
          const res = await (
            await fetch(`${import.meta.env.VITE_SERVER_URL}/courses`)
          ).json();

          setCourses(res.data);
        })();
  }, [searchParams]);

  return (
    <>
      <header>
        <h2 className="mb-14 mt-16 text-3xl font-bold text-center">
          Corsi{' '}
          {search ? (
            <>
              <span className="text-xl font-normal"> che includono </span>
              <span className="text-2xl font-bold">'{search}'</span>
            </>
          ) : (
            ''
          )}
        </h2>
      </header>
      {courses.length > 0 ? (
        <div className="flex flex-col justify-center gap-10 mx-[16%]">
          {courses.map((c, i) => (
            <Course key={i} course={c}></Course>
          ))}
        </div>
      ) : (
        <p className="my-8 text-center text-lg">
          Attualmente non c'è nessun corso disponibile.
        </p>
      )}
    </>
  );
}

function Course({ course }) {
  const navigate = useNavigate();
  console.log(course.imageUrl);
  return (
    <article className="flex items-center gap-12 border-2 bg-gray-50 rounded-lg h-60">
      <div
        className={`h-[100%] basis-[20%] bg-cover w	bg-center`}
        style={{
          backgroundImage: `url(${
            course.imageUrl
              ? course.imageUrl
              : 'https://placehold.co/600x400/orange/black'
          })`,
        }}
      ></div>
      <div className="flex flex-col basis-[75%] gap-6">
        <header className="text-2xl font-bold">{course.title}</header>
        <p className="overflow-hidden">
          {course.description.substring(0, 300)}...
        </p>
        <div className="flex gap-16 justify-between items-center">
          <button
            className="text-white font-medium border-2 rounded-lg py-2 px-8 bg-gray-600 hover:bg-gray-500"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            DETTAGLI
          </button>
          <div className="flex items-center mr-10">
            <p className="text-xl font-bold text-center rounded-l-2xl bg-white text-gray-700 px-5 py-2 bg-gray-50 ">
              {course.price}€
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
