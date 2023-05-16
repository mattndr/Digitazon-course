import './Forum.css';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu/Menu';

function Forum() {
  return (
    <div className="Forum">
      <header>
        <h1>Il mio forum</h1>
      </header>
      <main>
        <Menu />
        <Outlet />
      </main>
    </div>
  );
}

export default Forum;
