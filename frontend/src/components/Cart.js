import React from "react";

export default function Cart({ cart, total, onRemove, onUpdate, onCheckout }) {
  return (
    <aside
      className="cart"
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        width: "320px",
        margin: "20px auto",
      }}
      aria-label="Cart"
    >
      

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              <strong style={{ display: "block", fontSize: "1rem" }}>
                {item.product.name}
              </strong>
              <div style={{ color: "#666", marginTop: "4px" }}>
                Price: ₹{item.product.price}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => onUpdate(item._id, item.qty - 1)}
                  style={{
                    border: "none",
                    background:"#ef4444",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span style={{ fontWeight: "bold" }}>{item.qty}</span>
                <button
                  onClick={() => onUpdate(item._id, item.qty + 1)}
                  style={{
                    border: "none",
                    background: "#ef4444",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",

                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onRemove(item._id)}
                style={{
                  marginTop: "8px",
                  background: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "center", color: "#222" }}>Total: ₹{total}</h3>

          <button
            onClick={onCheckout}
            style={{
              width: "100%",
              background: "#4CAF50",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              marginTop: "10px",
            }}
          >
            Checkout
          </button>
        </>
      )}
    </aside>
  );
}
