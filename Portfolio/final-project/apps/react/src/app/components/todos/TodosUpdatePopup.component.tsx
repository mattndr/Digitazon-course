import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function TodosUpdatePopup({ inputCourse }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { courseId } = useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const [inputs, setInputs] = useState(structuredClone(inputCourse));

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
    const dataToSend = { todos: inputs.todos };
    console.log(dataToSend);

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
        setDoneMsg('Programma del corso aggiornato');
        setErrorMsg('');
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
    window.scrollTo(0, 0);
  }, [errorMsg, doneMsg]);

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {errorMsg && (
        <ErrorMsg message={errorMsg} customClasses="mx-auto w-[50%]"></ErrorMsg>
      )}
      {doneMsg && (
        <DoneMsg
          message={doneMsg}
          customClasses="mb-10 mt-10 px-[5%]"
        ></DoneMsg>
      )}
      {!doneMsg && (
        <>
          <h4 className="text-2xl p-2 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 w-full text-center">
            Aggiorna l'avanzamento del corso
          </h4>
          <form
            onSubmit={handleSubmit}
            className="bg-blue-50 overflow-y-scroll h-[80vh] [&_label]:block [&_label]:mb-2 [&_label]:p-1 [&_input]:bg-gray-0 [&_input]:p-1 [&_textarea]:p-1 w-full bg-gray-100 [&_label]:font-medium signup-form flex flex-col gap-6 border-2 p-8"
          >
            {inputs.todos && (
              <div className="my-4">
                <TodoListUpdate
                  todoList={inputs.todos}
                  handleChange={handleChange}
                ></TodoListUpdate>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="rounded-lg block py-3 px-4 mt-4 mx-auto text-lg text-center bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
              >
                Aggiorna
              </button>
            </div>
          </form>
        </>
      )}
      {doneMsg && (
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => navigate(0)}
            className="p-4 mt-4 mb-8 text-center bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
          >
            Vai al corso aggiornato
          </button>
        </div>
      )}
    </div>
  );
}

function TodoListUpdate({ todoList, handleChange }) {
  const [updatedTodoList, setUpdatedTodoList] = useState(todoList);

  const handleTodoUpdate = (e, i) => {
    if (e.target.name === 'completionDate') {
      e.target.value = e.target.checked ? new Date().toISOString() : '';
    }
    const updatedTodos = [...updatedTodoList];
    updatedTodos[i][e.target.name] = e.target.value;
    setUpdatedTodoList(updatedTodos);
  };

  useEffect(() => {
    handleChange({ target: { name: 'todos', value: updatedTodoList } });
  }, [updatedTodoList]);

  return (
    <div className="flex flex-col gap-4">
      {updatedTodoList.map((item, index) => (
        <div
          key={index}
          className="item-container [&_input]:pl-2 [&_textarea]:pl-2 bg-white px-3 py-2"
        >
          <div className="flex items-center gap-8 grow">
            <div className="flex flex-col items-center justify-center">
              <input
                type="checkbox"
                name="completionDate"
                id="completionDate"
                checked={item.completionDate ? true : false}
                onChange={(e) => handleTodoUpdate(e, index)}
                className="w-4 h-4 ml-4 mx-auto"
              ></input>
            </div>
            <div className="flex flex-col gap-3 py-2 grow">
              <p className="pl-1 font-semibold">{item.title}</p>
              <p className="pl-1">{item.description}</p>
              <div className="flex items-center gap-1">
                <label
                  htmlFor="linksToRecorderLessons"
                  className="block font-thin p-0 m-0"
                >
                  Link:
                </label>
                <input
                  type="url"
                  name="linksToRecorderLessons"
                  id="linksToRecorderLessons"
                  value={item.linksToRecorderLessons}
                  placeholder="Link alle lezioni registrate"
                  onChange={(e) => handleTodoUpdate(e, index)}
                  className="text-sm w-[100%] bg-gray-100"
                ></input>
              </div>
            </div>
            {item['completionDate'] && (
              <p className="pl-1 text-center text-blue-600 basis-[20%]">
                Completato il{' '}
                <span className="block">
                  {new Date(item['completionDate']).toLocaleString('it-IT')}
                </span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
