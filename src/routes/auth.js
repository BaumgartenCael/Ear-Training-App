import express from 'express';
import bcrypt from 'bcrypt';
import User from '.././models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
    
        if (!username || !password)
            return res.status(400).json({ message: 'Username and password are required.' });

        const existingUser = await User.findOne({ username });
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

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
    
        if (!username || !password)
            return res.status(400).json({ message: 'Username and password are required.' });

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        const checkPassword = await bcrypt.compare(password, existingUser.password)
        if (!checkPassword) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
        console.log("Session now: ", req.session);
        req.session.userId = existingUser._id;
        console.log("UserID: ", req.session.userId);
        res.status(200).json({message: "Logged in successfully!"});
    }

    catch (error) {
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
})

router.post('/updateStreak', async (req, res) => {
    try {
        console.log("Session: ", req.session);
        console.log("Session id", req.session.userId);
        await User.updateOne(
        {_id: req.session.userId },
        {$inc: {streak: 1}},)
        res.status(200).json({message: 'Streak updated successfully'});
        }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating score." });
    }
});

router.get('/getStreak', async (req, res) => {
    try {
        console.log("Attempting to get streak: ", req.session.userId);
        const currentUser = await User.findOne({_id: req.session.userId});
        if (!currentUser) {
            return res.status(404).json({ message: "User not found." });
        }
        console.log(" Found user!")
        res.json({streak: currentUser.streak});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching score."});
    }
})


export default router;