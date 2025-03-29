import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 1 
    },
    images: [
        { type: String }
    ], // Array of image URLs
    ratings: { 
        type: Number, 
        default: 0 
    },
    numReviews: { 
        type: Number, 
        default: 0 
    },
  },
  { timestamps: true }
);

// Define the model
const productModel = mongoose.model("Product", productSchema);

// Export the model
export default productModel;
