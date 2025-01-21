const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const Task = require('./models/task.model.js');
const TaskRoute = require('./routes/task.route.js');

// Load environment variables
dotenv.config();

// Verify environment variables are set
if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    console.error('Error: Clerk environment variables are not set');
    process.exit(1);
}

const app = express();

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Add error logging middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
});

// Modify your route to include more logging
app.use('/api/tasks', (req, res, next) => {
    // console.log('Auth headers:', req.headers.authorization);
    next();
}, ClerkExpressRequireAuth(), TaskRoute);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to the database')
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log('Connection failed')
});