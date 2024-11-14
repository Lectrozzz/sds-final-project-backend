import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async() =>{
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    try {
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const app = express();
const port = process.env.PORT || 3000;
await connectDB();

// CORS
const cors = require("cors");
app.use(cors());

// Helmet
const helmet = require("helmet");
app.use(helmet());

// Body parser
app.use(express.json());

// Mongo Sanitize
app.use(mongoSanitize());

// Http Parameter Pollution
app.use(hpp());

// XSS Sanitizer
app.use(xss());

import { getLeaderboard, checkUserExist, updateUserScore } from './controller.js';
// TODO: get all leaderboard, create new leaderboard on user, check user exist
app.get("/api/users", getLeaderboard)
app.get("/api/users/:name", checkUserExist)
app.post("/api/users/:name", updateUserScore)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});