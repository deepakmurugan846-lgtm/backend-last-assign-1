import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';

dotenv.config();

const app = express();
app.use(express.json());


connectDB();


app.use('/register', registerRoute);
app.use('/login', loginRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});