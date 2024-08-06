import express from 'express';
import dotenv from 'dotenv';

import orderRouter from './routes/order.router.js';

//Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/product', orderRouter);

app.listen(port, () => console.log(`Listening on ${port}`));