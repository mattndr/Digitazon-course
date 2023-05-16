import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Forum from './Forum';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Post from './components/Post/Post';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Forum />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'posts/:postId',
        element: <Post />,
      },
    ],
  },
  {
    path: 'error',
    element: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
