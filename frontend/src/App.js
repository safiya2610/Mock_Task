import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Scroll from "./ScrollImage/Scroll";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";
import ProductGrid from "./ProductGrid/ProductsGrid";

const API = process.env.REACT_APP_API || "http://localhost:5000/api";


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const loadProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const loadCart = async () => {
    const res = await axios.get(`${API}/cart`);
    setCart(res.data.cart || []);
    setTotal(res.data.total || 0);
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const addToCart = async (productId) => {
    await axios.post(`${API}/cart`, { productId, qty: 1 });
    loadCart();
  };

  const removeFromCart = async (id) => {
    await axios.delete(`${API}/cart/${id}`);
    loadCart();
  };

  const updateQty = async (id, qty) => {
    if (qty <= 0) {
      await removeFromCart(id);
      return;
    }
    const item = cart.find((c) => c._id === id);
    if (!item) return;
    await axios.delete(`${API}/cart/${id}`);
    await axios.post(`${API}/cart`, { productId: item.productId, qty });
    loadCart();
  };

  const handleCheckout = () => setShowCheckout(true);

  return (
    <div className="app">
      <Navbar />
      <Scroll />
      <h2 className="text">Latest Drop</h2>
      <h4 className="text2">Grab our freshest designs before they sell out!</h4>
       
       <ProductGrid />

      <h1 className="text">Products</h1>
      <div height="2600px" >
     <main className="main" height="2600px">
      
  <ProductList products={products} onAdd={addToCart} />
</main></div>
<div
  className="cart-section"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#fff", 
  }}
>
  <h1 className="text">Add to Cart</h1>
  <Cart
    className="C"
    cart={cart}
    total={total}
    onRemove={removeFromCart}
    onUpdate={updateQty}
    onCheckout={handleCheckout}
  />
</div>


    {showCheckout && (
  <CheckoutModal
    cart={cart}
    setShowCheckout={setShowCheckout}
    refreshCart={loadCart}
  />
)}

<img
  src="https://www.shutterstock.com/image-vector/banner-announcing-mega-discount-half-600nw-1962489325.jpg"
  style={{
    height: "400px",
    width: "100%"
  }}
  alt="Mega Discount Banner"
/>

 <footer
        style={{
          backgroundColor: "#FC5552",
          color: "#fff",
          textAlign: "center",
          padding: "20px 10px",
          marginTop: "40px",
          fontSize: "14px"
        }}
      >
        <p>© {new Date().getFullYear()} ShopEase. All Rights Reserved.</p>
        <p>
         Task Given by <strong>Nexora</strong>
        </p>
      </footer>

    </div>
  );
}

export default App;
