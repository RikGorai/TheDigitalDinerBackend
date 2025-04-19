require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongo.db');
const { sequelize, initModels } = require('./models/sequelize');

// Routes
const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// Configure CORS to allow requests from the specific frontend URL
const allowedOrigins = ['http://localhost:5173', 'https://resonant-llama-ab3a73.netlify.app']; // Add your frontend URLs
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies and credentials
}));

app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectMongo();
    await initModels();
    console.log(`Server running at http://localhost:${PORT}`);
});
