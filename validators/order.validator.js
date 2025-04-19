const { body } = require('express-validator');

exports.createOrderValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').isMobilePhone().withMessage('Valid phone required'),
    body('cart').isArray({ min: 1 }).withMessage('Cart must be an array with at least one item')
];
