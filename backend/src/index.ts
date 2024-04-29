import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

interface User {
    username: string;
    email: string;
    password: string;
}

const users: Record<string, User> = {};

// POST /api/register
app.post('/api/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).send('Username, email, and password are required.');
    }

    if (users[email]) {
        return res.status(409).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[email] = { username, email, password: hashedPassword };
    res.status(201).send('User registered.');
});

// POST /api/login
app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users[email];
    if (!user) {
        return res.status(404).send('User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).send({ message: 'Logged in successfully.', token });
});

// POST /api/logout
app.post('/api/logout', (req: Request, res: Response) => {
    res.status(200).send('User logged out.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
