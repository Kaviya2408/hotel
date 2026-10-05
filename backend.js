// deploy test
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
// Configure GridFS storage for image uploads


const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = process.env.MONGO_URI;

// Product schema for menu items
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    popular: { type: Boolean, default: false },
    special: { type: Boolean, default: false },
    offer: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
    chefSpecial: { type: Boolean, default: false },
    spicyLevel: { type: String, default: 'none' },
    servingSize: { type: String, default: '1' },
    bannerUrl: { type: String },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' },
    imageUrl: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Category schema for menu categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Category = mongoose.model('Category', categorySchema);

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

// Initialize GridFS storage and multer upload
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => ({
    filename: `${Date.now()}_${file.originalname}`,
    bucketName: 'uploads'
  })
});
const upload = multer({ storage });

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

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, required: true },
    text: { type: String, required: true },
    helpful: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

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

// Firebase config endpoint (secure)
app.get('/api/firebase-config', (req, res) => {
    res.json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    });
});

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

// ✅ CREATE PRODUCT (Menu Item)
/* Category routes */
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        console.error('❌ Error fetching categories:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/categories', async (req, res) => {
    // Simple admin check – expect header x-user-role='admin'
    if (req.headers['x-user-role'] !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Category name required' });
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ error: 'Category already exists' });
        const cat = new Category({ name });
        await cat.save();
        res.status(201).json(cat);
    } catch (err) {
        console.error('❌ Error creating category:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/* Product creation with image handling */
app.post('/api/products', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), async (req, res) => {
    // Admin-only: creating menu items is an admin action
    if (req.headers['x-user-role'] !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const { name, description, price, imageUrl, bannerUrl, category, popular, special, offer, vegetarian, vegan, glutenFree, chefSpecial, spicyLevel, servingSize } = req.body;
        if (!name || price === undefined || !category) {
            return res.status(400).json({ error: 'Missing required fields (name, price, category)' });
        }
        // Handle image uploads
        const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
        const bannerFile = req.files && req.files['bannerImage'] ? req.files['bannerImage'][0] : null;
        const imageId = imageFile ? imageFile.id : null;
        const finalImageUrl = imageFile ? null : imageUrl; // if file uploaded, ignore URL
        const finalBannerUrl = bannerFile ? bannerFile.id.toString() : (bannerUrl || null);

        // Convert boolean strings to actual booleans
        const isPopular = popular === 'true' || popular === true;
        const isSpecial = special === 'true' || special === true;
        const isOffer = offer === 'true' || offer === true;
        const isVegetarian = vegetarian === 'true' || vegetarian === true;
        const isVegan = vegan === 'true' || vegan === true;
        const isGlutenFree = glutenFree === 'true' || glutenFree === true;
        const isChefSpecial = chefSpecial === 'true' || chefSpecial === true;

        const product = new Product({
            name,
            description,
            price: parseFloat(price),
            category,
            imageId,
            imageUrl: finalImageUrl,
            bannerUrl: finalBannerUrl,
            popular: isPopular,
            special: isSpecial,
            offer: isOffer,
            vegetarian: isVegetarian,
            vegan: isVegan,
            glutenFree: isGlutenFree,
            chefSpecial: isChefSpecial,
            spicyLevel: spicyLevel || 'none',
            servingSize: servingSize || '1'
        });
        const savedProduct = await product.save();
        res.status(201).json({ message: 'Product added successfully', product: savedProduct });


    } catch (err) {
        console.error('❌ Error saving product:', err);
        res.status(500).json({ error: 'Server error' });


    }
});

// ✅ GET IMAGE FROM GRIDFS
app.get('/api/image/:id', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        });
        
        const downloadStream = bucket.openDownloadStream(
            new mongoose.Types.ObjectId(req.params.id)
        );
        
        downloadStream.on('error', (err) => {
            console.error('❌ GridFS download error:', err);
            res.status(404).json({ error: 'Image not found' });
        });
        
        downloadStream.pipe(res);
    } catch (err) {
        console.error('❌ Error retrieving image:', err);
        res.status(404).json({ error: 'Image not found' });
    }
});

// ✅ GET ALL PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET SINGLE PRODUCT
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('❌ Error fetching product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ UPDATE PRODUCT
app.put('/api/products/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), async (req, res) => {
  // Simple admin check
  if (req.headers['x-user-role'] !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  try {
    const { name, description, price, imageUrl, bannerUrl, category, popular, special, offer } = req.body;

    // Handle image uploads
    const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
    const bannerFile = req.files && req.files['bannerImage'] ? req.files['bannerImage'][0] : null;

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      category,
      popular: popular === 'true' || popular === true,
      special: special === 'true' || special === true,
      offer: offer === 'true' || offer === true
    };
    
    if (imageFile) {
      updateData.imageId = imageFile.id;
      updateData.imageUrl = null;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }
    
    if (bannerFile) {
      updateData.bannerUrl = bannerFile.id.toString();
    } else if (bannerUrl) {
      updateData.bannerUrl = bannerUrl;
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('❌ Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ DELETE PRODUCT
app.delete('/api/products/:id', async (req, res) => {
  // Simple admin check
  if (req.headers['x-user-role'] !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

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

// ✅ GET ALL REVIEWS. for ascending we can use 1
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

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});