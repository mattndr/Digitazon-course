import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loginDoneMsg, setLoginDoneMsg] = useState('');
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

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
      credentials: 'include',
    });
    if (response.ok) {
      const data = (await response.json()).data;
      localStorage.setItem('userId', data.userId);
      // Needed when registering a new course
      localStorage.setItem('fullName', data.fullName);
      navigate('/dashboard');
      // setLoginDoneMsg('Accesso effettuato');
      // setErrorMsg('');
    } else {
      setErrorMsg((await response.json()).message);
      setLoginDoneMsg('');
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center bg-gray-50">
      <h2 className="mt-12 text-2xl">Accedi</h2>
      {errorMsg && (
        <div className="bg-red-100 p-4 mx-[30%] mt-6 text-center">
          {errorMsg}
        </div>
      )}
      {!loginDoneMsg && (
        <form
          onSubmit={handleSubmit}
          className="[&_label]:block [&_input]:bg-gray-0 bg-blue-50 [&_input]:font-medium border-blue-200 rounded-lg signup-form flex flex-col gap-6 border-2 p-8"
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
            />
          </div>

          <div>
            <button
              type="submit"
              className="rounded-lg block py-3 px-4 mt-4 mx-auto text-center bg-cyan-400 hover:bg-cyan-500"
            >
              Accedi
            </button>
          </div>
        </form>
      )}
      {loginDoneMsg && (
        <>
          <div className="bg-green-50 p-4 mx-[30%] mt-8 text-center">
            {loginDoneMsg}
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="p-4 text-center bg-cyan-400 hover:cyan-500"
          >
            Vai ai corsi
          </button>
        </>
      )}
    </div>
  );
}
