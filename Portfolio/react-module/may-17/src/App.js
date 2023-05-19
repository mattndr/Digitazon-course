import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function Ciao() {
  return (
    <div>
      Ciao
      <Outlet />
    </div>
  );
}
function Ciao2() {
  return <div>Ciao2</div>;
}
function Hello() {
  return (
    <div>
      Hello
      <Outlet />
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ciao />}>
          <Route path="hello" element={<Hello />}>
            <Route path="ciao2" element={<Ciao2 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
