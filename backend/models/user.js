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
    avatar: {
      type: String,
      default: 'images/user.png',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    bio: {
      type: String,
      default: '',
    },
    likedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe', // Assuming a Recipe model exists
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Define the model
const userModel = mongoose.model("User", userSchema);

// Export the model
export default userModel;
