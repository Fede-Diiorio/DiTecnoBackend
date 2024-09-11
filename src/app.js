import 'dotenv/config'; // Reemplaza el require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import { WindowRouter, DoorRouter, OrderRouter, ColorRouter } from './routes/index.js'; // Asegúrate de que los archivos exporten correctamente

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
app.use('/api/puerta', DoorRouter);
app.use('/api/orden', OrderRouter);
app.use('/api/colores', ColorRouter);

const main = async () => {
    try {
        await mongoose.connect(mongoUrl, { dbName });
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Listening on ${port}`);
        });
    } catch (err) {
        console.error('Error al conectar a MongoDB: ', err);
    }
};

main();
