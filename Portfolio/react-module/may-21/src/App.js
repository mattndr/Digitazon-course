import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import Es1 from './components/Es1';
import Es2 from './components/Es2';

function Main() {
  return (
    <div className="Main">
      <header>
        <h1 className="text-center">My app</h1>
      </header>
      <main className="flex">
        <nav className="mt-4 basis-[20%]">
          <ul className="flex mx-[20%] flex-col gap-4 text-center">
            <CustomLink path="es1" name="Es 1"></CustomLink>
            <CustomLink path="es2" name="Es 2"></CustomLink>
          </ul>
        </nav>
        <section>
          <Outlet></Outlet>
        </section>
      </main>
    </div>
  );
}

function CustomLink({ path, name }) {
  return (
    <li className="border-2 rounded-lg hover:bg-blue-200">
      <Link className="block" to={path}>
        {name}
      </Link>
    </li>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Es1 />}></Route>
          <Route path="es1" element={<Es1 />}></Route>
          <Route path="es2" element={<Es2 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   const [rgb, setRgb] = useState([...Array(3).fill('')]);
//   console.log(rgb);
//   function updateRgb(index, newValue) {
//     newValue = newValue.trim();
//     if (isNaN(newValue)) newValue = '';
//     const newRgb = [...rgb];
//     newRgb[index] = newValue;
//     setRgb(newRgb);
//   }
//   return (
//     <>
//       <div className="flex gap-4 my-4 justify-center">
//         <input
//           placeholder="r"
//           value={rgb[0]}
//           onChange={(e) => updateRgb(0, e.target.value)}
//         ></input>
//         <input
//           placeholder="g"
//           value={rgb[1]}
//           onChange={(e) => updateRgb(1, e.target.value)}
//         ></input>
//         <input
//           placeholder="b"
//           value={rgb[2]}
//           onChange={(e) => updateRgb(2, e.target.value)}
//         ></input>
//       </div>
//       {rgb.every((el) => el !== '') && (
//         <div className={`p-4 bg-[rgb(${rgb[0]},${rgb[1]},${rgb[2]})]`}></div>
//       )}
//     </>
//   );
// }

// function App() {
//   const [content, setContent] = useState('');
//   const list = Array(5)
//     .fill()
//     .map((el, i) => {
//       return { id: i, content: `Content of ${i + 1}` };
//     });

//   return (
//     <>
//       <ol className="flex gap-4">
//         {list.map((el) => (
//           <li
//             key={el.id}
//             className="grow cursor-pointer p-10 text-center bg-sky-50 border-4 border-transparent"
//             onMouseOver={() => setContent(el.content)}
//             onClick={(e) =>
//               e.target.className.includes('border-transparent')
//                 ? (e.target.className = e.target.className.replace(
//                     ' border-transparent',
//                     ''
//                   ))
//                 : (e.target.className += ' border-transparent')
//             }
//           >
//             {el.id + 1}
//           </li>
//         ))}
//       </ol>
//       <p className="text-center mt-4">{content}</p>
//     </>
//   );
// }

// function App() {
//   const [list, setList] = useState(
//     Array(10)
//       .fill()
//       .map(() => {
//         return { content: 'item', checked: false };
//       })
//   );
//   function handleOnClick(index) {
//     const newList = [...list];
//     newList[index].checked = !newList[index].checked;
//     setList(newList);
//   }
//   return (
//     <ol className="App flex flex-col">
//       {list.map((item, i) => (
//         <li
//           key={i}
//           className={`flex gap-4 ${
//             item.checked ? 'order-last opacity-50' : ''
//           }`}
//         >
//           <input
//             type="checkbox"
//             checked={item.checked}
//             onChange={() => handleOnClick(i)}
//           ></input>
//           <div>
//             {item.content} {i}
//           </div>
//         </li>
//       ))}
//     </ol>
//   );
// }

export default App;
