// Meno semplice: scrivere un componente che rappresenti una TODO list prendendo gli elementi della lista da questo endpoint: https://jsonplaceholder.typicode.com/todos
// Ogni componente deve avere una checkbox, se la checkbox viene flaggata il componente finisce in fondo alla lista e diventa piu' opaco

import { useEffect, useState } from 'react';
import './ToDo.css';
import { Outlet } from 'react-router-dom';

export default function ToDo() {
  const [toDoList, setToDoList] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    async function getTodoList() {
      let res = await fetch('https://jsonplaceholder.typicode.com/todos');
      let toDoList = await res.json();
      setToDoList(
        toDoList.slice(0, 5).map((current) => {
          return { ...current, checked: false };
        })
      );
    }
    getTodoList();
  }, [reset]);

  function moveElement(id) {
    let index = toDoList.findIndex((el) => el.id === id);
    const newToDoList = [...toDoList];
    newToDoList[index].checked = true;
    // newToDoList.push(newToDoList.splice(index, 1)[0]);
    setToDoList(newToDoList);
  }

  return (
    <div className="todo">
      <h2>Todo list</h2>
      <button onClick={() => setReset(!reset)}>Reset</button>
      <ul>
        {toDoList.map((el, i) => (
          <ListItem element={el} moveElement={moveElement} key={i}></ListItem>
        ))}
      </ul>
      <Outlet></Outlet>
    </div>
  );
}

function ListItem({ element, moveElement }) {
  function handleOnChange() {
    if (!element.checked) {
      moveElement(element.id, !element.checked);
    }
  }
  return (
    <li
      className={['list-element', element.checked ? 'opacque' : ''].join(' ')}
    >
      <input
        type="checkbox"
        checked={element.checked}
        onChange={handleOnChange}
      ></input>
      <span>{element.title}</span>
    </li>
  );
}
