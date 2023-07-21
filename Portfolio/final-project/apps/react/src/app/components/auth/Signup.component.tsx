import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from '../shared/ErrorMsg.component';
import DoneMsg from '../shared/DoneMsg.component';

export default function Signup() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [errorMsg, setErrorMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    registrationDate: '',
    phoneNumber: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    birthDate: '',
    address: {
      streetAddress: '',
      city: '',
      province: '',
    },
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
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        }
      );
      if (response.ok) {
        setDoneMsg('Utente registrato. Puoi procedere con il login.');
        setErrorMsg('');
      } else {
        setErrorMsg(
          response.headers.get('content-type').includes('application/json')
            ? (await response.json()).message
            : `${response.status} ${response.statusText}`
        );
        setDoneMsg('');
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errorMsg, doneMsg]);

  return (
    <section className="flex flex-col gap-8 items-center min-h-full">
      <h2 className="mt-24 mb-12 font-bold text-2xl">Registra un account</h2>
      {errorMsg && (
        <ErrorMsg message={errorMsg} customClasses="[&>div]:p-2"></ErrorMsg>
      )}
      {!doneMsg ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 py-8 px-20 mb-16 bg-gradient-to-r from-cyan-50 to-blue-100 border-t-4 border-cyan-500 [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_label]:text-lg	[&_input]:mt-3 [&_input]:text-lg [&_input]:border-l-0 [&_input]:mt-1 signup-form"
        >
          <div>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password" className="text-center">
              Password
              <div className="flex flex-col">
                <small>Lunghezza minima: 8 caratteri</small>
                <small>Almeno un carattere maiuscolo e un numero</small>
                <small>Almeno un carattere speciale</small>
              </div>
            </label>
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
            <label htmlFor="fullName.firstName">Nome</label>
            <input
              type="text"
              name="fullName.firstName"
              id="fullName.firstName"
              required
              value={inputs.fullName.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fullName.lastName">Cognome</label>
            <input
              type="text"
              name="fullName.lastName"
              id="fullName.lastName"
              required
              value={inputs.fullName.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Data di nascita</label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              required
              value={inputs.birthDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address.streetAddress">Indirizzo</label>
            <input
              type="text"
              name="address.streetAddress"
              id="address.streetAddress"
              required
              value={inputs.address.streetAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address.city">Comune</label>
            <input
              type="text"
              name="address.city"
              id="address.city"
              required
              value={inputs.address.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address.province">Provincia</label>
            <select
              id="address.province"
              name="address.province"
              required
              value={inputs.address.province || 'AG'}
              onChange={handleChange}
              className="p-1 bg-white"
            >
              <option value="AG">Agrigento</option>
              <option value="AL">Alessandria</option>
              <option value="AN">Ancona</option>
              <option value="AO">Aosta</option>
              <option value="AR">Arezzo</option>
              <option value="AP">Ascoli Piceno</option>
              <option value="AT">Asti</option>
              <option value="AV">Avellino</option>
              <option value="BA">Bari</option>
              <option value="BT">Barletta-Andria-Trani</option>
              <option value="BL">Belluno</option>
              <option value="BN">Benevento</option>
              <option value="BG">Bergamo</option>
              <option value="BI">Biella</option>
              <option value="BO">Bologna</option>
              <option value="BZ">Bolzano</option>
              <option value="BS">Brescia</option>
              <option value="BR">Brindisi</option>
              <option value="CA">Cagliari</option>
              <option value="CL">Caltanissetta</option>
              <option value="CB">Campobasso</option>
              <option value="CE">Caserta</option>
              <option value="CT">Catania</option>
              <option value="CZ">Catanzaro</option>
              <option value="CH">Chieti</option>
              <option value="CO">Como</option>
              <option value="CS">Cosenza</option>
              <option value="CR">Cremona</option>
              <option value="KR">Crotone</option>
              <option value="CN">Cuneo</option>
              <option value="EN">Enna</option>
              <option value="FM">Fermo</option>
              <option value="FE">Ferrara</option>
              <option value="FI">Firenze</option>
              <option value="FG">Foggia</option>
              <option value="FC">Forl&igrave;-Cesena</option>
              <option value="FR">Frosinone</option>
              <option value="GE">Genova</option>
              <option value="GO">Gorizia</option>
              <option value="GR">Grosseto</option>
              <option value="IM">Imperia</option>
              <option value="IS">Isernia</option>
              <option value="AQ">L'aquila</option>
              <option value="SP">La spezia</option>
              <option value="LT">Latina</option>
              <option value="LE">Lecce</option>
              <option value="LC">Lecco</option>
              <option value="LI">Livorno</option>
              <option value="LO">Lodi</option>
              <option value="LU">Lucca</option>
              <option value="MC">Macerata</option>
              <option value="MN">Mantova</option>
              <option value="MS">Massa-Carrara</option>
              <option value="MT">Matera</option>
              <option value="ME">Messina</option>
              <option value="MI">Milano</option>
              <option value="MO">Modena</option>
              <option value="MB">Monza e Brianza</option>
              <option value="NA">Napoli</option>
              <option value="NO">Novara</option>
              <option value="NU">Nuoro</option>
              <option value="OR">Oristano</option>
              <option value="PD">Padova</option>
              <option value="PA">Palermo</option>
              <option value="PR">Parma</option>
              <option value="PV">Pavia</option>
              <option value="PG">Perugia</option>
              <option value="PU">Pesaro e Urbino</option>
              <option value="PE">Pescara</option>
              <option value="PC">Piacenza</option>
              <option value="PI">Pisa</option>
              <option value="PT">Pistoia</option>
              <option value="PN">Pordenone</option>
              <option value="PZ">Potenza</option>
              <option value="PO">Prato</option>
              <option value="RG">Ragusa</option>
              <option value="RA">Ravenna</option>
              <option value="RC">Reggio Calabria</option>
              <option value="RE">Reggio Emilia</option>
              <option value="RI">Rieti</option>
              <option value="RN">Rimini</option>
              <option value="RM">Roma</option>
              <option value="RO">Rovigo</option>
              <option value="SA">Salerno</option>
              <option value="SS">Sassari</option>
              <option value="SV">Savona</option>
              <option value="SI">Siena</option>
              <option value="SR">Siracusa</option>
              <option value="SO">Sondrio</option>
              <option value="SU">Sud Sardegna</option>
              <option value="TA">Taranto</option>
              <option value="TE">Teramo</option>
              <option value="TR">Terni</option>
              <option value="TO">Torino</option>
              <option value="TP">Trapani</option>
              <option value="TN">Trento</option>
              <option value="TV">Treviso</option>
              <option value="TS">Trieste</option>
              <option value="UD">Udine</option>
              <option value="VA">Varese</option>
              <option value="VE">Venezia</option>
              <option value="VB">Verbano-Cusio-Ossola</option>
              <option value="VC">Vercelli</option>
              <option value="VR">Verona</option>
              <option value="VV">Vibo valentia</option>
              <option value="VI">Vicenza</option>
              <option value="VT">Viterbo</option>
            </select>
          </div>
          <div>
            <label htmlFor="phoneNumber">Numero di telefono</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              required
              value={inputs.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg block py-3 px-4 mt-10 mx-auto text-center bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
            >
              Registrati
            </button>
          </div>
        </form>
      ) : (
        <>
          <DoneMsg message={doneMsg} customClasses="[&>div]:p-2"></DoneMsg>
          <button
            onClick={() => navigate('/auth/login')}
            className="py-4 px-6 text-center text-xl rounded-lg bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-200"
          >
            Vai al login
          </button>
        </>
      )}
    </section>
  );
}
