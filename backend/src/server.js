const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require("mysql2");
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();

// Configure middleware
app.use(cors({
    origin: 'https://product-frontend-tmx7.onrender.com/login', // Your React app URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static("public"));
// Add specific route for images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Database configuration
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});

const promisePool = pool.promise();

// Test route to verify server is working
app.get('/', (req, res) => {
    res.json({ message: 'Backend server is running' });
});

// API Routes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Your existing login credentials
    if (username === "admin" && password === "password123") {
        const token = jwt.sign(
            { username: username },
            'your-secret-key-here',
            { expiresIn: '24h' }
        );
        res.json({
            success: true,
            token,
            user: { username }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Products routes
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await promisePool.query("SELECT * FROM Products");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    const { name, price, description, imageURL } = req.body;
    try {
        const [result] = await promisePool.query(
            'INSERT INTO Products (prod_name, price, description, imageURL) VALUES (?, ?, ?, ?)',
            [name, price, description, imageURL]
        );
        res.json({ 
            success: true, 
            id: result.insertId,
            message: 'Product added successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    const { name, price, description, imageURL } = req.body;
    try {
        await promisePool.query(
            'UPDATE Products SET prod_name = ?, price = ?, description = ?, imageURL = ? WHERE product_id = ?',
            [name, price, description, imageURL, req.params.id]
        );
        res.json({ success: true, message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await promisePool.query('DELETE FROM Products WHERE product_id = ?', [req.params.id]);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('GET  /');
    console.log('POST /api/login');
    console.log('GET  /api/products');
    console.log('POST /api/products');
    console.log('PUT  /api/products/:id');
    console.log('DELETE /api/products/:id');
});