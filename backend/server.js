import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import CartItem from "./models/CartItem.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running successfully ✅");
});


app.get("/api/seed", async (req, res) => {
  try {
    const existing = await Product.find().limit(1);
    if (existing.length) return res.json({ message: "Already seeded" });

    const items = [
      { name: "Evergreen Long Dress L", price: 1499, image: "https://www.ordinaree.com/cdn/shop/files/DSC_8696.jpg?v=1756703522" },
      { name: "Casual Dress M", price: 999, image: "https://m.media-amazon.com/images/I/81yzyJMIf9L._AC_UY1100_.jpg" },
      { name: "Smart Watch", price: 2499, image: "https://imoostore.in/cdn/shop/files/imoo_Z1_Kids_Smart_Watch_-_Bamboo_Green.webp?v=1736401353&width=600" },
      { name: "Black Gown", price: 699, image: "https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/f/a/faawwgdrgo1gocw531.jpg" },
      { name: "Mechanical Keyboard", price: 1999, image: "https://www.popsci.com/wp-content/uploads/2022/02/12/mechanical-keyboard-with-rbg.jpg?quality=85" },
    ];

    await Product.insertMany(items);
    res.json({ message: "Seeded products successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/cart", async (req, res) => {
  try {
    const cart = await CartItem.find();
    let total = 0;
    const detailed = [];

    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      total += product.price * item.qty;
      detailed.push({
        _id: item._id,
        productId: item.productId,
        qty: item.qty,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }

    res.json({ cart: detailed, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/cart", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty)
      return res.status(400).json({ error: "productId and qty required" });

    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += Number(qty);
      await existing.save();
      return res.json(existing);
    } else {
      const created = await CartItem.create({
        productId,
        qty: Number(qty),
      });
      return res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/cart/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) total += product.price * item.qty;
    }

    
    await CartItem.deleteMany({});

    const receipt = {
      customer: {
        name: name || "Guest",
        email: email || "N/A",
      },
      total,
      purchasedItems: cartItems.length,
      date: new Date().toLocaleString(),
      message: "Thank you for shopping with us!",
    };

    res.json(receipt);
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed!" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
