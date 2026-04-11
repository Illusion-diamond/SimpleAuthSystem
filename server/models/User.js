import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  product_id: String,
  Name: String,
  order_id: String,
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;