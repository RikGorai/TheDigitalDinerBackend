const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { createOrderValidator } = require('../validators/order.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken } = require('../middleware/auth.middleware'); // Ensure this is correctly imported

router.post('/', verifyToken, createOrderValidator, validate, orderController.createOrder); // Ensure all handlers are functions
router.get('/:phone', verifyToken, orderController.getOrdersByPhone);

module.exports = router;
