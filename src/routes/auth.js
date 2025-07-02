import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '.././models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
    
        if (!username || !password)
            return res.status(400).json({ message: 'Username and password are required.' });

        const existingUser = await User.findone({ username });
        if (existingUser) {
            console.log("A user already exists with that username");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, streak: 0 });

        await newUser.save();
        res.status(201).json({message: "User created successfully!"});
    }

    catch (error) {
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
})