import userModel from '../models/user.js';
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'


export const register= async(req,res)=>{

    try {
        const { username, email, password, phone, address } = req.body;
        
        // Check if user already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        // Save user to the database
        await newUser.save();

        return res.status(200).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        });

        const { password: userPassword, ...safeUser } = user._doc;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: safeUser,
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
      // Clear the authentication cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });
  
      // Send success response
      res.status(200).json({ message: "User Logged Out" });
    } catch (error) {
      console.error("Logout Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  