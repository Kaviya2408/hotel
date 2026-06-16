# 🚀 Quick Start Guide - Restaurant Management System

## Start the System (3 Simple Steps)

### 1. Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### 2. Start Backend Server
```bash
node backend.js
```
Expected output:
```
✅ MongoDB connected
🚀 Server running on port 3002
```

### 3. Open Browser
Visit: `http://localhost:3002`

---

## 🍽️ Customer Flow (Shopping & Ordering)

### Step 1: Browse Menu
1. Open `http://localhost:3002/menu.html`
2. You'll see **50 menu items** across 5 categories
3. Use **"Filter Categories"** button to browse:
   - Indian Curries
   - Rice & Biryani
   - Asian Favorites
   - Mediterranean Delights
   - American Classics

### Step 2: Add to Cart
1. Click **"Add"** button on any item
2. See cart count badge increase (top right)
3. Item is saved to cart

### Step 3: View Cart
1. Click **cart icon** in navigation
2. See all your items with:
   - Item name and price
   - Quantity controls (+/-)
   - Remove button
   - Subtotal and total

### Step 4: Place Order
1. Click **"Place Order"** button
2. Fill in the form:
   - **Name**: Your full name
   - **Email**: your@email.com
   - **Phone**: 123-456-7890
   - **Address**: Your delivery address
3. Click **"Confirm Order"**
4. Success! You'll see: "✅ Order placed successfully! Your order number is: [ID]"
5. Cart clears automatically

---

## 🔧 Admin Flow (Managing Restaurant)

### Setup: Login as Admin
**Option 1**: Set localStorage (Quick Test)
```javascript
// Open browser console (F12), paste this:
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userRole', 'admin');
// Then refresh the page
```

**Option 2**: Use Firebase Authentication (Proper Way)
- Login through `/login.html` with admin credentials
- Firebase will set the admin role automatically

### Step 1: Access Admin Panel
After setting admin access, you'll see:
- **"Manage Menu"** link in navigation
- **"Admin Panel"** link in user dropdown

### Step 2: Add Products
1. Click **"Manage Menu"** or go to `http://localhost:3002/add-product.html`
2. Fill out the form:
   - **Dish Name**: e.g., "Spicy Chicken Curry"
   - **Price**: e.g., 15.99
   - **Description**: Describe the dish
   - **Category**: Select existing or create new
   - **Image**: Upload file OR paste image URL
   - **Spicy Level**: None/Mild/Medium/Hot/Very Hot
   - **Serving Size**: 1/2/3-4/Family
   - **Special Attributes**: Check boxes as needed
     - Popular
     - Must-Try Special
     - Vegetarian
     - Vegan
     - Gluten-Free
     - Chef's Special
3. Click **"Add to Menu"**
4. Product appears immediately in menu!

### Step 3: Manage Products
1. Click **"Manage Products"** tab
2. See all products in grid layout
3. Each product card shows:
   - Image
   - Name, category, price
   - Description
   - All special badges
   - **Edit** button (coming soon)
   - **Delete** button
4. Click **Delete** to remove (with confirmation)

### Step 4: View Orders
1. Click **"Admin Panel"** in user dropdown
2. Or go to `http://localhost:3002/admin.html`
3. Click **"Orders"** tab
4. See all customer orders with:
   - Order ID
   - Customer details
   - Items ordered
   - Total amount
   - Order status
5. Actions available:
   - Update status (Pending/Processing/Completed)
   - Delete order

---

## 📋 Common Tasks

### Reset Database with Sample Data
```bash
node seed-menu.js
```
This will:
- Clear existing products and categories
- Add 5 categories
- Add 50 diverse menu items
- Display summary

### Check Backend is Running
Visit: `http://localhost:3002/api/test`

Expected response:
```json
{
  "message": "Backend is working!",
  "timestamp": "2026-06-06T..."
}
```

