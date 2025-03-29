import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Mandatory
    },
    email: {
      type: String,
      required: true, // Mandatory
    },
    password: {
      type: String,
      required: true, // Mandatory
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
   
  },
  { timestamps: true }
);

// Define the model
const userModel = mongoose.model("User", userSchema);

// Export the model
export default userModel;
