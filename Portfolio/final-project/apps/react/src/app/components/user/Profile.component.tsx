import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const [updatingData, setUpdatingData] = useState(false);
  const [inputs, setInputs] = useState({
    description: '',
    presentationVideoUrl: '',
  });

  const updateSellerStatus = async (data) => {
    const dataToSend = data;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dataToSend),
        }
      );
      if (response.ok) {
        setUserData({ ...userData, ...dataToSend });
        setErrorMsg('');
        setDoneMsg('Il profilo è stato aggiornato');
        setUpdatingData(false);
      } else
        setErrorMsg(
          response.headers.get('content-type') === 'application/json'
            ? (await response.json()).message
            : `${response.status} ${response.statusText}`
        );
    } catch {
      setErrorMsg(
        errorMsg ? errorMsg + ' ' : 'Server momentaneamente non raggiungibile.'
      );
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userId-exp');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      if (response.ok) {
        navigate('/courses');
      } else {
        setErrorMsg(
          response.headers.get('content-type') === 'application/json'
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
    if (!userId) navigate('/auth/login');
    (async function getData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}/profile`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          const user = (await response.json()).data;
          setUserData(user);
          setErrorMsg('');
        } else {
          setErrorMsg(
            response.headers.get('content-type') === 'application/json'
              ? (await response.json()).message
              : `${response.status} ${response.statusText}`
          );
        }
      } catch {
        setErrorMsg(
          errorMsg
            ? errorMsg + ' '
            : 'Server momentaneamente non raggiungibile.'
        );
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(errorMsg);
  }, [errorMsg, doneMsg]);

  return (
    <div className="h-full flex flex-col gap-8 ">
      <div className="h-full pt-10">
        {errorMsg && (
          <ErrorMsg
            message={errorMsg}
            customClasses="mx-auto mb-12 w-[50%]"
          ></ErrorMsg>
        )}
        {doneMsg && (
          <DoneMsg
            message={doneMsg}
            setPropFunction={setDoneMsg}
            customClasses="mb-10 mx-[10%]"
          ></DoneMsg>
        )}
        {Object.keys(userData).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-center py-1 mb-10 mx-auto">
              Profilo
            </h2>
            <button
              className="text-lg w-fit px-8 mb-12 mx-auto rounded-lg py-1.5 px-2.5 bg-gray-700 text-gray-50 hover:bg-gray-600 hover:text-gray-50 shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className="pb-20">
              {userData['isSeller'] && (
                <div className="pt-20 border-b-2 border-b-gray-100 px-[25%] bg-gray-100">
                  <h3 className="text-xl mb-12 font-bold text-center">
                    Dettagli venditore
                  </h3>
                  <div className="flex flex-col gap-12 bg-white px-14 py-10 border-t-4 border-t-gray-500 [&_label]:font-bold">
                    <div className="flex flex-col gap-4">
                      {userData['isSeller'] && (
                        <div className="flex justify-end">
                          <button
                            className="p-2 border bg-gray-700 text-white whitespace-nowrap hover:bg-gray-600 rounded-lg active:bg-gray-500"
                            onClick={() => navigate(`/users/${userId}`)}
                          >
                            Visualizza il profilo pubblico
                          </button>
                        </div>
                      )}
                      <label htmlFor="description">Descrizione</label>
                      {updatingData ? (
                        <textarea
                          id="description"
                          name="description"
                          value={inputs.description}
                          className="bg-gray-50 border-l-4 border-gray-100 h-40 pl-2 py-2"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      ) : (
                        <div
                          id="description"
                          className="bg-white border-l-4 border-gray-200 pl-2 py-1"
                        >
                          {userData['sellerProfile']
                            ? userData['sellerProfile'].description
                              ? userData['sellerProfile'].description
                              : 'Nessuna descrizione impostata'
                            : 'Nessuna descrizione impostata'}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <label htmlFor="presentationVideoUrl">
                        Link al video di presentazione
                      </label>
                      <div className="flex justify-between items-center gap-6">
                        {updatingData ? (
                          <input
                            id="presentationVideoUrl"
                            name="presentationVideoUrl"
                            type="url"
                            value={inputs.presentationVideoUrl}
                            className="bg-gray-50 border-l-4 border-gray-100 pl-2 py-2 w-full"
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                presentationVideoUrl: e.target.value,
                              })
                            }
                          ></input>
                        ) : (
                          <div
                            id="presentationVideoUrl"
                            className="grow bg-white border-l-4 border-gray-200 pl-2"
                          >
                            {userData['sellerProfile']
                              ? userData['sellerProfile'].presentationVideoUrl
                                ? userData['sellerProfile'].presentationVideoUrl
                                : 'Nessun link impostato'
                              : 'Nessun link impostato'}
                          </div>
                        )}
                        <a
                          href={
                            inputs.presentationVideoUrl
                              ? inputs.presentationVideoUrl
                              : userData['sellerProfile']
                              ? userData['sellerProfile'][
                                  'presentationVideoUrl'
                                ]
                              : ''
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-gray-700 text-white whitespace-nowrap hover:bg-gray-600 rounded-lg active:bg-cyan-500"
                        >
                          Apri il link
                        </a>
                      </div>
                    </div>
                    {!updatingData ? (
                      <button
                        className="mt-10 mb-2 block w-min mx-auto py-3 px-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200 rounded-lg border w-full"
                        onClick={() => {
                          setInputs(userData['sellerProfile']);
                          setUpdatingData(true);
                        }}
                      >
                        <span className="whitespace-nowrap">
                          Modifica dettagli
                        </span>
                      </button>
                    ) : (
                      <div className="flex juistify-evenly">
                        <button
                          className="my-14 block w-min mx-auto py-3 px-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200 rounded-lg border w-full"
                          onClick={() =>
                            updateSellerStatus({ sellerProfile: inputs })
                          }
                        >
                          <span className="whitespace-nowrap">
                            Applica modifiche
                          </span>
                        </button>
                        <button
                          className="my-14 block w-min mx-auto py-3 px-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg border w-full"
                          onClick={() => setUpdatingData(false)}
                        >
                          <span className="whitespace-nowrap text-white">
                            Chiudi editor modifiche
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-between px-[25%] bg-gray-100 py-20 border-b-2 border-b-gray-100">
                <section className="w-fit">
                  <div className="flex flex-col w-fit items-start bg-gray-0">
                    <h3 className="my-4 text-xl w-full font-semibold text-center">
                      Informazioni personali
                    </h3>
                    <div className="flex flex-col w-fit bg-gray-200 mt-8 py-2 [&_div]:bg-white [&_div]:px-10 [&_div]:py-4">
                      <div>
                        <p className="font-semibold">Nome</p>
                        <p>
                          {userData['fullName'].firstName +
                            ' ' +
                            userData['fullName'].lastName}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Data di nascita</p>
                        <p>
                          {
                            new Date(userData['birthDate'])
                              .toLocaleString('it-IT')
                              .split(',')[0]
                          }
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Indirizzo</p>
                        <p className="flex gap-1">
                          <span>{userData['address']['streetAddress']},</span>
                          <span>{userData['address']['city']}</span>
                          <span>({userData['address']['province']})</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p>{userData['email']}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Numero di telefono</p>
                        <p>{userData['phoneNumber']}</p>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="flex flex-col gap-4 items-center my-4 h-fit bg-gray-0">
                  <p className="pb-1 px-2 text-xl font-semibold">
                    Tipologia di account
                  </p>
                  {userData['isSeller'] ? (
                    <p className="text-center text-lg bg-white text-md font-bold p-3 text-cyan-400 w-full">
                      Venditore
                    </p>
                  ) : (
                    <div className="w-full">
                      <div className="w-full">
                        <p className="text-center text-lg bg-white text-md font-bold p-3 text-cyan-400">
                          Standard
                        </p>
                      </div>
                      <button
                        className="mt-14 p-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200 rounded-lg border w-full"
                        onClick={() => updateSellerStatus({ isSeller: true })}
                      >
                        Diventa venditore
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
