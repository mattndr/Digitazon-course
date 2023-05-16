// Crea un'applicazione React che visualizza una lista di prodotti e consente all'utente di aggiungere o rimuovere un prodotto dal carrello.

import { useState } from 'react';
import './Shop.css';

export default function Shop() {
  const products = [
    { id: 12, name: 'Ps5', price: 499.99 },
    { id: 23, name: 'Oppo Earbuds', price: 39.95 },
    { id: 28, name: 'Gaming Mouse', price: 25.99 },
    { id: 35, name: 'Gaming Keyboard', price: 59.99 },
    { id: 39, name: 'Usb drive 32Gb', price: 19.99 },
  ];
  const [cart, setCart] = useState([]);

  function addToCart(id) {
    const newCart = [...cart];
    newCart.push(products[products.findIndex((current) => current.id === id)]);
    setCart(newCart);
  }

  return (
    <div className="Shop">
      <h1>Shop</h1>
      <ProductsList products={products} addToCart={addToCart}></ProductsList>
      <Cart cart={cart} setCart={setCart}></Cart>
    </div>
  );
}

function Cart({ cart, setCart }) {
  function removeFromCart(id) {
    let newCart = [...cart].filter((current) => current.id !== id);
    setCart(newCart);
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ol>
        {cart.map((current, i) => (
          <li key={i} className="cartItem">
            <div>
              {current.name} {current.price}
            </div>
            <button onClick={() => removeFromCart(current.id)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProductsList({ products, addToCart }) {
  return (
    <>
      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <Product key={p.id} product={p} addToCart={addToCart}></Product>
        ))}
      </div>
    </>
  );
}

function Product({ product, addToCart }) {
  return (
    <div className="product">
      <div>
        <div>
          <b>{product.name}</b>
        </div>
        <br></br>
        <small>{product.price}</small>
      </div>
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  );
}
