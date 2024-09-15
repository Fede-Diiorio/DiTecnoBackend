import CustomError from "../utils/customErrors.js";
import MailingService from "../utils/mailingService.js";

export default class SupportRepository {

    async sendSupportMail(message) {
        try {
            await new MailingService().supportMail(message);

            return { message: `Mensaje enviado: ${message}` };

        } catch (error) {
            throw CustomError.createError({
                name: 'Error de email.',
                cause: 'Hubo un error al intentar enviar el email de soporte.',
                message: 'No se pudo procesar su solicitud y no se pudo enviar el emal al equipo de soporte.',
                status: 500
            });
        };
    };
};