import 'dotenv/config'; // Reemplaza el require('dotenv').config()
import CustomError from './customErrors.js';
import nodemailer from 'nodemailer'

export default class MailingService {
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

                // Verificamos si el producto es una puerta o una ventana
                if (product.product === 'puerta') {
                    return `
                    <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; display: inline-block; width: 25%; vertical-align: top;">
                        <h3 style="color: #333; text-align: center;">${product.productName} apertura ${product.opening}</h3>
                        <div style="display: inline-block; width: 100%;">
                            <div style="width: 25%; display: inline-block; vertical-align: top;">
                                <img src="${product.image}" alt="Imagen de ${product.product} ${product.opening}" style="max-width: 100%; height: auto;" />
                            </div>
                            <div style="width: 58%; display: inline-block; vertical-align: top;">
                                <p style="margin: 5px 0;"><strong>Tipo de diseño: </strong>${product.design}</p>
                                <p style="margin: 5px 0;"><strong>Ancho: </strong>${product.width}</p>
                                <p style="margin: 5px 0;"><strong>Alto: </strong>${product.height}</p>
                                <p style="margin: 5px 0;"><strong>Casement1: </strong>${product.casement}</p>
                                <p style="margin: 5px 0;"><strong>Casement2: </strong>${product.casement2}</p>
                                <p style="margin: 5px 0;"><strong>Casement3: </strong>${product.casement3}</p>
                                <p style="margin: 5px 0;"><strong>Cantidad: </strong>${product.quantity}</p>
                                <p style="margin: 5px 0;"><strong>Colores requeridos: </strong>${colors}</p>
                            </div>
                        </div>
                    </div>
                    `;
                } else if (product.product === 'ventana') {
                    return `
                    <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; display: inline-block; width: 25%; vertical-align: top;">
                        <h3 style="color: #333; text-align: center;">${product.product} ${product.style}</h3>
                        <div style="display: inline-block; width: 100%;">
                            <div style="width: 25%; display: inline-block; vertical-align: top;">
                                <img src="${product.image}" alt="Imagen de ${product.product} ${product.style}" style="max-width: 100%; height: auto;" />
                            </div>
                            <div style="width: 58%; display: inline-block; vertical-align: top;">
                                <p style="margin: 5px 0;"><strong>Ancho: </strong>${product.width}</p>
                                <p style="margin: 5px 0;"><strong>Alto: </strong>${product.height}</p>
                                <p style="margin: 5px 0;"><strong>casemenent1: </strong>${product.casement}</p>
                                <p style="margin: 5px 0;"><strong>casemenent2: </strong>${product.casement2}</p>
                                <p style="margin: 5px 0;"><strong>Vidrio: </strong>${product.glassType}</p>
                                <p style="margin: 5px 0;"><strong>Cantidad: </strong>${product.quantity}</p>
                                <p style="margin: 5px 0;"><strong>Colores requeridos: </strong>${colors}</p>
                            </div>
                        </div>
                    </div>
                    `;
                }
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
                from: 'DiTecno Aberturas',
                to: process.env.MAIL,
                subject: 'DiTecno Aberturas | Solicitud de Presupuesto',
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
    }


    async sendMailToUser(email) {
        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAIL_PASS
                }
            });

            await transport.sendMail({
                from: 'DiTecno Aberturas',
                to: email,
                subject: 'DiTecno Aberturas | Presupuesto enviado',
                html: `Gracias por ponerse en contacto con DiTecno Aberturas. En breve nos estaremos comunicando con usted para informarle sobre el presupuesto solicitado.`
            });

            return { email };

        } catch (error) {
            throw CustomError.createError({
                name: 'Error al enviar email',
                cause: 'Ocurrió un error y no se pudo enviar el email al destinatario.',
                message: 'No se pudo enviar el email',
                status: 404
            });
        };
    };

    async supportMail(message) {
        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAIL_PASS
                }
            });

            await transport.sendMail({
                from: 'DiTecno Aberturas',
                to: process.env.DEV_MAIL,
                subject: 'DiTecno Aberturas | Reporte de errores',
                html: message
            });

            return { message };

        } catch (error) {
            throw CustomError.createError({
                name: 'Error al enviar email',
                cause: 'Ocurrió un error y no se pudo enviar el email al destinatario.',
                message: 'No se pudo enviar el email',
                status: 404
            });
        };
    }
};