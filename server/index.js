const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const expressValidator = require('express-validator')
const expressJwt = require('express-jwt')
const cors = require('cors')

//import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/orders');




//config app
const app  = express();
require('dotenv').config();

//connect mongoose db
mongoose.connect(process.env.DATABASE) 
.then(()=>console.log('succes: db connected...'))
.catch((erro)=>console.log(erro))


//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())





// Routes Middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/braintree', braintreeRoutes);
app.use('/api/order', orderRoutes);



const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`app running on port ${port}`))