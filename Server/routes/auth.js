const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST: Create a new bill
router.post("/add_bill", (req, res) => {
    const { userName, userContact, products, totalPrice, paymentMode } = req.body;

    if (!userName || !userContact || !products || products.length === 0) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Insert into Bills Table
    const sqlBill = "INSERT INTO bills (userName, userContact, totalPrice, paymentMode) VALUES (?, ?, ?, ?)";
    db.query(sqlBill, [userName, userContact, totalPrice, paymentMode], (err, result) => {
        if (err) return res.status(500).json({ message: "Error inserting bill", error: err });

        const billId = result.insertId;

        // Insert into Products Table
        const sqlProduct = "INSERT INTO products (bill_id, productName, quantity, price) VALUES ?";
        const productValues = products.map(product => [billId, product.productName, product.quantity, product.price]);

        db.query(sqlProduct, [productValues], (err, result) => {
            if (err) return res.status(500).json({ message: "Error inserting products", error: err });

            res.status(201).json({ message: "Bill created successfully!", billId });
        });
    });
});






// GET: Fetch all bills
router.get("/get_bills", (req, res) => {
    const sql = "SELECT * FROM bills ORDER BY createdAt DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching bills", error: err });
        res.status(200).json(result);
    });
});

// GET: Fetch a single bill with products
router.get("/id", (req, res) => {
    const query = `SELECT b.billId, 
            b.userName, 
            b.userContact, 
            b.totalPrice, 
            b.paymentMode, 
            b.createdAt, 
            p.productName,
            p.quantity,
            p.price
        FROM 
            bills b
        
        JOIN 
            products p ON b.billId = p.bill_id
    `;
    
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching bills", error: err });
        res.status(200).json(result);
    });
});

module.exports = router;
