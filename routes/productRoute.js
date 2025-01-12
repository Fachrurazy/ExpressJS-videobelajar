const express = require('express');
const ProductController = require('../controllers/productController');
const AuthMiddleware = require('../middleware/authMiddleware');
const productrouter = express.Router();

productrouter.get('/', AuthMiddleware.authenticateToken, ProductController.getProduts);

module.exports = productrouter