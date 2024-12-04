import express from 'express';
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import testRouter from "./routers/testRouter.js";
import groupsRouter from './routers/groupsRouter.js'


const app = express();


//Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/user", userRouter);

app.use("/groups", groupsRouter);

app.use("/test", testRouter);//TEST





//General error handling
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
});


export default app;






/*
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Secret key for JWT (in production, store this in your .env file)
const JWT_SECRET = "your_super_secret_key";

// Mock database (use a real database in production, e.g., MongoDB or PostgreSQL)
const users = [];


// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
    });
};

// Signup route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and store in mock database
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    // Respond with a success message
    res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken(user);

    // Respond with token
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user; // Store user info in request object
        next();
    });
};

// Protected route
app.get("/", authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}!`, user: req.user });
});
*/
