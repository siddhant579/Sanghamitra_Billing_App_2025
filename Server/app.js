const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());



// Routes
const billRoutes = require("./routes/auth");
app.use("/api", billRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
