require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { router: orderRouter } = require('./routes/order.router');

// Environment
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', orderRouter);

const main = async () => {
    await mongoose.connect(mongoUrl, { dbName });

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
};

main();