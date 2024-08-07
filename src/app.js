require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Environment
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {
    await mongoose.connect(mongoUrl, { dbName });

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
};

main();