import Menu from './components/Menu/Menu';
import { Outlet } from 'react-router-dom';

// utilizzo di librerie non viste in classe: si richiede di creare una applicazione React che sfrutti React Router.
// A sinistra deve esserci un menu di navigazione, e in centro il dettaglio del componente attuale, quando cliccate una voce del menu a sx, il dettaglio cambia.

function App() {
  return (
    <main className="app">
      <Menu />
      <div className="content">
        <h1>Glossary</h1>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
