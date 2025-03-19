const mysql = require("mysql2");
require("dotenv").config();

// Create MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,        // MySQL Server (Localhost)
    user: process.env.DB_USER,        // MySQL Username
    password: process.env.DB_PASS,    // MySQL Password
    database: process.env.DB_NAME,    // Database Name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed: ", err);
        return;
    }
    console.log("✅ MySQL Connected Successfully!");
});

module.exports = db;
