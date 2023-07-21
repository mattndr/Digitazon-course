import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { XMarkIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function CoursePopup({ inputCourse }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { courseId } = useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [updateDoneMsg, setUpdateDoneMsg] = useState('');
  const [inputs, setInputs] = useState(inputCourse);

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
          body: JSON.stringify(inputs),
        }
      );
      if (response.ok) {
        setUpdateDoneMsg('Corso aggiornato');
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
  }, [errorMsg]);

  return (
    <div className="flex flex-col items-center bg-blue-50">
      {errorMsg && <ErrorMsg message={errorMsg}></ErrorMsg>}
      {!updateDoneMsg && (
        <section className="w-full">
          <h4 className="text-2xl p-2 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 w-full text-center">
            Aggiorna i dati del corso
          </h4>
          <form
            onSubmit={handleSubmit}
            className="px-[10%] [&_label]:block [&_label]:mb-3 [&_label]:font-bold w-full [&_input]:bg-white [&_input]:pl-3 [&_textarea]:bg-white [&_textarea]:pl-3 [&_textarea]:border-l-4 [&_input]:p-1 [&_input]:border-l-4 flex flex-col gap-8 p-8"
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
                className="w-full h-40"
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
                required
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
                className="w-fit"
              />
            </div>
            {inputs.todos && (
              <div>
                <div className="mb-4 mt-2 font-bold">Programma del corso</div>
                <TodoListUpdate
                  todoList={inputs.todos}
                  handleChange={handleChange}
                ></TodoListUpdate>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-[40%] text-lg rounded-lg block py-3 px-4 mt-4 mx-auto text-center bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
              >
                Aggiorna
              </button>
            </div>
          </form>
        </section>
      )}
      {updateDoneMsg && (
        <div className="flex flex-col w-[50%]">
          <DoneMsg
            message={updateDoneMsg}
            customClasses="my-8 text-xl"
          ></DoneMsg>
          <button
            onClick={() => navigate(0)}
            className="w-[50%] mx-auto p-4 mt-6 mb-10 text-lg text-center rounded-lg bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
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
  const [showAddItem, setShowAddItem] = useState(false);

  function handleDrop(droppedItem) {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedTodos = [...updatedTodoList];
    // Remove dragged item
    const [reorderedItem] = updatedTodos.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedTodos.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    handleChange({ target: { name: 'todos', value: updatedTodos } });
    setUpdatedTodoList(updatedTodos);
  }

  function handleTodoUpdate(e, i) {
    const updatedTodos = [...updatedTodoList];
    updatedTodos[i][e.target.name] = e.target.value;
    setUpdatedTodoList(updatedTodos);
  }

  function removeTodo(e, i) {
    const updatedTodos = [...updatedTodoList];
    updatedTodos.splice(i, 1);
    setUpdatedTodoList(updatedTodos);
  }

  useEffect(() => {
    handleChange({ target: { name: 'todos', value: updatedTodoList } });
  }, [updatedTodoList]);

  return (
    <div>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container bg-white flex flex-col gap-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {updatedTodoList.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="item-container flex bg-gray-200 [&_input]:pl-3 [&_input]:border-l-0 [&_textarea]:pl-3 [&_textarea]:border-l-0"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <span className="flex flex-col justify-center items-center bg-blue-100 hover:bg-blue-200">
                        <ChevronUpDownIcon className="h-6 w-6 text-cyan-500" />
                      </span>
                      <div className="flex grow bg-white">
                        <div className="flex flex-col grow">
                          <input
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={(e) => handleTodoUpdate(e, index)}
                            className="mx-1 font-semibold"
                          ></input>
                          <textarea
                            name="description"
                            value={item.description}
                            onChange={(e) => handleTodoUpdate(e, index)}
                            className="mx-1 resize-y h-24"
                          ></textarea>
                        </div>
                        <div className="flex bg-white">
                          <button
                            className="bg-blue-100 hover:bg-blue-200 px-1 py-2"
                            onClick={(e) => removeTodo(e, index)}
                          >
                            <XMarkIcon className="h-4 w-4 text-red-800" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showAddItem ? (
        <TodoListAddItem
          todoList={todoList}
          setUpdatedTodoList={setUpdatedTodoList}
          setShowAddItem={setShowAddItem}
        ></TodoListAddItem>
      ) : (
        <button
          className="mt-4 p-1 px-3 rounded-lg bg-blue-200 hover:bg-blue-300"
          onClick={() => setShowAddItem((prev) => !prev)}
        >
          Aggiungi elemento
        </button>
      )}
    </div>
  );
}

function TodoListAddItem({ todoList, setUpdatedTodoList, setShowAddItem }) {
  const [inputTodo, setInputTodo] = useState({ title: '', description: '' });
  const [showAddItemButton, setShowAddItemButton] = useState(false);

  const addItemToTodoList = (e) => {
    e.preventDefault();
    const updatedTodos = [...todoList];
    updatedTodos.push(inputTodo);
    setUpdatedTodoList(updatedTodos);
    setInputTodo({ title: '', description: '' });
  };

  const handleOnChange = (e) => {
    const updatedTodo = structuredClone(inputTodo);
    updatedTodo[e.target.name] = e.target.value;
    setInputTodo(updatedTodo);
  };

  useEffect(() => {
    if (inputTodo.title.length > 0 && inputTodo.description.length > 0) {
      setShowAddItemButton(true);
    } else setShowAddItemButton(false);
  }, [inputTodo]);

  return (
    <div className="mt-8 my-2 p-4 flex flex-col gap-2 bg-white border-4 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label htmlFor="title2">Aggiungi un elemento al programma</label>
          <button
            className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-gray-200 active:bg-gray-100"
            onClick={() => setShowAddItem((prev) => !prev)}
          >
            Chiudi
          </button>
        </div>
        <input
          value={inputTodo['title']}
          type="text"
          name="title"
          id="title2"
          onChange={handleOnChange}
          placeholder="Titolo"
          className="font-bold"
        />
      </div>
      <textarea
        value={inputTodo['description']}
        name="description"
        onChange={handleOnChange}
        placeholder="Descrizione"
        className="h-32"
      />
      {showAddItemButton && (
        <button
          onClick={addItemToTodoList}
          className="bg-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-100 w-fit mx-auto mt-2 py-1 px-2"
        >
          Aggiungi
        </button>
      )}
    </div>
  );
}
