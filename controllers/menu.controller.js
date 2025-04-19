const MenuItem = require('../models/mongodb/menu.model');

exports.getAllMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addMenuItem = async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        const imageUrl = req.file?.path; // Cloudinary URL

        const newItem = new MenuItem({
            name,
            price,
            category,
            description,
            imageUrl
        });

        await newItem.save();
        res.status(201).json({ message: "Menu item added", item: newItem });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Menu item deleted", item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
