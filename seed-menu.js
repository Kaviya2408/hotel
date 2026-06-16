// Menu Database Seed Script
// Run this to populate your menu with sample items
// Usage: node seed-menu.js

require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Product Schema (same as backend.js)
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    popular: { type: Boolean, default: false },
    special: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
    chefSpecial: { type: Boolean, default: false },
    spicyLevel: { type: String, default: 'none' },
    servingSize: { type: String, default: '1' },
    imageUrl: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Category = mongoose.model('Category', categorySchema);

// Sample Menu Items - 5 Categories, 10 Items Each
const menuItems = [
    // ========================================
    // CATEGORY 1: INDIAN CURRIES (10 items)
    // ========================================
    {
        name: "Butter Chicken",
        description: "Tender chicken pieces in creamy tomato sauce with aromatic spices and butter",
        price: 16.99,
        category: "Indian Curries",
        popular: true,
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400"
    },
    {
        name: "Chicken Tikka Masala",
        description: "Grilled chicken in rich, spiced curry sauce with cream and tomatoes",
        price: 17.99,
        category: "Indian Curries",
        popular: true,
        chefSpecial: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
    },
    {
        name: "Lamb Vindaloo",
        description: "Fiery curry from Goa with tender lamb, vinegar, and bold spices",
        price: 19.99,
        category: "Indian Curries",
        vegetarian: false,
        spicyLevel: "very-hot",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"
    },
    {
        name: "Palak Paneer",
        description: "Cottage cheese cubes in creamy spinach sauce with mild spices",
        price: 14.99,
        category: "Indian Curries",
        popular: true,
        vegetarian: true,
        glutenFree: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Chana Masala",
        description: "Chickpeas cooked in tangy tomato-onion gravy with traditional spices",
        price: 12.99,
        category: "Indian Curries",
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"
    },
    {
        name: "Rogan Josh",
        description: "Kashmiri lamb curry with aromatic spices, yogurt, and saffron",
        price: 18.99,
        category: "Indian Curries",
        special: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400"
    },
    {
        name: "Dal Makhani",
        description: "Black lentils slow-cooked with butter, cream, and aromatic spices",
        price: 13.99,
        category: "Indian Curries",
        popular: true,
        vegetarian: true,
        glutenFree: true,
        spicyLevel: "mild",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
    },
    {
        name: "Fish Curry",
        description: "Fresh fish simmered in coconut milk with curry leaves and mustard seeds",
        price: 17.99,
        category: "Indian Curries",
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
    },
    {
        name: "Malai Kofta",
        description: "Fried paneer and potato dumplings in creamy cashew-tomato sauce",
        price: 15.99,
        category: "Indian Curries",
        chefSpecial: true,
        vegetarian: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Korma",
        description: "Mild, creamy curry with nuts, yogurt, and aromatic spices - choice of chicken or vegetables",
        price: 16.99,
        category: "Indian Curries",
        popular: true,
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"
    },

    // ========================================
    // CATEGORY 2: RICE & BIRYANI (10 items)
    // ========================================
    {
        name: "Chicken Biryani",
        description: "Fragrant basmati rice layered with spiced chicken, saffron, and aromatic herbs",
        price: 15.99,
        category: "Rice & Biryani",
        popular: true,
        chefSpecial: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
    },
    {
        name: "Lamb Biryani",
        description: "Premium lamb pieces with fragrant rice, whole spices, and caramelized onions",
        price: 18.99,
        category: "Rice & Biryani",
        special: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"
    },
    {
        name: "Vegetable Biryani",
        description: "Mixed vegetables with basmati rice, herbs, and traditional biryani spices",
        price: 13.99,
        category: "Rice & Biryani",
        popular: true,
        vegetarian: true,
        vegan: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
    },
    {
        name: "Shrimp Biryani",
        description: "Succulent shrimp with saffron rice, mint, and coastal spices",
        price: 19.99,
        category: "Rice & Biryani",
        special: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"
    },
    {
        name: "Egg Fried Rice",
        description: "Wok-tossed rice with scrambled eggs, vegetables, and soy sauce",
        price: 11.99,
        category: "Rice & Biryani",
        popular: true,
        vegetarian: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400"
    },
    {
        name: "Jeera Rice",
        description: "Steamed basmati rice tempered with cumin seeds and ghee",
        price: 8.99,
        category: "Rice & Biryani",
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        spicyLevel: "none",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400"
    },
    {
        name: "Pulao",
        description: "Aromatic rice cooked with whole spices, vegetables, and herbs",
        price: 12.99,
        category: "Rice & Biryani",
        vegetarian: true,
        spicyLevel: "mild",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
    },
    {
        name: "Hyderabadi Biryani",
        description: "Authentic Hyderabadi-style biryani with tender meat, dum-cooked to perfection",
        price: 17.99,
        category: "Rice & Biryani",
        chefSpecial: true,
        popular: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"
    },
    {
        name: "Coconut Rice",
        description: "Fragrant rice cooked in coconut milk with curry leaves and mustard seeds",
        price: 10.99,
        category: "Rice & Biryani",
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        spicyLevel: "none",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400"
    },
    {
        name: "Mushroom Biryani",
        description: "Earthy mushrooms with aromatic rice, herbs, and biryani spices",
        price: 14.99,
        category: "Rice & Biryani",
        vegetarian: true,
        vegan: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
    },

    // ========================================
    // CATEGORY 3: ASIAN FAVORITES (10 items)
    // ========================================
    {
        name: "Pad Thai",
        description: "Thai rice noodles stir-fried with shrimp, peanuts, bean sprouts, and tamarind sauce",
        price: 14.99,
        category: "Asian Favorites",
        popular: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400"
    },
    {
        name: "Chicken Ramen",
        description: "Japanese noodle soup with tender chicken, soft-boiled egg, and rich broth",
        price: 13.99,
        category: "Asian Favorites",
        popular: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400"
    },
    {
        name: "Beef Pho",
        description: "Vietnamese rice noodle soup with beef, herbs, and aromatic star anise broth",
        price: 15.99,
        category: "Asian Favorites",
        special: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400"
    },
    {
        name: "Singapore Noodles",
        description: "Curry-flavored rice noodles with shrimp, chicken, vegetables, and eggs",
        price: 13.99,
        category: "Asian Favorites",
        popular: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400"
    },
    {
        name: "Korean Bibimbap",
        description: "Rice bowl with seasoned vegetables, beef, fried egg, and gochujang sauce",
        price: 16.99,
        category: "Asian Favorites",
        chefSpecial: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400"
    },
    {
        name: "Vegetable Lo Mein",
        description: "Chinese egg noodles tossed with fresh vegetables and savory sauce",
        price: 11.99,
        category: "Asian Favorites",
        vegetarian: true,
        vegan: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400"
    },
    {
        name: "Thai Green Curry",
        description: "Coconut-based green curry with vegetables, Thai basil, and jasmine rice",
        price: 14.99,
        category: "Asian Favorites",
        popular: true,
        vegetarian: true,
        glutenFree: true,
        spicyLevel: "hot",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400"
    },
    {
        name: "Sushi Platter",
        description: "Assorted nigiri, maki rolls, and sashimi with wasabi, ginger, and soy sauce",
        price: 22.99,
        category: "Asian Favorites",
        special: true,
        chefSpecial: true,
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400"
    },
    {
        name: "Spicy Szechuan Chicken",
        description: "Wok-tossed chicken with Szechuan peppers, chilies, and garlic in bold sauce",
        price: 15.99,
        category: "Asian Favorites",
        vegetarian: false,
        spicyLevel: "very-hot",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400"
    },
    {
        name: "Tom Yum Soup",
        description: "Spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and lime",
        price: 12.99,
        category: "Asian Favorites",
        popular: true,
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "hot",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400"
    },

    // ========================================
    // CATEGORY 4: MEDITERRANEAN DELIGHTS (10 items)
    // ========================================
    {
        name: "Chicken Shawarma",
        description: "Marinated chicken wrapped in pita with tahini, pickles, and fresh vegetables",
        price: 13.99,
        category: "Mediterranean Delights",
        popular: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400"
    },
    {
        name: "Falafel Plate",
        description: "Crispy chickpea fritters with hummus, tahini, salad, and warm pita",
        price: 12.99,
        category: "Mediterranean Delights",
        popular: true,
        vegetarian: true,
        vegan: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Lamb Kebab",
        description: "Grilled marinated lamb skewers with roasted vegetables and tzatziki",
        price: 18.99,
        category: "Mediterranean Delights",
        special: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
    },
    {
        name: "Greek Moussaka",
        description: "Layered eggplant, ground beef, and béchamel sauce, oven-baked to perfection",
        price: 16.99,
        category: "Mediterranean Delights",
        chefSpecial: true,
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400"
    },
    {
        name: "Mezze Platter",
        description: "Assorted dips - hummus, baba ganoush, tabbouleh, olives, and warm pita",
        price: 15.99,
        category: "Mediterranean Delights",
        popular: true,
        vegetarian: true,
        vegan: true,
        spicyLevel: "none",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Spanakopita",
        description: "Greek spinach and feta cheese pie wrapped in crispy phyllo pastry",
        price: 11.99,
        category: "Mediterranean Delights",
        vegetarian: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400"
    },
    {
        name: "Seafood Paella",
        description: "Spanish saffron rice with shrimp, mussels, calamari, and vegetables",
        price: 21.99,
        category: "Mediterranean Delights",
        special: true,
        chefSpecial: true,
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "mild",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400"
    },
    {
        name: "Turkish Kofta",
        description: "Spiced ground meat kebabs with grilled vegetables and yogurt sauce",
        price: 14.99,
        category: "Mediterranean Delights",
        popular: true,
        vegetarian: false,
        spicyLevel: "medium",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
    },
    {
        name: "Stuffed Grape Leaves",
        description: "Rice, herbs, and spices wrapped in tender grape leaves, served warm",
        price: 10.99,
        category: "Mediterranean Delights",
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
    },
    {
        name: "Lebanese Tabbouleh",
        description: "Fresh parsley salad with bulgur, tomatoes, mint, lemon, and olive oil",
        price: 9.99,
        category: "Mediterranean Delights",
        vegetarian: true,
        vegan: true,
        spicyLevel: "none",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    },

    // ========================================
    // CATEGORY 5: AMERICAN CLASSICS (10 items)
    // ========================================
    {
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheddar, lettuce, tomato, pickles, and special sauce",
        price: 13.99,
        category: "American Classics",
        popular: true,
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
    },
    {
        name: "Buffalo Wings",
        description: "Crispy chicken wings tossed in spicy buffalo sauce with blue cheese dip",
        price: 12.99,
        category: "American Classics",
        popular: true,
        vegetarian: false,
        spicyLevel: "hot",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
    },
    {
        name: "BBQ Ribs",
        description: "Slow-cooked pork ribs glazed with smoky BBQ sauce, fall-off-the-bone tender",
        price: 19.99,
        category: "American Classics",
        special: true,
        chefSpecial: true,
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
    },
    {
        name: "Mac and Cheese",
        description: "Creamy elbow macaroni with three-cheese blend and crispy breadcrumb topping",
        price: 11.99,
        category: "American Classics",
        popular: true,
        vegetarian: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1543826173-f96b4dc0e9ad?w=400"
    },
    {
        name: "Philly Cheesesteak",
        description: "Thinly sliced beef with melted provolone, onions, and peppers on hoagie roll",
        price: 14.99,
        category: "American Classics",
        popular: true,
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
    },
    {
        name: "Loaded Nachos",
        description: "Crispy tortilla chips topped with cheese, jalapeños, sour cream, guacamole, and salsa",
        price: 13.99,
        category: "American Classics",
        vegetarian: true,
        spicyLevel: "medium",
        servingSize: "2",
        imageUrl: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400"
    },
    {
        name: "Clam Chowder",
        description: "Creamy New England-style soup with clams, potatoes, and smoky bacon",
        price: 10.99,
        category: "American Classics",
        vegetarian: false,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400"
    },
    {
        name: "Fried Chicken",
        description: "Buttermilk-marinated chicken, double-fried to golden crispy perfection",
        price: 15.99,
        category: "American Classics",
        chefSpecial: true,
        popular: true,
        vegetarian: false,
        spicyLevel: "mild",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400"
    },
    {
        name: "Grilled Salmon",
        description: "Atlantic salmon fillet with lemon butter, served with seasonal vegetables",
        price: 18.99,
        category: "American Classics",
        special: true,
        vegetarian: false,
        glutenFree: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
    },
    {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan, croutons, and classic Caesar dressing",
        price: 10.99,
        category: "American Classics",
        popular: true,
        vegetarian: true,
        spicyLevel: "none",
        servingSize: "1",
        imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
    }
];

