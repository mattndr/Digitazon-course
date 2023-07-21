import styles from './app.module.css';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Courses from './components/courses/Courses.component';
import Login from './components/auth/Login.component';
import Signup from './components/auth/Signup.component';
import Dashboard from './components/dashboard/Dashboard.component';
import CourseManagement from './components/courses/CourseManagement.component';
import Profile from './components/user/Profile.component';
import CourseDetails from './components/courses/CourseDetails.component';
import UserDetails from './components/user/UserDetails.component';
import { useEffect, useState } from 'react';
import ErrorMsg from './components/shared/ErrorMsg.component';

function Main() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [searchContent, setSearchContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <>
      <header className="flex justify-between items-center gap-8 py-7 px-20 bg-cyan-600 border-b-4 border-gray-600 bg-gradient-to-r from-cyan-400 to-blue-500">
        <div className="basis-[33%]">
          <h1
            className="text-3xl font-mono w-fit font-bold cursor-pointer rounded-full px-8 py-2 border-l-8 border-l-cyan-200 border-r-8 border-r-gray-700 hover:bg-cyan-200 active:bg-cyan-100"
            onClick={() => navigate('/courses')}
          >
            Nextep
          </h1>
        </div>
        <div className="flex basis-[33%]">
          <input
            placeholder="Cerca un corso"
            className="border-2 border-gray-300 p-1 h-10 rounded-lg rounded-r-none border-r-0 w-full placeholder:pl-3"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          ></input>
          <button
            className="border-3 rounded-lg py-1 px-4 rounded-l-none border-l-0 text-white bg-gray-700 hover:bg-gray-600"
            onClick={() => {
              if (!searchContent) return;
              setSearchContent('');
              navigate(`/courses?search=${searchContent}`);
            }}
          >
            Cerca
          </button>
        </div>
        <div className="flex basis-[33%] gap-7 justify-end">
          {!userId && (
            <>
              <button
                className="text-xl rounded-lg py-1.5 px-6 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 shadow-md"
                onClick={() => navigate('auth/login')}
              >
                Accedi
              </button>
              <button
                className="text-lg rounded-lg py-1.5 px-4 bg-gray-700 text-gray-50 hover:bg-gray-600 active:bg-gray-500 hover:text-gray-50 shadow-md"
                onClick={() => navigate('auth/signup')}
              >
                Registrati
              </button>{' '}
            </>
          )}
          {userId && (
            <>
              <button
                className="text-xl font-bold rounded-lg py-1.5 px-8 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 shadow-md"
                onClick={() => navigate(`/courses`)}
              >
                Corsi
              </button>
              <button
                className="text-xl font-bold rounded-lg py-1.5 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 shadow-md"
                onClick={() => navigate(`/dashboard`)}
              >
                Dashboard
              </button>
              <button
                className="text-xl rounded-lg py-1.5 px-5 bg-gray-700 text-gray-50 hover:bg-gray-600 active:bg-gray-500 hover:text-gray-50 shadow-md"
                onClick={() => navigate(`/profile`)}
              >
                Profilo
              </button>
            </>
          )}
        </div>
      </header>
      <main>
        {errorMsg && (
          <ErrorMsg message={errorMsg} setPropFunction={setErrorMsg}></ErrorMsg>
        )}
        <Outlet></Outlet>
      </main>
    </>
  );
}

function CheckLocalStorage({ component }) {
  const navigate = useNavigate();
  useEffect(() => {
    const cookieExpTime = localStorage.getItem('userId-exp');
    if (!cookieExpTime) {
      return;
    }
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > parseInt(cookieExpTime, 10)) {
      // If the item is expired, delete the item from storage
      localStorage.removeItem('userId');
      localStorage.removeItem('userId-exp');
      navigate('/auth/login', { replace: true });
    }
  }, []);
  return <>{component}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="users/:userId" element={<UserDetails />}></Route>
        <Route path="courses" element={<Courses />}></Route>
        <Route path="courses/:courseId" element={<CourseDetails />}></Route>
        <Route path="auth">
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Route>
        <Route
          path="dashboard"
          element={<CheckLocalStorage component={<Dashboard />} />}
        ></Route>
        <Route
          path="profile"
          element={<CheckLocalStorage component={<Profile />} />}
        ></Route>
        <Route
          path="courses/:courseId/management"
          element={<CheckLocalStorage component={<CourseManagement />} />}
        ></Route>
      </Route>
      <Route index element={<Navigate to="courses" />} />
    </Routes>
  );
}

export default App;
