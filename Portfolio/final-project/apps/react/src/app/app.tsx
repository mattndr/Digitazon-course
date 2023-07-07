// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Courses from './components/Courses.component';
import Login from './components/auth/Login.component';
import Signup from './components/auth/Signup.component';
import Dashboard from './components/Dashboard.component';
import CourseManagement from './components/courses/CourseManagement.component';
import { GuardedRoute } from 'react-router-guards';

function Main() {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      localStorage.removeItem('userId');
      navigate('/courses');
    } else console.log('Logout non effettuato');
  }

  return (
    <>
      <header className="flex justify-between items-center gap-8 py-4 px-8 bg-gray-200">
        Header
        {/* <h1
          className="text-2xl font-bold bg-lime-500 py-2 px-4 cursor-pointer"
          onClick={() => navigate('')}
        >
          My Store
        </h1>
        <div className="flex basis-[30%]">
          <input
            placeholder="Search a product"
            className="border-2 border-gray-300 p-1 rounded-lg rounded-r-none border-r-0 w-full placeholder:pl-3"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          ></input>
          <button
            className="border-3 rounded-lg py-1 px-2 rounded-l-none border-l-0 text-white bg-gray-700 hover:bg-gray-600"
            onClick={() => {
              if (!searchContent) return;
              setSearchContent('');
              setSelectedCat('');
              navigate(`products/search/${searchContent}`);
            }}
          >
            Search
          </button>
          </div> */}
        <div className="flex gap-4">
          {!localStorage.getItem('userId') && (
            <>
              {' '}
              <button
                className="flex gap-2 items-center rounded-lg py-1.5 px-3 bg-lime-500 hover:bg-lime-400 shadow-md"
                onClick={() => navigate('auth/login')}
              >
                Accedi
              </button>
              <button
                className="flex gap-1.5 items-center	rounded-lg py-1.5 px-2.5 bg-gray-700 text-gray-50 hover:bg-gray-600 hover:text-gray-50 shadow-md"
                onClick={() => navigate('auth/signup')}
              >
                Registrati
              </button>{' '}
            </>
          )}
          {localStorage.getItem('userId') && (
            <button
              className="flex gap-1.5 items-center	rounded-lg py-1.5 px-2.5 bg-gray-700 text-gray-50 hover:bg-gray-600 hover:text-gray-50 shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>{' '}
        */
      </header>
      <main>
        <section className="basis-[75%]">
          <Outlet></Outlet>
        </section>
      </main>
    </>
  );
}
const check = async (to, from, next) => {
  throw new Error(`Not allowed.`);
  next();
  // const { name } = to.match.params;
  // try {
  //   const pokemon = await api.pokemon.get(name);
  //   next.props({ pokemon });
  // } catch {
  //   throw new Error(`Pokemon "${name}" does not exist.`);
  // }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <GuardedRoute
          guards={[check]}
          path="courses"
          element={<Courses />}
        ></GuardedRoute>
        <Route path="auth">
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route
          path="/courses/:courseId/management"
          element={<CourseManagement />}
        ></Route>
      </Route>
      <Route index element={<Navigate to="courses" />} />
    </Routes>
  );
}

export default App;
