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
    dbName: 'Sanghamitra_Billing',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Short timeout for better debugging
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

// Root Route (Check Server)
app.get('/', (req, res) => {
    res.send('🚀 Server is Running on Vercel! Welcome to Sanghamitra Billing API.');
});

// API Routes
app.use('/api', require('./route/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
