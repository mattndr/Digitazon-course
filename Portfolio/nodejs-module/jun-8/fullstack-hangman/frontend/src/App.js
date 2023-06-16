import './App.css';
import { useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:3000';

function App() {
  const [gameSession, setGameSession] = useState(null);
  const [letter, setLetter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showInput, setShowInput] = useState(true);

  async function startNewGameSession() {
    const response = await fetch(`${SERVER_URL}/hangman`, {
      method: 'post',
      credentials: 'include',
    });
    if (response.ok) {
      setShowInput(true);
      setGameSession((await response.json()).data);
    }
  }

  async function sendLetter() {
    let response = await fetch(`${SERVER_URL}/hangman`, {
      method: 'put',
      credentials: 'include', // This here
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ letter }),
    });
    if (response.ok) {
      // response = await response.json();
      // console.log(response);
      // if (response.error) {
      //   setErrorMessage(response.message);
      //   return;
      // }
      response = await fetch(`${SERVER_URL}/hangman`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.wordToGuess) {
          data.guessedLetters = data.wordToGuess;
          setShowInput(false);
        }
        setGameSession(data);
      }
    }
  }

  useEffect(() => {
    setErrorMessage('');
    setLetter('');
  }, [gameSession]);

  return (
    <div className="App">
      <header className="border-b-2">
        <h1 className="text-2xl mt-8 pb-8">Hangman game</h1>
      </header>
      <main>
        <button
          onClick={startNewGameSession}
          className="my-16 p-3 bg-indigo-100 border-4 rounded-lg hover:bg-indigo-400 font-bold border-indigo-400"
        >
          Start new Game
        </button>
        <div>
          {gameSession && (
            <div className="border-4 rounded-xl w-[50%] mx-auto p-4 bg-white-50 border-indigo-200">
              <div className="flex flex-col items-center gap-16 border-2 rounded-lg bg-blue-100 p-16">
                <div>
                  {gameSession.guessedLetters.split('').map((letter, i) => (
                    <span
                      className="m-1 text-2xl font-bold text-indigo-700"
                      key={i}
                    >
                      {letter.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="pr-4 font-semibold">Chosen letters: </span>
                  {gameSession.chosenLetters
                    ? gameSession.chosenLetters.split('').join(', ')
                    : 'none'}
                </div>
                <div>
                  <span className="pr-4 font-semibold">
                    Remaining attempts:
                  </span>
                  {gameSession.remainingAttempts}
                </div>
                {gameSession.gameStatus && (
                  <div className="text-3xl font-bold text-indigo-700 mt-4 border-lg">
                    YOU {gameSession.gameStatus.toUpperCase()}!
                  </div>
                )}
              </div>
              {showInput && (
                <div className="mt-2">
                  <input
                    name="letter"
                    value={letter}
                    onChange={(event) => setLetter(event.target.value)}
                    className="mt-4 border-2 rounded-lg border-indigo-400"
                    placeholder="Insert a letter"
                  ></input>
                  <button
                    onClick={sendLetter}
                    className="border-2 border-gray-300 bg-blue-100 rounded-lg ml-3 py-1 px-2 hover:bg-indigo-200"
                  >
                    Send letter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <div className="mt-8 py-1 px-4 bg-red-100 w-fit mx-auto">
            {errorMessage}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
