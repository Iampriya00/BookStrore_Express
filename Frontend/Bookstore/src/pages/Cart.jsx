import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCart } from "@/store/auth/cartSlice";

function Cart() {
  const dispatch = useAppDispatch();
  const booksdata = useAppSelector((state) => state.product);

  const [cartItems, setCartItems] = useState(
    booksdata.map((item) => ({ ...item, quantity: 1 }))
  );

  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const handleDecrease = (id) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else if (item._id === id && item.quantity === 1) {
          dispatch(deleteFromCart(id)); // Dispatch delete action
          return null; // Remove the item from updatedCart
        }
        return item;
      })
      .filter((item) => item !== null); // Filter out deleted items (those that returned null)

    setCartItems(updatedCart); // Update local state
    dispatch(updateCart(updatedCart)); // Update Redux state
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-between m-6">
        <h1 className="text-3xl">Cart</h1>
        <button
          onClick={() => handleClearCart()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Clear Cart
        </button>
      </div>

      <div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
            <div style={{ flex: "1" }}>
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price.toFixed(2)}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <button
                onClick={() => handleDecrease(item._id)}
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #ccc",
                  padding: "5px 15px",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#d3d3d3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f2f2f2")
                }
              >
                -
              </button>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "0 10px",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrease(item._id)}
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #ccc",
                  padding: "5px 15px",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#d3d3d3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f2f2f2")
                }
              >
                +
              </button>
            </div>

            <div style={{ marginLeft: "20px" }}>
              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-end">Grand Total: ₹{getTotalPrice()}</h2>
    </div>
  );
}

export default Cart;
