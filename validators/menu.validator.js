const { body } = require('express-validator');

exports.addMenuItemValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').notEmpty().withMessage('Category is required')
];
