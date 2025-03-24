const express = require('express');
const app = express();
const contactRouter = require('./routes/contactRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter'); // Import productRouter
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3100;
const dbConnect = require('./config/dbConnect')

//Connect Database
dbConnect();

//Build-in Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Contact Manager Project');
});
//Routes
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter); 
//Error Handle Middleware
app.use(errorHandler);

//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