### Clear Cart (Testing)
```javascript
// Open browser console (F12), paste:
localStorage.removeItem('cart');
location.reload();
```

### Logout (Reset Admin)
```javascript
// Open browser console (F12), paste:
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('userRole');
location.reload();
```

---

## 🐛 Troubleshooting

### Cart is Empty After Adding Items
**Fix**: Check browser console for errors
```javascript
// Verify cart in console:
console.log(JSON.parse(localStorage.getItem('cart')));
```

### Order Button Doesn't Work
**Fix**: 
1. Check backend is running: `http://localhost:3002/api/test`
2. Check MongoDB is connected
3. Check browser console for errors

### Menu Shows No Items
**Fix**: Run seed script
```bash
node seed-menu.js
```

### Admin Links Not Visible
**Fix**: Set admin credentials
```javascript
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userRole', 'admin');
location.reload();
```

### Images Not Loading
**Fix**: 
- Check image URLs are valid
- Check GridFS is configured in MongoDB
- Try using image URL instead of upload

### Port 3002 Already in Use
**Fix**: 
```bash
# Windows
netstat -ano | findstr :3002
taskkill /PID [PID_NUMBER] /F

# Then restart backend
node backend.js
```

---

## 📊 Quick Stats

Current Database:
- **Products**: 50
- **Categories**: 5
- **Popular Items**: 24
- **Chef's Specials**: 10
- **Vegetarian**: 20
- **Vegan**: 10
- **Price Range**: $8.99 - $22.99

---

## 🎯 Testing Scenarios

### Test 1: Complete Order Flow
1. Browse menu → Add 3 items
2. View cart → Adjust quantities
3. Place order → Fill form
4. Verify success → Check cart cleared
5. Login as admin → View order
⏱️ Time: ~2 minutes

### Test 2: Admin Product Management
1. Login as admin
2. Add new product with all details
3. Verify appears in menu
4. Go to manage products
5. Delete the test product
⏱️ Time: ~3 minutes

### Test 3: Category Filtering
1. Go to menu
2. Click "Filter Categories"
3. Select each category
4. Verify items update
5. Select "All Items"
⏱️ Time: ~1 minute

---

## 💡 Pro Tips

### For Development
- Keep browser console open (F12) to catch errors
- Use Network tab to monitor API calls
- localStorage persists across page reloads
- Ctrl+Shift+R for hard refresh

### For Admin Users
- Create products with good descriptions for better sales
- Use high-quality images (Unsplash is great)
- Mark popular items to highlight them
- Use spice levels to help customers choose
- Set serving sizes accurately

### For Customers
- Cart persists across sessions
- Items stay in cart until you order or clear
- You can adjust quantities in cart
- Delivery fee is fixed at $5.00

---

## 🔗 Important URLs

### Customer Pages
- Home: `http://localhost:3002/`
- Menu: `http://localhost:3002/menu.html`
- Cart: `http://localhost:3002/cart.html`
- About: `http://localhost:3002/about.html`
- Reviews: `http://localhost:3002/reviews.html`

### Admin Pages
- Product Management: `http://localhost:3002/add-product.html`
- Admin Panel: `http://localhost:3002/admin.html`

### API Endpoints
- Test: `http://localhost:3002/api/test`
- Products: `http://localhost:3002/api/products`
- Categories: `http://localhost:3002/api/categories`
- Orders: `http://localhost:3002/api/orders`

---

## 📝 Next Steps

1. **Test Everything**: Follow the testing scenarios above
2. **Customize Content**: Add your own products and categories
3. **Brand It**: Update logo and restaurant name
4. **Go Live**: Deploy to hosting (Render, Heroku, etc.)
5. **Add Features**: Payment gateway, email notifications, etc.

---

## 🎉 You're All Set!

Your restaurant management system is ready to use. Start with the customer flow to place a test order, then switch to admin to manage it.

**Happy Selling!** 🍽️
