import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 1499,
    img: "https://kreo-tech.com/cdn/shop/files/Artboard_1_9.png?v=1760334166",
    category: "Audio",
    desc: "Crystal clear sound and noise cancellation with 20-hour battery life."
  },
  {
    name: "Bluetooth Speaker",
    price: 999,
    img: "https://images.unsplash.com/photo-1580894894513-5410be3a7c2c",
    category: "Audio",
    desc: "Portable wireless speaker with rich bass and splash resistance."
  },
  {
    name: "Smart Watch",
    price: 2499,
    img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb",
    category: "Wearable",
    desc: "Track health, monitor sleep, and stay connected with notifications."
  },
  {
    name: "Gaming Mouse",
    price: 699,
    img: "https://images.unsplash.com/photo-1618498082410-bdbd532f88ed",
    category: "Accessories",
    desc: "Ergonomic RGB mouse with adjustable DPI and quick response time."
  },
  {
    name: "Mechanical Keyboard",
    price: 1999,
    img: "https://images.unsplash.com/photo-1612036782184-6c3d94b4a49b",
    category: "Accessories",
    desc: "Backlit mechanical keyboard with blue switches for tactile feedback."
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
