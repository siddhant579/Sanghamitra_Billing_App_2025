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
    dbName: 'Sanghamitra_Billing',  // Explicitly set the database name
    serverSelectionTimeoutMS: 5000, // Shorten timeout for faster error feedback
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('DB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('🚀 Server is Running! Welcome to Sanghamitra Billing API.');
});

// Routes
app.use('/api', require('./route/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
