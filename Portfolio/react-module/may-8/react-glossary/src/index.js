import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import GptApi from './components/GptApi/GptApi';
import WheelOfFortune from './components/WheelOfFortune/WheelOfFortune';
import Excel from './components/Excel/Excel';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Shop from './components/Shop/Shop';
import Posts from './components/Posts/Posts';
import Info from './components/Info/Info';
import Fetch from './components/Fetch';
import HooksBond2 from './components/UseEffectAndUseState2';
import './App.css';
import Chat from './components/Chat/Chat';
import ToDo from './components/ToDo/ToDo';
import InputTextCheck from './components/InputTextCheck/InputTextCheck';
import MovingButton from './components/MovingButton/MovingButton';
import Post from './components/Forum/Forum';
import GptWithYoutube from './components/GptWithYoutube/GptWithYoutube';

// Create a Browser Router and configure the first route.
const router = createBrowserRouter([
  // This first route is what we often call the "root route" since the rest of our routes will render inside of it
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'todo',
        element: <ToDo />,
      },
      {
        path: 'fetch',
        element: <Fetch />,
      },
      {
        path: 'hooks',
        element: <HooksBond2 />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      { path: 'todo', element: <ToDo /> },
      {
        path: 'inputCheck',
        element: <InputTextCheck />,
      },
      {
        path: 'gpt',
        element: <GptApi />,
      },
      {
        path: 'wheeloffortune',
        element: <WheelOfFortune />,
      },
      {
        path: 'excel',
        element: <Excel />,
      },
      {
        path: 'tictactoe',
        element: <TicTacToe />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'info',
        element: <Info />,
      },
      {
        path: 'movingbutton',
        element: <MovingButton />,
      },
      {
        path: 'forum',
        element: <Post />,
      },
      {
        path: 'gpt-youtube',
        element: <GptWithYoutube />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
