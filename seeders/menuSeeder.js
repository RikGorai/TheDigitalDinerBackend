const mongoose = require('mongoose');
const MenuItem = require('../models/mongodb/menu.model');
require('dotenv').config();

const seedMenuItems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const menuItems = [
            {
                name: "Margherita Pizza",
                description: "Classic pizza with fresh mozzarella and basil.",
                price: 299,
                category: "Main Course",
                imageUrl: "https://example.com/margherita.jpg"
            },
            {
                name: "Caesar Salad",
                description: "Crisp romaine lettuce with Caesar dressing and croutons.",
                price: 199,
                category: "Appetizers",
                imageUrl: "https://example.com/caesar.jpg"
            },
            {
                name: "Chocolate Lava Cake",
                description: "Warm chocolate cake with a gooey molten center.",
                price: 149,
                category: "Desserts",
                imageUrl: "https://example.com/lava-cake.jpg"
            },
            {
                name: "Mango Smoothie",
                description: "Refreshing mango smoothie made with fresh mangoes.",
                price: 99,
                category: "Drinks",
                imageUrl: "https://example.com/mango-smoothie.jpg"
            }
        ];

        await MenuItem.deleteMany(); // Clear existing menu items
        await MenuItem.insertMany(menuItems); // Insert new menu items
        console.log("Menu items seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding menu items:", err.message);
        process.exit(1);
    }
};

seedMenuItems();
