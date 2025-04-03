import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, deleteFromCart, updateCart } from "@/store/auth/cartSlice";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

function Cart() {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);

  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleIncrease = (id, currentQuantity) => {
    dispatch(updateCart({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 0) {
      dispatch(updateCart({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  function handleDeleteProduct(id) {
    dispatch(deleteFromCart({ id }));
  }
  return (
    <div style={{ padding: "20px" }} className="min-h-screen">
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
        {cartData.map((item, idx) => (
          <div
            key={idx}
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
              <p>
                Price: ₹{item.price ? item.price.toFixed(2) : "Not Available"}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => handleDecrease(item._id, item.quantity)}
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
                onClick={() => handleIncrease(item._id, item.quantity)}
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
              <button onClick={() => handleDeleteProduct(item._id)}>
                <MdDelete />
              </button>
            </div>

            <div style={{ marginLeft: "20px" }}>
              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-end">Grand Total: ₹{totalPrice}</h2>
      <div className="text-end mt-5">
      <Button>Buy Now</Button>
      </div>
    </div>
  );
}

export default Cart;
