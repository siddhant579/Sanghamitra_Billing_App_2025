const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DATABASE, {
    dbName: 'Sanghamitra_Billing', // Ensure correct DB name
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Avoid long wait times
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

// Root Route (For Server Check)
app.get('/', (req, res) => {
    res.send('🚀 Server is Running on Vercel! Welcome to Sanghamitra Billing API.');
});

// Routes
app.use('/api', require('./route/auth'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
