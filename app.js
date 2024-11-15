import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

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
app.use(cors());

// Helmet
app.use(helmet());

// Body parser
app.use(express.json());

// Mongo Sanitize
app.use(mongoSanitize());

import { getLeaderboard, checkUserExist, updateUserScore } from './controller.js';
// TODO: get all leaderboard, create new leaderboard on user, check user exist
app.get("/api/users", getLeaderboard)
app.get("/api/users/:name", checkUserExist)
app.post("/api/users/:name", updateUserScore)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});