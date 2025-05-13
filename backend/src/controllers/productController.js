const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * FROM Products");
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    addProduct: async (req, res) => {
        const { name, price, description, imageURL } = req.body;
        
        try {
            // Validate imageURL
            if (imageURL && !imageURL.startsWith('/images/') && !imageURL.startsWith('http')) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid image URL format' 
                });
            }

            // If it's a local image, verify it exists
            if (imageURL && imageURL.startsWith('/images/')) {
                const imagePath = path.join(__dirname, '../../public', imageURL);
                if (!fs.existsSync(imagePath)) {
                    return res.status(400).json({ 
                        success: false, 
                        error: 'Image file not found' 
                    });
                }
            }

            const [result] = await db.query(
                'INSERT INTO Products (prod_name, price, description, imageURL) VALUES (?, ?, ?, ?)',
                [name, price, description, imageURL]
            );
            
            res.json({ 
                success: true, 
                id: result.insertId,
                message: 'Product added successfully',
                imageURL: imageURL // Return the imageURL for confirmation
            });
        } catch (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ error: err.message });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, price, description, imageURL } = req.body;
        
        try {
            // Validate imageURL
            if (imageURL && !imageURL.startsWith('/images/') && !imageURL.startsWith('http')) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid image URL format' 
                });
            }

            // If it's a local image, verify it exists
            if (imageURL && imageURL.startsWith('/images/')) {
                const imagePath = path.join(__dirname, '../../public', imageURL);
                if (!fs.existsSync(imagePath)) {
                    return res.status(400).json({ 
                        success: false, 
                        error: 'Image file not found' 
                    });
                }
            }

            await db.query(
                'UPDATE Products SET prod_name = ?, price = ?, description = ?, imageURL = ? WHERE product_id = ?',
                [name, price, description, imageURL, id]
            );
            
            res.json({ 
                success: true, 
                message: 'Product updated successfully',
                imageURL: imageURL // Return the imageURL for confirmation
            });
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM Products WHERE product_id = ?', [id]);
            res.json({ success: true, message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getImages: async (req, res) => {
        try {
            // Get all images from the public/images directory
            const imagesDir = path.join(__dirname, '../../public/images');
            const files = fs.readdirSync(imagesDir);
            
            const images = files.map(file => ({
                imageURL: `/images/${file}`,
                filename: file
            }));

            res.json({
                success: true,
                count: images.length,
                images: images
            });
        } catch (err) {
            console.error('Error getting images:', err);
            res.status(500).json({ 
                success: false,
                error: 'Internal server error: ' + err.message
            });
        }
    }
};

module.exports = productController;