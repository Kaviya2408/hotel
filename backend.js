// deploy test
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// JSON parser
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


/* -------------------- MONGODB -------------------- */

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI not found in environment variables");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });


/* -------------------- ORDER MODEL -------------------- */

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

/* -------------------- REVIEW MODEL -------------------- */

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, required: true },
    text: { type: String, required: true },
    helpful: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);


/* -------------------- ROUTES -------------------- */

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        message: "Backend is working!",
        timestamp: new Date()
    });
});

// ✅ CREATE ORDER
app.post('/api/orders', async (req, res) => {
    try {
        const { name, email, phone, address, items, total } = req.body;

        if (!name || !email || !phone || !address || !items || !total) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const order = new Order(req.body);
        const savedOrder = await order.save();

        console.log("✅ Order saved:", savedOrder._id);

        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder
        });

    } catch (err) {
        console.error("❌ Error saving order:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ GET ALL ORDERS
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ created_at: -1 });
        res.json(orders);
    } catch (err) {
        console.error("❌ Error fetching orders:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ UPDATE ORDER STATUS
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);

    } catch (err) {
        console.error("❌ Error updating status:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ DELETE ORDER
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting order:", err);
        res.status(500).json({ error: "Server error" });
    }
});

/* -------------------- REVIEW ROUTES -------------------- */

// ✅ CREATE REVIEW
app.post('/api/reviews', async (req, res) => {
    try {
        const { name, rating, date, text, helpful } = req.body;

        if (!name || !rating || !date || !text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const review = new Review({
            name,
            rating,
            date,
            text,
            helpful: helpful || 0
        });
        
        const savedReview = await review.save();
        console.log("✅ Review saved:", savedReview._id);

        res.status(201).json({
            message: "Review posted successfully",
            review: savedReview
        });

    } catch (err) {
        console.error("❌ Error saving review:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ GET ALL REVIEWS
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ created_at: -1 });
        res.json(reviews);
    } catch (err) {
        console.error("❌ Error fetching reviews:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ DELETE REVIEW
app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting review:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ MARK REVIEW AS HELPFUL
app.put('/api/reviews/:id/helpful', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json(review);

    } catch (err) {
        console.error("❌ Error updating helpful count:", err);
        res.status(500).json({ error: "Server error" });
    }
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});