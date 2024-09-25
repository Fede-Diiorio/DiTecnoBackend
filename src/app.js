import 'dotenv/config'; // Reemplaza el require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import { WindowRouter, DoorRouter, OrderRouter, ColorRouter, SupportRouter } from './routes/index.js'; // Asegúrate de que los archivos exporten correctamente

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
app.use('/api/support', SupportRouter);
app.use('/api/colores', ColorRouter); //Esto se eliminará en el futuro

const main = async () => {
    try {
        if (!mongoUrl) {
            throw new Error('MONGO_URL no está definida');
        }
        await mongoose.connect(mongoUrl, { dbName });
        console.log('Conectado a MongoDB');

        app.listen(port, () => {
            console.log(`Escuchando en el puerto ${port}`);
        });
    } catch (err) {
        console.error('Error al conectar a MongoDB: ', err);
    }
};

main();
