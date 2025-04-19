const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.db');

const Order = sequelize.define('Order', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cart: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Order;
