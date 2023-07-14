import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function CoursePopup({ userFullName }) {
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
    imageUrl: '',
    price: 0,
    todos: [],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = inputs;
    dataToSend.seller.fullName = userFullName;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/courses`,
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
    if (!userId) navigate('/courses');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errorMsg]);

  return (
    <div className="flex flex-col bg-gray-50 items-center">
      {errorMsg && <ErrorMsg message={errorMsg}></ErrorMsg>}
      {!registrationDoneMsg && (
        <section className="w-full">
          <h4 className="text-2xl p-2 border-b-4 border-cyan-500 w-full text-center">
            Crea un corso
          </h4>
          <form
            onSubmit={handleSubmit}
            className="[&_label]:block [&_label]:mb-3 [&_label]:font-medium w-full [&_input]:bg-white [&_input]:pl-2 [&_textarea]:bg-white [&_textarea]:pl-2 [&_textarea]:border-l-4 [&_input]:p-1 [&_input]:border-l-4 flex flex-col gap-6 p-8"
          >
            <div>
              <label htmlFor="title">Titolo</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={inputs.title}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="description">Descrizione</label>
              <textarea
                name="description"
                id="description"
                required
                value={inputs.description}
                onChange={handleChange}
                className="w-full h-32"
              />
            </div>
            <div>
              <label htmlFor="presentationVideoUrl">
                Link del video di presentazione
              </label>
              <input
                type="url"
                name="presentationVideoUrl"
                id="presentationVideoUrl"
                value={inputs.presentationVideoUrl}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="imageUrl">Link dell'immagine di copertina</label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={inputs.imageUrl}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="price">Prezzo</label>
              <input
                type="number"
                name="price"
                id="price"
                required
                value={inputs.price}
                onChange={handleChange}
                className="w-[20%]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-[50%] rounded-lg block py-3 px-4 mt-8 text-lg mx-auto text-center bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
              >
                Conferma
              </button>
            </div>
          </form>
        </section>
      )}
      {registrationDoneMsg && (
        <div>
          <DoneMsg message={registrationDoneMsg}></DoneMsg>
          <button
            onClick={() => navigate(`/courses/${newCourseId}/management`)}
            className="p-4 my-4 text-center bg-cyan-400 hover:cyan-500"
          >
            Vai alla pagina del corso
          </button>
        </div>
      )}
    </div>
  );
}
