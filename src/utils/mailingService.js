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
                const colors = product.colors.map(color => color).join(' - ');

                return `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; display: inline-block; width: 25%; vertical-align: top;">
                    <h3 style="color: #333; text-align: center;">${product.product} ${product.style}</h3>
                    <div style="display: inline-block; width: 100%;">
                        <div style="width: 25%; display: inline-block; vertical-align: top;">
                            <img src="${product.type}" alt="Imagen del ${product.product} ${product.style}" style="max-width: 100%; height: auto;" />
                        </div>
                        <div style="width: 58%; display: inline-block; vertical-align: top;">
                            <p style="margin: 5px 0;"><strong>Ancho: </strong>${product.width}</p>
                            <p style="margin: 5px 0;"><strong>Alto: </strong>${product.height}</p>
                            <p style="margin: 5px 0;"><strong>Medida de hoja: </strong>${product.casement}</p>
                            <p style="margin: 5px 0;"><strong>Medida de hoja 2: </strong>${product.casement2}</p>
                            <p style="margin: 5px 0;"><strong>Vidrio : </strong>DVH ${product.glassType}</p>
                            <p style="margin: 5px 0;"><strong>Colores requeridos: </strong>${colors}</p>
                            <p style="margin: 5px 0;"><strong>Cantidad: </strong>${product.quantity}</p>
                        </div>
                    </div>
                </div>
                `;
            }).join('');

            const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #444;">
                <h2>Solicitud de presupuesto por ${name}</h2>
                <h3 style="color: #333;">Datos del cliente:</h3>
                <p style="margin: 5px 0;"><strong>Email: </strong>${email}</p>
                <p style="margin: 5px 0;"><strong>Teléfono: </strong>${phone}</p>
                <p style="margin: 5px 0;"><strong>Nombre: </strong>${name}</p>

                <h3 style="color: #333;">Productos solicitados:</h3>
                
                <div style="width: 100%; text-align: center;">
                    ${productDetails}
                </div>
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
