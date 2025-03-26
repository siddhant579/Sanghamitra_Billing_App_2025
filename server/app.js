const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // Increase timeout
    socketTimeoutMS: 60000, // Prevent early disconnection
    keepAlive: true, // Keep connection alive
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('DB Connection Error:', err));

// Routes
app.use('/api', require('./route/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
