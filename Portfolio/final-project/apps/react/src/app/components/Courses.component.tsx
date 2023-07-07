import { useEffect, useState } from 'react';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async function getCourses() {
      const res = await (await fetch(`http://localhost:3000/courses`)).json();
      setCourses(res.data);
    })();
  }, []);
  return (
    <>
      <header>
        {<h2 className="mb-8 text-xl font-bold text-center">Corsi</h2>}
      </header>
      {courses.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">
          {courses.map((c) => (
            <Course key={c.id} course={c}></Course>
          ))}
        </div>
      )}
    </>
  );
}

function Course({ course }) {
  return (
    <article className="flex flex-col justify-between gap-6 basis-[30%] p-6 border-2 bg-gray-50 rounded-lg">
      <header className="text-lg font-bold text-center">{course.title}</header>
      {/* <img
        src={product.images[0]}
        alt={product.id}
        width="200px"
        className="mx-auto"
      ></img> */}
      <p className="text-sm">{course.description}</p>
      <div>
        <p className="text-lg text-center">
          Price: <span className="pl-2">{course.price}€</span>
        </p>
        <button
          className="block mx-auto font-medium border-2 rounded-lg p-2 mt-4 mb-0 bg-lime-500 shadow-md hover:bg-lime-400"
          onClick={(course) => console.log(course)}
        >
          ACQUISTA
        </button>
      </div>
    </article>
  );
}
