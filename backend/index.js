import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import authRoutes from './routes/auth.js'

const allowedOrigins = [
    'http://localhost:3000', // Development frontend

];

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();


// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies
};

app.use(cors(corsOptions));




// API Routes


app.use('/api/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
