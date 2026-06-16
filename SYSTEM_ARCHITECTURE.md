# 🏗️ System Architecture - Restaurant Management System

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     RESTAURANT MANAGEMENT SYSTEM                 │
│                         Full Stack Application                    │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│    FRONTEND      │ <-----> │     BACKEND      │ <-----> │    DATABASE      │
│   (HTML/CSS/JS)  │  HTTP   │   (Express.js)   │   ODM   │    (MongoDB)     │
│                  │         │                  │         │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
        │                            │                            │
        │                            │                            │
        v                            v                            v
  User Interface              REST API Server              Data Storage
  - 10+ pages                 - Port 3002                  - Products
  - Responsive                - CORS enabled               - Orders
  - Bootstrap UI              - Error handling             - Categories
                              - File upload                - GridFS images
```

---

## 📁 Project Structure

```
restaurant-project/
│
├── backend.js                 # Express server + API routes
├── seed-menu.js              # Database seeding script
├── package.json              # Dependencies
├── .env                      # Environment variables
│
├── public/                   # Frontend (served by Express)
│   ├── index.html           # Homepage
│   ├── menu.html            # Menu browsing
│   ├── cart.html            # Shopping cart
│   ├── add-product.html     # Admin: Product management
│   ├── admin.html           # Admin: Dashboard & orders
│   ├── login.html           # Authentication
│   ├── signup.html          # Registration
│   ├── profile.html         # User profile
│   ├── about.html           # About page
│   ├── reviews.html         # Customer reviews
│   ├── script.js            # Global JavaScript
│   ├── style.css            # Global styles
│   └── [images]             # Static images
│
├── orders/                   # Text file orders (backup)
│   └── order_*.txt
│
└── [Documentation Files]
    ├── QUICK_START_GUIDE.md
    ├── PROJECT_STATUS_COMPLETE.md
    ├── MENU_POPULATED.md
    ├── CART_FIX_COMPLETE.md
    └── SYSTEM_ARCHITECTURE.md (this file)
```

---

## 🔄 Data Flow

### 1. Customer Order Flow

```
┌──────────┐
│  User    │
│ Browser  │
└────┬─────┘
     │
     │ 1. Browse menu
     v
┌────────────────┐
│  menu.html     │  <--- Fetch products from API
│                │       GET /api/products
└────┬───────────┘
     │
     │ 2. Add to cart
     v
┌────────────────┐
│ localStorage   │  <--- Cart data stored locally
│   cart: [...]  │
└────┬───────────┘
     │
     │ 3. View cart
     v
┌────────────────┐
│  cart.html     │  <--- Read from localStorage
│                │
└────┬───────────┘
     │
     │ 4. Place order
     v
┌────────────────┐
│  Order Form    │
│  - Name        │
│  - Email       │
│  - Phone       │
│  - Address     │
└────┬───────────┘
     │
     │ 5. Submit order
     v
┌────────────────┐       POST /api/orders        ┌──────────┐
│   backend.js   │ <---------------------------- │ MongoDB  │
│                │                                └──────────┘
└────┬───────────┘
     │
     │ 6. Order saved
     v
┌────────────────┐
│   Response     │
│  - Order ID    │
│  - Success msg │
└────┬───────────┘
     │
     │ 7. Clear cart & show confirmation
     v
┌────────────────┐
│  User sees     │
│  "Order #123"  │
└────────────────┘
```

### 2. Admin Product Management Flow

```
┌──────────┐
│  Admin   │
│  Login   │
└────┬─────┘
     │
     │ 1. Access admin page
     v
┌────────────────────┐
│ add-product.html   │
│                    │
│ Check localStorage:│
│ - isLoggedIn=true  │
│ - userRole=admin   │
└────┬───────────────┘
     │
     │ 2. Fill product form
     v
┌────────────────────┐
│  Product Data      │
│  - Name            │
│  - Price           │
│  - Category        │
│  - Image           │
│  - Attributes      │
└────┬───────────────┘
     │
     │ 3. Submit form
     v
┌────────────────────┐
│   FormData         │
│   (multipart)      │
└────┬───────────────┘
     │
     │ POST /api/products
     v
┌────────────────────┐       ┌──────────────┐
│   backend.js       │       │   MongoDB    │
│   + multer         │ ----> │   Products   │
│   + GridFS         │       │   GridFS     │
└────┬───────────────┘       └──────────────┘
     │
     │ 4. Product saved
     v
┌────────────────────┐
│   Response         │
│  - Product ID      │
│  - Success         │
└────┬───────────────┘
     │
     │ 5. UI updates
     v
