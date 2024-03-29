import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';

export default function Login() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [errorMsg, setErrorMsg] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
          credentials: 'include',
        }
      );
      if (response.ok) {
        const data = (await response.json()).data;
        localStorage.setItem('userId', data.userId);
        localStorage.setItem(
          'userId-exp',
          (
            new Date().getTime() +
            parseInt(import.meta.env.VITE_COOKIE_LASTINGTIMEINMS, 10)
          ).toString()
        );
        navigate('/courses', { replace: true });
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
    if (userId) navigate('/courses');
  }, []);

  return (
    <section className="flex flex-col gap-12 items-center bg-white h-full">
      <h2 className="mt-24 text-2xl font-bold">Accedi</h2>
      {errorMsg && (
        <ErrorMsg message={errorMsg} customClasses="[&>div]:p-2"></ErrorMsg>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-12 pt-12 px-20 pb-20 border-t-4 border-cyan-500 text-center bg-gradient-to-r from-cyan-50 to-blue-100 [&_label]:block [&_label]:text-xl [&_input]:border-l-0 [&_input]:h-8 [&_input]:bg-white [&_input]:mt-2 [&_input]:text-lg"
      >
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={inputs.password}
            onChange={handleChange}
            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-lg block py-3 px-4 mt-4 mx-auto text-center text-xl bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
          >
            Accedi
          </button>
        </div>
      </form>
    </section>
  );
}
