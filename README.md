# Restaurant Website

A full-stack restaurant website with online ordering, table booking, and review system.

## Features
- 🍽️ Online food ordering
- 📅 Table reservation system
- ⭐ Customer reviews
- 👨‍💼 Admin dashboard for order management
- 🎨 Modern UI with coffee brown & mauve theme

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Render

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (MongoDB Atlas)

### Setup

1. Clone the repository
```bash
git clone https://github.com/Kaviya2408/hotel.git
cd hotel
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server
```bash
npm start
```

5. Open your browser and visit
```
http://localhost:3000
```

## Deployment to Render

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub repository.

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up or log in with GitHub

### Step 3: Deploy Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: restaurant-app (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 4: Add Environment Variables
In Render dashboard, add:
- **Key**: `MONGO_URI`
- **Value**: Your MongoDB connection string

### Step 5: Deploy
Click "Create Web Service" and wait for deployment.

Your site will be live at: `https://your-app-name.onrender.com`

## Project Structure
```
restaurant/
├── public/              # Frontend files
│   ├── index.html      # Homepage
│   ├── menu.html       # Menu page
│   ├── about.html      # About page
│   ├── cart.html       # Shopping cart
│   ├── login.html      # Login page
│   ├── signup.html     # Signup page
│   ├── profile.html    # User profile
│   ├── admin.html      # Admin dashboard
│   ├── reviews.html    # Reviews page
│   ├── style.css       # Main stylesheet
│   └── script.js       # Frontend JavaScript
├── backend.js          # Express server
├── package.json        # Dependencies
├── .env               # Environment variables (create this)
└── README.md          # This file
```

## API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews` - Get all reviews
- `DELETE /api/reviews/:id` - Delete review
- `PUT /api/reviews/:id/helpful` - Mark review as helpful

## Admin Access
- Email: `kit27.csbs29@gmail.com`
- This email has access to the admin panel

## Support
For issues or questions, please open an issue on GitHub.

## License
ISC