┌────────────────────┐
│  Toast notification│
│  "Product added!"  │
│  Switch to Manage  │
└────────────────────┘
```

---

## 🗄️ Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  price: Number (required),
  category: String (required),
  popular: Boolean,
  special: Boolean,
  vegetarian: Boolean,
  vegan: Boolean,
  glutenFree: Boolean,
  chefSpecial: Boolean,
  spicyLevel: String, // 'none', 'mild', 'medium', 'hot', 'very-hot'
  servingSize: String, // '1', '2', '3-4', 'family'
  imageUrl: String,
  imageId: ObjectId (ref: GridFS),
  created_at: Date
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique)
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  address: String (required),
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number (required),
  status: String, // 'pending', 'processing', 'completed'
  created_at: Date
}
```

### GridFS (fs.files & fs.chunks)
```javascript
// Stores uploaded images
{
  _id: ObjectId,
  filename: String,
  contentType: String,
  length: Number,
  uploadDate: Date
}
```

---

## 🔌 API Endpoints

### Products
```
GET    /api/products           # Get all products
GET    /api/products/:id       # Get single product
POST   /api/products           # Create product (admin, multipart)
PUT    /api/products/:id       # Update product (admin, multipart)
DELETE /api/products/:id       # Delete product (admin)
```

### Categories
```
GET    /api/categories         # Get all categories
POST   /api/categories         # Create category (admin)
```

### Orders
```
GET    /api/orders            # Get all orders
POST   /api/orders            # Create order
PUT    /api/orders/:id/status # Update order status
DELETE /api/orders/:id        # Delete order
```

### Images
```
GET    /api/image/:id         # Retrieve image from GridFS
```

### Utility
```
GET    /api/test              # Test endpoint
GET    /api/firebase-config   # Get Firebase config
```

---

## 🔐 Authentication & Authorization

### Current Implementation

```
┌─────────────────┐
│   User Login    │
│  (Firebase or   │
│   localStorage) │
└────────┬────────┘
         │
         v
┌─────────────────────────────┐
│  localStorage                │
│  - isLoggedIn: 'true'        │
│  - userRole: 'admin' | 'user'│
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│  Access Control Check        │
│  (on each protected page)    │
│                              │
│  const isAdmin =             │
│    isLoggedIn === 'true' &&  │
│    userRole === 'admin'      │
└────────┬────────────────────┘
         │
         ├─ Yes → Show admin features
         │
         └─ No  → Redirect to home
```

### Protected Routes
- `/add-product.html` - Admin only
- `/admin.html` - Admin only
- Delete product button - Admin only
- "Manage Menu" link - Admin only
- "Admin Panel" link - Admin only

### Headers for Admin API
```javascript
headers: {
  'x-user-role': 'admin'
}
```

---

## 🎨 Frontend Architecture

### Component Structure

```
┌──────────────────────────────────────┐
│         Global Components             │
│  (present on all pages)               │
│                                       │
│  ┌────────────────────────────────┐  │
│  │  Navigation Bar                 │  │
│  │  - Logo                         │  │
│  │  - Menu links                   │  │
│  │  - Cart badge                   │  │
│  │  - User dropdown                │  │
│  │  - Mobile hamburger             │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
              │
              v
┌──────────────────────────────────────┐
│         Page-Specific Content         │
└──────────────────────────────────────┘
              │
              v
┌──────────────────────────────────────┐
│         Global Scripts                │
│                                       │
│  - script.js (cart count, auth UI)   │
│  - Page-specific inline scripts      │
└──────────────────────────────────────┘
```

### State Management

```javascript
// localStorage (Client-side persistence)
{
  cart: [
    { name: 'Item', price: 10.99, quantity: 2 },
    ...
  ],
  isLoggedIn: 'true' | 'false',
  userRole: 'admin' | 'user',
  userEmail: 'user@example.com'
}
```

### CSS Architecture

```
style.css (Global)
  │
  ├─ CSS Variables
  │   ├─ Colors
  │   ├─ Fonts
  │   ├─ Shadows
  │   └─ Transitions
  │
  ├─ Base Styles
  │   ├─ Reset
  │   ├─ Typography
  │   └─ Layout
  │
  ├─ Components
  │   ├─ Navbar
  │   ├─ Buttons
  │   ├─ Cards
  │   ├─ Forms
  │   └─ Modals
  │
  └─ Utilities
      ├─ Spacing
      ├─ Colors
      └─ Display
```

---

## 🔧 Technology Stack Summary

