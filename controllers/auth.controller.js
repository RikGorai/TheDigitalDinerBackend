const { User } = require('../models/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const existing = await User.findOne({ where: { phone } });
        if (existing) return res.status(400).json({ error: "Phone already registered" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, phone, password: hashed });

        res.status(201).json({ message: "User registered", user: { id: user.id, name: user.name, phone: user.phone } });
    } catch (err) {
        res.status(500).json({ error: "Signup failed", details: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ where: { phone } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const role = phone === process.env.ADMIN_PHONE ? 'admin' : 'user'; // Check admin phone
        const token = jwt.sign({ userId: user.id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, phone: user.phone, role } });
    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err.message });
    }
};
