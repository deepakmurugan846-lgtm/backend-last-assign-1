import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username = "", name = "", mobile = "", gender = "", email = "", password = "" } = req.body || {};

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("Email Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            name,
            mobile,
            gender,
            email,
            password: hashedPassword
        });

        await user.save();
        res.send("Registration Successful");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;