import mongoose from "mongoose";
import Product from "../models/product.js"; // Assuming Product model exists
import User from '../models/user.js'
// Create a Product
export const createProduct = async (req, res) => {
    const {
        name,
        description,
        brand,
        category,
        price,
        stock,
        images,
    } = req.body;

    try {
        // Validate required fields
        if (!name || !description || !brand || !category || !price || !stock) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Create new product instance
        const newProduct = new Product({
            name,
            description,
            brand,
            category,
            price,
            stock,
            images: images || [], // Default to empty array if no images provided

        });

        // Save the product
        const savedProduct = await newProduct.save();

        res.status(200).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products
      res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
      console.error("Database Error:", error.message); // Debug errors
      res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
  };

  export const wishlistProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid user or product ID" });
        }

        // Find user and ensure wishlist array is initialized
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.wishlist = user.wishlist || [];

        // Toggle wishlist status
        const productIndex = user.wishlist.indexOf(productId);
        if (productIndex !== -1) {
            user.wishlist.splice(productIndex, 1);
        } else {
            user.wishlist.push(productId);
        }
        
        await user.save();
        res.status(200).json({ message: "Wishlist updated", wishlist: user.wishlist });
    } catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve product", error: error.message });
    }
};

  