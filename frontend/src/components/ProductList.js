import React from "react";

export default function ProductList({ products, onAdd }) {
  return (
    <section className="product-grid" aria-label="Products" style={{
      height:"400px",
    }}>
      {products.map((p) => (
        <div className="card" key={p._id}>
          <img
            src={p.img}
            alt={p.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            
            }}
            onError={(e) => {
              e.target.src = "https://www.popsci.com/wp-content/uploads/2022/02/12/mechanical-keyboard-with-rbg.jpg?quality=85";
            }}
          />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button className="button add" style={{
            backgroundColor:"#FC5552",
          }} onClick={() => onAdd(p._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
}
