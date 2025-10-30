import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:5000/api";

export default function CheckoutModal({ cart, setShowCheckout, refreshCart }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async () => {
    try {
      const formattedCart = cart.map((item) => ({
        productId: item.productId || item.product?._id,
        qty: item.qty,
      }));

      if (!formattedCart.length) {
        alert("Your cart is empty!");
        return;
      }

      const res = await axios.post(`${API}/checkout`, {
        cartItems: formattedCart,
        name: form.name,
        email: form.email,
      });

      setReceipt(res.data);
      refreshCart();
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert("Checkout failed! Please check your server and try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          width: 320,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {!receipt ? (
          <>
            <h3>Checkout</h3>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", marginBottom: 10 }}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: "100%", marginBottom: 10 }}
            />
            <div>
              <button
                onClick={handleSubmit}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 6,
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  marginLeft: 10,
                  padding: "8px 16px",
                  borderRadius: 6,
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Receipt</h3>
            <div>Total: ₹{receipt.total}</div>
            <div>At: {new Date(receipt.timestamp).toLocaleString()}</div>
            <div>
              Customer: {receipt.customer?.name || "-"} /{" "}
              {receipt.customer?.email || "-"}
            </div>
            <button
              style={{
                marginTop: 10,
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 6,
              }}
              onClick={() => setShowCheckout(false)}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
