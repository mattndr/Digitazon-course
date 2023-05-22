export default function Cart({ cart, setCart }) {
  function updateCart(id) {
    const index = cart.findIndex((prod) => prod.id === id);
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }
  return (
    <>
      <header>
        <h2 className="mb-8 text-xl font-bold text-center">Cart</h2>
      </header>
      <div className="w-min p-8 border-2 mx-auto rounded-lg bg-gray-50">
        {cart && cart.length > 0 ? (
          <>
            <div className="flex w-min mx-auto rounded-lg bg-gray-50">
              <table className="text-center mx-auto">
                <thead>
                  <tr className="[&_th]:px-10 [&_th]:pb-4">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.price}€</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="border bg-gray-200 rounded-lg hover:bg-gray-300 px-1"
                          onClick={() => updateCart(product.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="block bg-lime-500 py-2 px-4 mx-auto rounded-lg mt-10 hover:bg-lime-400 font-bold shadow-md">
              CHECKOUT
            </button>
          </>
        ) : (
          <div className="whitespace-nowrap text-center px-20">
            <div>Cart is empty</div>
          </div>
        )}
      </div>
    </>
  );
}
