// Make sure you have this at the top of backend.js
const mongoose = require('mongoose');
const express = require('express');
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

// Your Order schema
const orderSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	items: Array,
	total: Number,
	created_at: { type: Date, default: Date.now },
	status: { type: String, default: 'pending' }
});

// Define the model exactly as "Order"
const Order = mongoose.model('Order', orderSchema); // 👈 Important

// Route to save a new order
app.post('/api/send-order', async (req, res) => {
	try {
		const order = new Order(req.body);
		const savedOrder = await order.save();
		console.log('✅ Order saved:', savedOrder);
		res.json({ message: 'Order saved successfully' });
	} catch (err) {
		console.error(' Error saving order:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Test endpoint to verify backend is working
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is working!',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Route to fetch all orders for admin panel
app.get('/api/orders', async (req, res) => {
	try {
		const orders = await Order.find().sort({ created_at: -1 }); // newest first
		console.log(` Admin panel: ${orders.length} orders found`);
		res.json(orders);
	} catch (err) {
		console.error(' Error fetching orders:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Route to update order status
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        console.log(` Order ${req.params.id} status updated to: ${status}`);
        res.json(order);
    } catch (err) {
        console.error(' Error updating order status:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to delete an order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        console.log(` Order ${req.params.id} deleted successfully`);
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(' Error deleting order:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});