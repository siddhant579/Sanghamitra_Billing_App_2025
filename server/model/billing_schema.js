const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const billSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userContact: { type: String, required: false },
    products: [productSchema], // Array of selected products
    totalPrice: { type: Number, required: true },
    paymentMode: { type: String, enum: ["cash", "online"], required: true },
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Bill", billSchema);
