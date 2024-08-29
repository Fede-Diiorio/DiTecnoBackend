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

                const colors = product.colors.map(color => {
                    return color;
                }).join(' - ');

                return `
                <h4>{product.product} {product.style}</h4>
                <img src=${product.type} alt="Imagen del ${product.product} ${product.style}" />
                <p><strong>Ancho: </strong>${product.width}</p>
                <p><strong>Alto: </strong>${product.height}</p>
                <p><strong>Medida de hoja: </strong>${product.fixedWidth}</p>
                <p><strong>Cantidad: </strong>${product.quantity}</p>
                <p><strong>Colores requeridos: </strong>${colors}</p>
                `;
            }).join('');

            const htmlContent = `
            <div>
                <h2>Solicitud de presupuesto por ${name}</h2>
                <h3>Datos del cliente:</h3>
                <p><strong>Email: </strong>${email}</p>
                <p><strong>Teléfono: </strong>${phone}</p>

                <h3>Productos solicitados:</h3>
                
                ${productDetails}
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
