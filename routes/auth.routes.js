const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { signupValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');

router.post('/signup', signupValidator, validate, authController.signup);
router.post('/login', loginValidator, validate, authController.login);

module.exports = router;
