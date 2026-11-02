import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.send("Invalid email or password");
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.send("Invalid email or password");
        }

        res.send("Login Successful");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;