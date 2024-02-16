const express = require('express');
const router = express.Router();
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsFromCSV,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for adding a new product (accessible only to admin)
router.post('/', authMiddleware, addProduct);

// Route for updating an existing product (accessible only to admin)
router.put('/:productId', authMiddleware, updateProduct);

// Route for deleting an existing product (accessible only to admin)
router.delete('/:productId', authMiddleware, deleteProduct);

// Route for getting all products (accessible to all users)
router.get('/', getProducts);

// fetch the product list from csv 
router.post('/csv',getProductsFromCSV)

module.exports = router;
