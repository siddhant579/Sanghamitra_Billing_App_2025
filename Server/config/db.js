const mysql = require("mysql2");
const { Client } = require("pg");
require("dotenv").config();

// Get Database Type from Environment Variable
const DATABASE = process.env.DATABASE || "mysql";

let db;

if (DATABASE === "mysql") {
    db = mysql.createConnection({
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
} else if (DATABASE === "postgres") {
    db = new Client({
        connectionString: process.env.DATABASE || "postgresql://postgres:Siddhant188@db.wociyauemqdioopihmyy.supabase.co:5432/postgres"
    });

    // Connect to PostgreSQL
    db.connect((err) => {
        if (err) {
            console.error("PostgreSQL Connection Failed: ", err);
            return;
        }
        console.log("✅ PostgreSQL Connected Successfully!");
    });
} else {
    console.error("❌ Unsupported Database Type: ", DATABASE);
}

module.exports = db;
