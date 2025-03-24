const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const contactRouter = require('./routes/contactRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3100;
const dbConnect = require('./config/dbConnect')

// Connect Database
dbConnect();

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'], // Allow Vue dev server
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Debug route
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Contact Manager Project');
});
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Error Handle Middleware
app.use(errorHandler);

// Error handling for 404
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Add error logging
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Available routes:');
    console.log('POST /api/users/register');
    console.log('POST /api/users/login');
    console.log('GET /api/users/current');
});
