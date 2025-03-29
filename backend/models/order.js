import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    orderItems: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        enum: ["credit card", "paypal", "crypto"], 
        required: true 
    },
    isPaid: { 
        type: Boolean, 
        default: false 
    },
    isDelivered: { 
        type: Boolean, 
        default: false 
    },
   
  },
  { timestamps: true }
);

// Define the model
const orderModel = mongoose.model("Order", orderSchema);

// Export the model
export default orderModel;
