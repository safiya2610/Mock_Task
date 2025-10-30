import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  category: String,
  desc: String
});

const Product = mongoose.model("Product", productSchema);
export default Product;
