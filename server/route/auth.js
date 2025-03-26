const express = require("express");
const router = express.Router();
const Bill = require("../model/billing_schema");

// GET: Fetch all bills
router.get("/get_bills", async (req, res) => {
    try {
        const bills = await Bill.find().sort({ createdAt: -1 });
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// POST: Create a new bill
router.post("/add_bill", async (req, res) => {
    try {
        const { userName, userContact, products, totalPrice, paymentMode } = req.body;

        // Validate required fields
        if (!userName || !products || !totalPrice || !paymentMode) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new bill
        const newBill = new Bill({
            userName,
            userContact,
            products,
            totalPrice,
            paymentMode,
        });

        await newBill.save();
        res.status(201).json({ message: "Bill added successfully", bill: newBill });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
