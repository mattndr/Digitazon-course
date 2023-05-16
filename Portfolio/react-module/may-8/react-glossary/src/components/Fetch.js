import { useState, useEffect } from 'react';

function Fetch() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      let res = await fetch('https://fakestoreapi.com/products');
      let json = await res.json();
      setProducts(json);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <h2>Fetch</h2>
      {products.map((prod) => (
        <div key={prod.id}>
          <h2>{prod.title}</h2>
          <img src={prod.image} alt={prod.title} width="100px"></img>
        </div>
      ))}
    </>
  );
}

export default Fetch;
