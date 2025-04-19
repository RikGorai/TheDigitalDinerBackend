const { Order } = require('../models/sequelize');
exports.createOrder = async (req, res) => {
    try {
        const { name, phone, cart } = req.body;
        const order = await Order.create({
            name,
            phone,
            cart,
            userId: req.user.userId // comes from decoded JWT
        });
        res.status(201).json({ message: "Order placed", order });
    } catch (err) {
        res.status(400).json({ error: "Order failed", details: err.message });
    }
};

exports.getOrdersByPhone = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.findAll({ where: { userId } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Fetch failed", details: err.message });
    }
};