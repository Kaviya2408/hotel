console.log('Starting server...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// MongoDB Schema
// =========================
const orderSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_phone: { type: String, required: true },
    customer_address: { type: String, required: true },
    order_items: { type: Array, required: true },
    subtotal: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// =========================
// Routes
// =========================

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Send order
app.post('/api/send-order', async (req, res) => {
    try {
        const { customerName, customerPhone, customerAddress, orderItems, subtotal, deliveryFee, total } = req.body;

        if (!customerName || !customerPhone || !customerAddress || !orderItems) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const order = new Order({
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            order_items: orderItems,
            subtotal,
            delivery_fee: deliveryFee,
            total,
            status: 'pending'
        });

        const savedOrder = await order.save();

        console.log(`✅ Order saved: ${customerName} - ₹${total}`);

        res.json({
            success: true,
            message: 'Order received successfully!',
            orderId: savedOrder._id
        });

    } catch (err) {
        console.error('❌ Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all orders (Admin panel)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ created_at: -1 });
        console.log(`📊 Admin panel: ${orders.length} orders found`);
        res.json(orders);
    } catch (err) {
        console.error('❌ Error fetching orders:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Test API
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend is working!',
        timestamp: new Date().toISOString()
    });
});

// =========================
// Connect MongoDB & Start Server
// =========================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection failed:", err);
});