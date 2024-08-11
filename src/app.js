require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const { WindowRouter } = require('./routes');

// Environment
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoints
app.use('/api/ventana', WindowRouter);

const main = async () => {
    await mongoose.connect(mongoUrl, { dbName })
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('Error al conectar a MongoDB: ', err));

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
};

main();