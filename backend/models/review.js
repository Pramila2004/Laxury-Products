import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, max: 5 
    },
    comment: { 
        type: String 
    },
   
  },
  { timestamps: true }
);

// Define the model
const reviewModel = mongoose.model("Review", orderSchema);

// Export the model
export default reviewModel;