// Categories to create
const categories = [
    { name: "Indian Curries" },
    { name: "Rice & Biryani" },
    { name: "Asian Favorites" },
    { name: "Mediterranean Delights" },
    { name: "American Classics" }
];

// Main seed function
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seed...\n');

        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected\n');

        // Clear existing data
        console.log('🗑️  Clearing existing products and categories...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('✅ Cleared\n');

        // Create categories
        console.log('📁 Creating categories...');
        for (const cat of categories) {
            await Category.create(cat);
            console.log(`  ✅ Created: ${cat.name}`);
        }
        console.log('✅ All categories created\n');

        // Create menu items
        console.log('🍽️  Creating menu items...');
        let count = 0;
        for (const item of menuItems) {
            await Product.create(item);
            count++;
            console.log(`  ${count}/50 ✅ ${item.name} - $${item.price} (${item.category})`);
        }
        console.log(`\n✅ All ${count} menu items created!\n`);

        // Summary
        console.log('📊 SUMMARY:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Categories: ${categories.length}`);
        console.log(`✅ Products: ${count}`);
        console.log(`✅ Popular items: ${menuItems.filter(i => i.popular).length}`);
        console.log(`✅ Chef specials: ${menuItems.filter(i => i.chefSpecial).length}`);
        console.log(`✅ Vegetarian: ${menuItems.filter(i => i.vegetarian).length}`);
        console.log(`✅ Vegan: ${menuItems.filter(i => i.vegan).length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('🎉 Database seeded successfully!');
        console.log('👉 Visit your menu page to see all items\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
