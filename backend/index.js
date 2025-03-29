import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();


// Middleware




// API Routes



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
