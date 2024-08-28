require('dotenv').config();
const { CustomError } = require('./customErrors');
const nodemailer = require('nodemailer');

class MailingService {
    constructor() { }

    async sendMail(email, name, phone, cart) {
        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAIL_PASS
                }
            });

            const productDetails = cart.map((product) => {
                return `
                <tr>
                    <td>${product.product}</td>
                    <td>${product.opening}</td>
                    <td>${product.type}</td>
                    <td>${product.style || product.design}</td>
                    <td>${product.colors}</td>
                    <td>${product.width}</td>
                    <td>${product.height}</td>
                    <td>${product.fixedWidth}</td>
                    <td>${product.fixedHeight}</td>
                    <td>${product.quantity}</td>
                </tr>
                `;
            }).join('');

            const htmlContent = `
            <div>
                <h2>Solicitud de presupuesto por ${name}</h2>
                <h3>Datos del cliente:</h3>
                <p><strong>Email: </strong>${email}</p>
                <p><strong>Teléfono: </strong>${phone}</p>

                <h3>Productos solicitados:</h3>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Sentido de apertura</th>
                            <th>Especificidad del producto</th>
                            <th>Estilo o Diseño</th>
                            <th>Color</th>
                            <th>Ancho</th>
                            <th>Alto</th>
                            <th>Ancho de la hoja</th>
                            <th>Alto de la hoja</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productDetails}
                    </tbody>
                </table>
            </div>
            `;

            await transport.sendMail({
                from: 'DiTecno Aperturas',
                to: process.env.MAIL,
                subject: 'DiTecno Aperturas | Solicitud de Presupuesto',
                html: htmlContent,
            });

            return { email, name, phone };
        } catch (error) {
            throw CustomError.createError({
                name: 'Error al enviar email',
                cause: 'Ocurrió un error y no se pudo enviar el email al destinatario.',
                message: 'No se pudo enviar el email',
                status: 404
            });
        };
    };
};

module.exports = { MailingService };
