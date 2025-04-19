const { body } = require('express-validator');

exports.signupValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().isMobilePhone().withMessage('Valid phone number required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginValidator = [
    body('phone').notEmpty().isMobilePhone().withMessage('Valid phone number required'),
    body('password').notEmpty().withMessage('Password is required')
];
