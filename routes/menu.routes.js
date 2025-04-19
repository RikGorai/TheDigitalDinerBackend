const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { addMenuItemValidator } = require('../validators/menu.validator');
const validate = require('../middleware/validate.middleware');
const upload = require('../middleware/cloudinaryStorage');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post('/', verifyToken, verifyAdmin, upload.single('image'), addMenuItemValidator, validate, menuController.addMenuItem);
router.delete('/:id', verifyToken, verifyAdmin, menuController.deleteMenuItem );

module.exports = router;
