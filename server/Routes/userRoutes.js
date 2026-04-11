import express from "express";
import User from "../models/user.js";

const router = express.Router();


// CREATE (Already done)
router.post("/register", async (req, res) => {
  try {
    const { product_id, Name, order_id } = req.body;

    const prod = new User({ product_id, Name, order_id });
    const savedproduct = await prod.save();

    res.status(201).json(savedproduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// READ ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await User.find(); // fetch all
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// READ SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await User.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const { product_id, Name, order_id } = req.body;

    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      { product_id, Name, order_id },
      { new: true } // return updated data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await User.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;