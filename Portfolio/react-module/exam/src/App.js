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
import './App.css';
import { useEffect, useState } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';

function Main({ cart }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [searchContent, setSearchContent] = useState('');
  const [selectedCat, setSelectedCat] = useState(category || '');

  useEffect(() => {
    (async function getCategories() {
      const res = await fetch('https://dummyjson.com/products/categories');
      const categories = await res.json();
      setCategories(categories);
    })();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center gap-8 py-4 px-8 bg-gray-200">
        <h1
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
        </div>
        <div className="flex gap-4">
          <button
            className="flex gap-2 items-center rounded-lg py-1.5 px-3 bg-lime-500 hover:bg-lime-400 shadow-md"
            onClick={() => {
              setSelectedCat('');
              navigate('cart');
            }}
          >
            <ShoppingCartIcon className="h-6 w-6"></ShoppingCartIcon>
            <span>
              Cart (
              {cart && cart.reduce((res, current) => current.quantity + res, 0)}
              )
            </span>
          </button>
          <button className="flex gap-1.5 items-center	rounded-lg py-1.5 px-2.5 bg-gray-700 text-gray-50 hover:bg-gray-600 hover:text-gray-50 shadow-md">
            <UserIcon className="h-5 w-5"></UserIcon>
            <span>Account</span>{' '}
          </button>
        </div>
      </header>
      <main className="flex py-14 justify-evenly">
        <nav className="basis-[18%] border-r-4">
          <h2 className="text-xl font-bold mb-8 mx-[8%]">Categories</h2>
          <ul className="flex flex-col gap-1">
            {categories.map((cat, i) => (
              <li key={i}>
                <Link
                  to={`products/category/${cat}`}
                  className={`pl-[8%] mr-[15%] block rounded-lg hover:bg-lime-500 hover:font-bold ${
                    selectedCat === cat ? ' bg-gray-200' : ''
                  }`}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <section className="basis-[75%]">
          <Outlet></Outlet>
        </section>
      </main>
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main cart={cart} />}>
          <Route path="products">
            <Route
              path="category/:category"
              element={<Products setCart={setCart} />}
            ></Route>
            <Route
              path="search/:toSearch"
              element={<Products setCart={setCart} />}
            ></Route>
          </Route>
          <Route
            path="cart"
            element={<Cart cart={cart} setCart={setCart} />}
          ></Route>
        </Route>
        <Route
          index
          element={<Navigate to="products/category/smartphones" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
