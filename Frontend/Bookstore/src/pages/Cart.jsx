import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeProduct, clearCart } from "./cartSlice"; // Assuming actions are in cartSlice

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  // Add product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Remove product from cart
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id }));
  };

  // Clear all products from the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Cart</h1>

      <button
        onClick={() =>
          handleAddToCart({ id: 1, name: "Example Product", price: 100 })
        }
      >
        Add Product
      </button>

      <button onClick={handleClearCart}>Clear Cart</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
