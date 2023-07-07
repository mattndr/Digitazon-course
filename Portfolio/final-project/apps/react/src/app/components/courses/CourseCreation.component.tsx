import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseCreation() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [newCourseId, setNewCourseId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [registrationDoneMsg, setRegistrationDoneMsg] = useState('');
  const [inputs, setInputs] = useState({
    seller: {
      id: userId,
      fullName: {
        firstName: '',
        lastName: '',
      },
    },
    title: '',
    description: '',
    presentationVideoUrl: '',
    price: 0,
    // publicationDate: Date,
    // startingDate: Date,
    // endingDate: Date,
    // minimumEnrollments: { type: Number, min: 0 },
    // todos: [], // there is no need to access those Todos on their own
    // enrollments_id: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'Enrollment',
    // },
  });

  const handleChange = (event) => {
    const newInputs = structuredClone(inputs);
    const updatedInputs = setProperty(
      newInputs,
      event.target.name,
      event.target.value
    );
    setInputs((values) => ({
      ...values,
      ...updatedInputs,
    }));
  };

  const setProperty = (obj, path, value) => {
    const [head, ...rest] = path.split('.');
    return {
      ...obj,
      [head]: rest.length
        ? setProperty(obj[head], rest.join('.'), value)
        : value,
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const dataToSend = inputs;
    const fullName = await readUserFullName();
    dataToSend.seller.fullName = fullName;
    const response = await fetch(
      `http://localhost:3000/users/${userId}/courses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
      }
    );
    if (response.ok) {
      const newCourseId = (await response.json()).data.courseId;
      setNewCourseId(newCourseId);
      setRegistrationDoneMsg('Corso creato');
      setErrorMsg('');
    } else {
      setErrorMsg((await response.json()).message);
      setRegistrationDoneMsg('');
    }
  }

  async function readUserFullName() {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/profile`,
      { credentials: 'include' }
    );
    if (response.ok) return (await response.json()).data.fullName;
  }

  return (
    <div className="flex flex-col gap-8 items-center bg-gray-50">
      {errorMsg && (
        <div className="bg-red-100 p-4 mx-[30%] mt-6 text-center">
          {errorMsg}
        </div>
      )}
      {!registrationDoneMsg && (
        <>
          <h4 className="mt-12 text-2xl">Crea un nuovo corso</h4>

          <form
            onSubmit={handleSubmit}
            className="[&_label]:block [&_input]:bg-gray-0 bg-gray-100 [&_input]:font-medium signup-form flex flex-col gap-6 border-2 p-8"
          >
            <div>
              <label htmlFor="title">Titolo: </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={inputs.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Descrizione</label>
              <input
                type="text"
                name="description"
                id="description"
                required
                value={inputs.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="presentationVideoUrl">
                LInk al video di presentazione:{' '}
              </label>
              <input
                type="url"
                name="presentationVideoUrl"
                id="presentationVideoUrl"
                required
                value={inputs.presentationVideoUrl}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Prezzo:</label>
              <input
                type="number"
                name="price"
                id="price"
                required
                value={inputs.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="rounded-lg block py-3 px-4 mt-4 mx-auto text-center bg-cyan-400 hover:bg-cyan-500"
              >
                Registrati
              </button>
            </div>
          </form>
        </>
      )}
      {registrationDoneMsg && (
        <div>
          <div className="p-4  mt-4 text-center text-xl">
            {registrationDoneMsg}
          </div>
          <button
            onClick={() => navigate(`/courses/${newCourseId}/managment`)}
            className="p-4 my-4 text-center bg-cyan-400 hover:cyan-500"
          >
            Vai alla pagina del corso
          </button>
        </div>
      )}
    </div>
  );
}