### Backend
```
Node.js
  └─ Express.js (Web framework)
      ├─ mongoose (MongoDB ODM)
      ├─ multer (File upload)
      ├─ multer-gridfs-storage (GridFS)
      ├─ cors (Cross-origin)
      └─ dotenv (Environment)
```

### Frontend
```
HTML5
  ├─ Semantic markup
  └─ Responsive meta tags

CSS3
  ├─ Custom properties (variables)
  ├─ Flexbox & Grid
  ├─ Media queries
  └─ Animations

JavaScript (ES6+)
  ├─ Vanilla JS (no framework)
  ├─ Async/await
  ├─ Fetch API
  ├─ localStorage
  └─ DOM manipulation

Libraries
  ├─ Bootstrap 5.3.7 (UI components)
  └─ Font Awesome 6.4.0 (Icons)
```

### Database
```
MongoDB
  ├─ Collections (Products, Orders, Categories)
  ├─ GridFS (Image storage)
  └─ Mongoose schemas
```

---

## 📊 Performance Considerations

### Frontend Optimizations
- ✅ Lazy image loading
- ✅ Inline SVG placeholders
- ✅ CSS transitions (GPU accelerated)
- ✅ Minimal dependencies (CDN)
- ✅ localStorage for cart (no server round-trips)

### Backend Optimizations
- ✅ Database indexing (category, created_at)
- ✅ Efficient queries (select specific fields)
- ✅ Error handling (prevents crashes)
- ✅ CORS preflight handling

### Database Optimizations
- ✅ GridFS for efficient file storage
- ✅ Indexed fields for faster queries
- ✅ Compound indexes for filtering

---

## 🔄 Deployment Architecture

### Current: Local Development
```
localhost:3002 (Backend)
  └─ Serves frontend (Express static)
  └─ API endpoints
  └─ MongoDB connection (local)
```

### Production: Recommended Setup
```
┌──────────────────┐
│  Frontend CDN    │  (Vercel, Netlify)
│  - Static files  │
└────────┬─────────┘
         │
         v
┌──────────────────┐
│  Backend Server  │  (Render, Heroku)
│  - Express API   │
│  - Port 80/443   │
└────────┬─────────┘
         │
         v
┌──────────────────┐
│  MongoDB Atlas   │  (Cloud database)
│  - Cluster       │
│  - GridFS        │
└──────────────────┘
```

---

## 🚦 System Flow Summary

### User Journey
1. **Browse** → menu.html loads products from DB
2. **Select** → Add items to cart (localStorage)
3. **Review** → cart.html displays cart items
4. **Order** → Form submission to /api/orders
5. **Confirm** → Order saved, cart cleared

### Admin Journey
1. **Login** → Set admin credentials
2. **Access** → admin pages visible
3. **Manage** → CRUD operations on products
4. **Monitor** → View orders and status
5. **Update** → Modify order status

---

## 📈 Scalability Considerations

### Current Capacity
- ✅ Hundreds of products
- ✅ Thousands of orders
- ✅ Multiple concurrent users
- ✅ File uploads up to 5MB

### Future Scaling
- [ ] Add caching (Redis)
- [ ] Add CDN for images
- [ ] Add load balancer
- [ ] Add database replication
- [ ] Add search indexing (Elasticsearch)

---

## 🎯 System Health Monitoring

### Check System Status
```bash
# Backend health
curl http://localhost:3002/api/test

# Database connection
# Check backend console for "✅ MongoDB connected"

# Frontend access
# Open http://localhost:3002 in browser
```

### Key Metrics
- Response time < 500ms
- API uptime > 99%
- Database queries < 100ms
- Image load time < 2s

---

## 🔐 Security Measures

### Current Implementation
- ✅ Input validation (frontend & backend)
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ Admin role checking
- ✅ SQL injection prevention (Mongoose)

### Recommended Additions
- [ ] HTTPS/SSL
- [ ] Rate limiting
- [ ] JWT tokens
- [ ] Password hashing (bcrypt)
- [ ] Session management
- [ ] XSS protection
- [ ] CSRF tokens

---

## 🎉 System Capabilities

### What It Can Do
✅ Browse 50+ menu items
✅ Filter by categories
✅ Add items to cart
✅ Place orders with delivery info
✅ Admin product management
✅ Admin order management
✅ Image upload (file or URL)
✅ Real-time UI updates
✅ Responsive design
✅ Error handling

### What It Cannot Do (Yet)
❌ Payment processing
❌ User authentication (Firebase setup needed)
❌ Email notifications
❌ Order tracking
❌ Inventory management
❌ Analytics dashboard
❌ Multi-language support

---

This architecture supports a fully functional restaurant management system with room for future enhancements! 🚀
