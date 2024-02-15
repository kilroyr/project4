const Product = require('../models/productModel');
const readCSV = require('../utils/readcsv')

// Controller function to add a new product (accessible only to admin)
const addProduct = async (req, res) => {
    const { type, name, price } = req.body;

    try {
        if (req.userType !== 1) {
            return res.status(403).json({ message: 'You are not authorized to add products' });
        }

        const newProduct = new Product({
            type,
            name,
            price
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing product (accessible only to admin)
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { type, name, price } = req.body;

    try {
        if (req.userType !== 1) {
            return res.status(403).json({ message: 'You are not authorized to update products' });
        }

        await Product.findByIdAndUpdate(productId, { type, name, price });

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete an existing product (accessible only to admin)
const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        if (req.userType !== 1) {
            return res.status(403).json({ message: 'You are not authorized to delete products' });
        }

        await Product.findByIdAndDelete(productId);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all products (accessible to all users)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller function to get products from CSV file based on category
const getProductsFromCSV = async (req, res) => {
    const { category } = req.body; 

    try {
        // Read the CSV file based on the selected category
        const products = await readCSV(`./data/${category.toLowerCase()}.csv`);
        
        res.json(products); 
    } catch (error) {
        res.status(500).json({ message: 'Error reading CSV file', error: error.message });
    }
};


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsFromCSV,
};
