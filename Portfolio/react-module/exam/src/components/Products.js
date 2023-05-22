import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Products({ setCart }) {
  const { category, toSearch } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    category &&
      (async function getProducts() {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const products = await res.json();
        setProducts(products.products);
      })();
    toSearch &&
      (async function getProducts() {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${toSearch}`
        );
        const products = await res.json();
        setProducts(products.products);
      })();
  }, [category, toSearch]);

  return (
    <>
      <header>
        {category && (
          <h2 className="mb-8 text-xl font-bold text-center">
            Category '{category}'
          </h2>
        )}
        {toSearch && (
          <h2 className="mb-8 text-xl font-bold text-center">
            Result of search '{toSearch}'
          </h2>
        )}
      </header>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((p) => (
          <Product key={p.id} product={p} setCart={setCart}></Product>
        ))}
      </div>
    </>
  );
}

function Product({ product, setCart }) {
  function updateCart() {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const index = newCart.findIndex((prod) => prod.id === product.id);
      if (index !== -1) {
        newCart[index].quantity += 1;
      } else {
        newCart.push({
          ...product,
          quantity: 1,
        });
      }
      console.log(newCart);
      return newCart;
    });
  }
  return (
    <article className="flex flex-col justify-between gap-6 basis-[30%] p-6 border-2 bg-gray-50 rounded-lg">
      <header className="text-lg font-bold text-center">{product.title}</header>
      <img
        src={product.images[0]}
        alt={product.id}
        width="200px"
        className="mx-auto"
      ></img>
      <p className="text-sm">{product.description}</p>
      <div>
        <p className="text-lg text-center">
          Price: <span className="pl-2">{product.price}€</span>
        </p>
        <button
          className="block mx-auto font-medium border-2 rounded-lg p-2 mt-4 mb-0 bg-lime-500 shadow-md hover:bg-lime-400"
          onClick={(product) => updateCart()}
        >
          ADD TO CART
        </button>
      </div>
    </article>
  );
}
