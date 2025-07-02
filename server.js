import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/auth.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
app.use('/api', router);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});