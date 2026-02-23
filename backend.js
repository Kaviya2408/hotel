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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});