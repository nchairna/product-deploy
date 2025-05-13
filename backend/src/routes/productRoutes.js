const express = require('express');
const router = express.Router();
const { verifyToken, validateApiKey } = require('../middleware/auth');
const productController = require('../controllers/productController');

// Basic CRUD operations
router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Image related routes
router.get('/images', productController.getImages);

module.exports = router;