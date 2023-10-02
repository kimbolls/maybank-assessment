const express = require('express');
const cors = require('cors');
const { Product, initializeDatabase } = require('./product'); // Import the Sequelize model

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

initializeDatabase().then(() => {
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
// Define API routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        console.log("test")
        // Validate the incoming data
        if (!name || !quantity) {
            return res.status(400).json({ error: 'Product name and quantity are required' });
        }

        // Insert the product data into the database using Sequelize
        const newProduct = await Product.create({ name, quantity });

        // Return the newly added product as a response
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validate the input
        if (!productId || isNaN(quantity)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Find the product by its ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product's quantity
        product.quantity = quantity;
        await product.save();

        // Respond with the updated product data
        res.json(product);
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    
    try {
        // Find the product by its ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product from the database
        await product.destroy();

        // Respond with a success message
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// More routes for CRUD operations can be added here
