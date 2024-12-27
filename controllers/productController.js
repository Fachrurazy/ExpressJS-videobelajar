const Product = require('../models/Product');


const ProductController = {
    async getProduts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    },
}

module.exports = ProductController